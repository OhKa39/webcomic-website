import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosNotifications } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import NotificationContainer from "./NotificationContainer";
import initialUser from "@/lib/initial-user";

const NotificationDropDown = async () => {
  const user = await initialUser();
  // console.log(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IoIosNotifications size={32} className="cursor-pointer relative" />
      </DropdownMenuTrigger>
      <NotificationContainer user={user} />
    </DropdownMenu>
  );
};

export default NotificationDropDown;
