import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse email valide" }),
  password: z
    .string()
    .min(1, { message: "Veuillez entrer votre mot de passe" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "6 caractères minimum" }),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse email valide" }),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(6, { message: "6 caractères minimum" }),
  name: z.string().min(1, { message: "Veuillez entrer votre nom" }),
});
