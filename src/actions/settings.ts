"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/src/schemas";
import { getUserById } from "@/src/data/user";
import { currentUser } from "@/lib/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  // beurk le point d'exclamation
  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Informations mises à jour" };
};
