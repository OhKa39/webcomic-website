import React from 'react'
import Link from 'next/link'

export default function HeaderItems({ title, address, Icon }) {
  return (
    <Link href={address} className='flex gap-2'>
      <Icon className='hidden sm:inline text-xl' />
      <p className='uppercase'>{title}</p>
    </Link>
  );
}
