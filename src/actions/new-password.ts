"use server";
import { getPasswordResetTokenByToken } from "@/src/data/passwordResetToken";
import { getUserByEmail } from "@/src/data/user";
import { NewPasswordSchema } from "@/src/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "Missing token !" };

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields !" };
  }

  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token !" };
  }

  const hasExpired = new Date() > existingToken.expire;

  if (hasExpired) {
    return { error: "Token has expired !" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist !" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { success: "Mot de passe mis à jour" };
};
