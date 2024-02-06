"use client";

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { AuthCardHeader } from "./AuthCardHeader";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <AuthCardHeader label={headerLabel} />
      {children}
    </Card>
  );
};
