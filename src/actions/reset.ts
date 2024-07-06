"use server";

import * as z from "zod";
import { ResetSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { sendPasswordResetEmail } from "../lib/mail";
import { generatePasswordResetToken } from "../lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Saisir une adresse email valide" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Aucun utilisateur trouvé avec cette adresse email" };
  }
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, passwordResetToken.token);

  // Send email to user with reset link
  return { success: "Un email de réinitialisation a été envoyé" };
};
