import React from "react";
import HeaderItems from "./Header-items";
import { IoLogoOctocat } from "react-icons/io5";
import DarkModeSwitch from "./DarkModeSwitch";
import SearchBar from "./SearchBar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignUpButton,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import NotificationDropDown from "./NotificationDropDown";
export default function Header() {
  return (
    <div className="flex bg-slate-200 dark:bg-gray-700 item-center justify-between p-3 pl-10">
      <div className="flex gap-5 items-center">
        <HeaderItems
          title="Trang Chủ"
          address="/"
          Icon={IoLogoOctocat}
        ></HeaderItems>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <SearchBar />
      </div>

      <div className="flex space-x-4 items-center">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <NotificationDropDown />
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignUpButton mode="modal" />
            <SignInButton mode="modal" />
          </SignedOut>
        </ClerkLoaded>

        {/* <HeaderItems title='Đăng Ký' address='/' Icon={BsPersonFill} /> */}
        {/* <HeaderItems title='Đăng Nhập' address='/' Icon={MdLogin} /> */}
        <DarkModeSwitch />
      </div>
    </div>
  );
}
