import { Badge } from "@/src/components/ui/badge";
import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}
export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rouded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rouded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">NAME</p>
          <p className="truncate text-xs max-w-[180px font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rouded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">EMAIL</p>
          <p className="truncate text-xs max-w-[180px font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rouded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ROLE</p>
          <p className="truncate text-xs max-w-[180px font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rouded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">2FA</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
