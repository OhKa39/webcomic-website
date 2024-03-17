import React from 'react'
import Link from 'next/link'

export default function HeaderItems({title, address, Icon}) {
  return (
    <Link href={address} className='flex gap-2 hover:underline hover:underline-offset-8' >
        <Icon className = 'hidden sm:inline text-xl'/>
        <p className='uppercase'>{title}</p>   
    </Link>
  );
}
