"use client";

import { useRouter } from "next/navigation";

interface LogginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LogginButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>TODO : Implement modal</span>;
  }
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};
