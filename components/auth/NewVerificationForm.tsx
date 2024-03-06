"use client";
import { CircleLoader } from "react-spinners";
import { CardWrapper } from "@/components/auth/CardWrapper";

export const NewVerificationForm = () => {
  return (
    <CardWrapper
      headerLabel="Confirmation de votre email"
      backButtonLabel="Retour à la page de connexion"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        <CircleLoader />
      </div>
    </CardWrapper>
  );
};
