import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse email valide" }),
  password: z
    .string()
    .min(1, { message: "Veuillez entrer votre mot de passe" }),
});
