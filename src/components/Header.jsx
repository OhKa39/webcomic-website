import React from 'react'
import HeaderItems from './Header-items'
import { IoIosHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { BsPersonFill } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import DarkModeSwitch from './DarkModeSwitch';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <div className="flex gap-6 bg-amber-400 text-center justify-center py-3">
        <HeaderItems title='home' address='/' Icon={IoIosHome}/>
        <HeaderItems title='about' address='/' Icon={FcAbout}/>
        <SearchBar />
        <HeaderItems title='sign-up' address='/' Icon={BsPersonFill}/>
        <HeaderItems title='login' address='/' Icon={MdLogin}/>
        <DarkModeSwitch />
    </div>
    
  )
}
