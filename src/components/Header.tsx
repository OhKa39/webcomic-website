import React from 'react'
import HeaderItems from './Header-items'
import { IoIosHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { BsPersonFill } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import DarkModeSwitch from './DarkModeSwitch';
import SearchBar from './SearchBar';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignUpButton,
  ClerkLoaded, 
  ClerkLoading
} from "@clerk/nextjs";
import {Loader} from "lucide-react"


export default function Header() {
  return (
<<<<<<< HEAD
    <div className="flex items-center justify-between bg-slate-200 dark:bg-gray-700 p-2">
      <div className='flex gap-2 items-center'>
=======
    <div className="flex bg-slate-200 dark:bg-gray-700 item-center justify-between p-3 pl-10">
      <div className='flex gap-5 items-center'>
>>>>>>> 1a2684f6ae1da4484ee7041bc81d7700946fd118
        <HeaderItems title='Trang Chủ' address='/' Icon={IoIosHome} />
        <HeaderItems title='Thông Tin' address='/about' Icon={FcAbout} />
      </div>
      <div className='flex items-center justify-center flex-grow'>
        <SearchBar />
      </div>
<<<<<<< HEAD
      <div className='flex gap-2 items-center'>
        <HeaderItems title='Đăng Ký' address='/' Icon={BsPersonFill} />
        <HeaderItems title='Đăng Nhập' address='/' Icon={MdLogin} />
=======
      <div className='flex gap-5 items-center'>
        <ClerkLoading>
          <Loader className='h-5 w-5 text-muted-foreground animate-spin'/>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl='/'/>
          </SignedIn>
          <SignedOut>
            <SignUpButton mode="modal"/>
            <SignInButton mode="modal"/>
          </SignedOut>
        </ClerkLoaded>
        
        {/* <HeaderItems title='Đăng Ký' address='/' Icon={BsPersonFill} /> */}
        {/* <HeaderItems title='Đăng Nhập' address='/' Icon={MdLogin} /> */}
>>>>>>> 1a2684f6ae1da4484ee7041bc81d7700946fd118
        <DarkModeSwitch />
      </div>
    </div>
  )
}
