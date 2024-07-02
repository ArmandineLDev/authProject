import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { CardWrapper } from "@/src/components/auth/CardWrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oups ! Il y a eu un problème !"
      backButtonHref="/auth/login"
      backButtonLabel="Retour à la connexion"
    >
      <div className="w-full flex justify-center items-center ">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
