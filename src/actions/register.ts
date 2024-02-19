//serveur action

"use server";

import bcryp from "bcrypt";
import { z } from "zod";

import { RegisterSchema } from "@/src/schemas";
import { db } from "@/src/lib/db";
import { getUserByEmail } from "@/src/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcryp.hash(password, 10);

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
