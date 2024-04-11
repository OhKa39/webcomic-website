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

const NotificationDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IoIosNotifications size={32} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-90 bg-slate-300 dark:bg-black relative -left-32">
        <DropdownMenuLabel>Các thông báo đã lưu trữ</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:opacity-80 cursor-pointer">
          <Link href="/comic/65f90375ba609768fc30cfdb?commentID=660c381c98c4f0c096c502a3">
            <div className="container flex items-center justify-center space-x-2">
              <div>
                <Image
                  src={
                    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZU5DN0NldERNVU5RNHZYYmRaYThDTGJRM0sifQ?width=80"
                  }
                  width={40}
                  height={40}
                  alt="Avatar"
                  className="rounded-full"
                />
              </div>
              <div className="text-base">
                người dùng abc đã comment vào bình luận
              </div>
            </div>
          </Link>
        </DropdownMenuItem>
        {/* <div>hello</div> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropDown;
