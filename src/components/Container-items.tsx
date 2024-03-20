import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function Containeritems({data}) {
  return (   
    data.map((result) => (      
        <Link href={`/comic/${result.name}`} className='rounded border-amber-400 bg-slate-200 dark:bg-amber-400 border-4 '>          
            <Image 
                src={result.imageLink}
                width={150}
                height={150}
                style={{
                    width: '100%',
                    height: '100%',
                  }}
                  alt="Picture of comic"
                  className='hover:opacity-80 transition-opacity duration-300'
            />
            <p className='font-bold truncate'>{result.name}</p>
        </Link>
    ))  
  )
}
