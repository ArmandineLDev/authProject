//serveur action

"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { getUserByEmail } from "@/src/data/user";
import { db } from "@/src/lib/db";
import { RegisterSchema } from "@/src/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "User already exists" };

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // TODO send verification token email

  return { success: "Utilisateur créé" };
};
