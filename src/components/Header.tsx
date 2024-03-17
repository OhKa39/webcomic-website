import React from 'react'
import HeaderItems from './Header-items'
import { IoIosHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { BsPersonFill } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import { MdOutlineCatchingPokemon } from "react-icons/md"
import DarkModeSwitch from './DarkModeSwitch';
import SearchBar from './SearchBar';


export default function Header() {
  return (
    <div className="flex  bg-slate-200 dark:bg-gray-700 item-center p-3 font-bold ">
        <div className='flex gap-5 w-1/3 mx-auto'>
          <HeaderItems title='home' address='/' Icon={IoIosHome}/>
          <HeaderItems title='about' address='/about' Icon={FcAbout}/>
          <SearchBar/>
        </div>
        <MdOutlineCatchingPokemon className='flex w-1/3 text-amber-400 text-[2em] hidden lg:inline-flex'/>
        <div className='flex gap-5 w-1/3 justify-end mx-auto'>
          <HeaderItems title='sign-up' address='/' Icon={BsPersonFill}/>
          <HeaderItems title='login' address='/' Icon={MdLogin}/>
          <DarkModeSwitch  />

        </div>     
    </div>
    
  )
}
