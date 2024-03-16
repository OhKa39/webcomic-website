import React from 'react'
import HeaderItems from './Header-items'
import { PiNotebookLight } from "react-icons/pi";
export default function Footer() {
    return (
        <footer className='fixed bottom-0 w-full bg-slate-200 dark:bg-gray-700 p-4'>
            <HeaderItems title='terms' address='/terms' Icon={PiNotebookLight} />
        </footer>
    )
}
