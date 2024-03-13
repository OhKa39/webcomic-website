'use client'
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";


export default function DarkModeSwitch() {
    const {theme, setTheme, systemTheme} = useTheme()
    const currentTheme = theme === 'system' ? systemTheme : theme 
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

  return (
    <div> {mounted && (currentTheme === 'dark' ? 
    (<MdOutlineDarkMode onClick={() => setTheme('light')} className="cursor-pointer text-xl"/>):
    (<MdDarkMode onClick={() => setTheme('dark')} className="cursor-pointer text-xl"/>) 
    
    )}</div>

  )
}
