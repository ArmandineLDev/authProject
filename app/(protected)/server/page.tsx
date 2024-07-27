import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/src/components/auth/UserInfo";

const ServerPage = async () => {
  const user = await currentUser();
  return (
    <div>
      <UserInfo label="Server component" user={user} />
    </div>
  );
};
export default ServerPage;
