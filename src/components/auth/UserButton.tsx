"use client"

import {FaUser} from "react-icons/fa";
import { LogOut} from "lucide-react"
import {  DropdownMenu,
          DropdownMenuContent,
          DropdownMenuItem,
          DropdownMenuLabel,
          DropdownMenuTrigger,} from "@/src/components/ui/dropdown-menu";

import  {Avatar, AvatarFallback, AvatarImage} from "@/src/components/ui/avatar";
import {useCurrentUser} from "@/src/hooks/useCurrentUser";
import {LogoutButton} from "@/src/components/auth/LogoutButton";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""}/>
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white"/>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <LogOut className="w-4 h-4 mr-2"/>
            Déconnexion
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}