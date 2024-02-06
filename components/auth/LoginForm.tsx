import React from "react";
import { CardWrapper } from "./CardWrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Bienvenue !"
      backButtonLabel="Vous n'avez pas de compte ? Inscrivez-vous."
      backButtonHref="/auth/register"
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
};
