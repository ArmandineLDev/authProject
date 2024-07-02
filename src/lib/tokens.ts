import { getVerificationTokenByEmail } from "@/src/data/verificationToken";
import { db } from "@/src/lib/db";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expire = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  // on veut créer un token de vérification pour un email donné.

  if (existingToken) {
    // Si une token existe déjà pour cet email, on la supprime et afin d'en crée un nouveau
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expire,
    },
  });
  return verificationToken;
};
