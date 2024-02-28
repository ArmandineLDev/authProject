//serveur action

"use server";

import { z } from "zod";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/src/data/user";
import { generateVerificationToken } from "@/src/lib/tokens";
import { LoginSchema } from "@/src/schemas";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "Erreur dans les identifiants" };

  if (!existingUser.emailVerified) {
    console.log("coucou");
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    return { success: "Email de confirmation renvoyé" };
  }

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
