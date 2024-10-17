"use client";

import { useCurrentUser } from "@/src/hooks/useCurrentUser";
import { UserInfo } from "@/src/components/auth/UserInfo";

const ClientPage = () => {
  const user = useCurrentUser();
  return (
    <div>
      <UserInfo label="Client component" user={user} />
    </div>
  );
};
export default ClientPage;
