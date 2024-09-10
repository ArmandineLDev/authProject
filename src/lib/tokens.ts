import crypto from "crypto";
import { getVerificationTokenByEmail } from "@/src/data/verificationToken";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getPasswordResetTokenByEmail } from "@/src/data/passwordResetToken";
import { getTwoFactorTokenByEmail } from "@/src/data/twoFactorToken";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString(); // 100_000 = 100000
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expire: expires,
    },
  });
  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expire = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  // on veut créer un token de réinitialisation pour un email donné.

  if (existingToken) {
    // Si une token existe déjà pour cet email, on la supprime et afin d'en crée un nouveau
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expire,
    },
  });
  return passwordResetToken;
};

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
