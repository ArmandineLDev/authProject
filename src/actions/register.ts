//serveur action

"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { getUserByEmail } from "@/src/data/user";
import { db } from "@/src/lib/db";
import { generateVerificationToken } from "@/src/lib/tokens";
import { RegisterSchema } from "@/src/schemas";
import { sendVerificationEmail } from "@/src/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "L'email est déjà utilisé." };

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Email de confirmation envoyé" };
};
