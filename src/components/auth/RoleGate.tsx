"use client";

import { FormError } from "@/src/components/form-error";
import { useCurrentRole } from "@/src/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole;
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRoles) {
    return <FormError message="You are not authorized to view this page" />;
  }

  return <>{children}</>;
};
