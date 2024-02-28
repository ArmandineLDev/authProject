import { db } from "@/src/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "../data/verificationToken";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expire = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  console.log(expire);
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expire,
    },
  });
  console.log("verificationToken", verificationToken);
  return verificationToken;
};
