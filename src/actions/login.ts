//serveur action

"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/src/data/user";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";

import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/src/schemas";
import { AuthError } from "next-auth";
import {getTwoFactorTokenByEmail} from "@/src/data/twoFactorToken";
import {getTwoFactorConfirmationByUserId} from "@/src/data/two-factor-confirmation";

import {db} from "@/lib/db";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password,code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "Erreur dans les identifiants" };

  // si l'email n'est pas vérifié, on renvoie un email de vérification
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent" };
  }
  // si l'utilisateur a activé la double authentification
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if(code){
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken || twoFactorToken.token !== code) return {error: "Invalid code"};

      const hasExpired = new Date(twoFactorToken.expire) < new Date();
      if (hasExpired) return {error: "Code expired"};

      await db.twoFactorToken.delete({where: {id: twoFactorToken.id}});

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
      await console.log(1, {existingConfirmation})
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete( {where: {id: existingConfirmation.id}})
      }
      await db.twoFactorConfirmation.create({
        data: {userId: existingUser.id}
      })
      const test = await getTwoFactorConfirmationByUserId(existingUser.id)
      await console.log(2, {test})

    } else {
    const twoFactorToken = await generateTwoFactorToken(existingUser.email);
    await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
    return { twoFactor: true };
  }}

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
