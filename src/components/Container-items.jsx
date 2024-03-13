import React from 'react'
import Image from 'next/image'
export default function Containeritems({data}) {
  return (   
    data.map((result) => (
        <div key={result.id} className='rounded border-amber-400 bg-slate-200 dark:bg-amber-400 border-4 '>          
            <Image 
                src={result.linkImg}
                width={100}
                height={100}
                style={{
                    width: '300px',
                    height: '100px',
                  }}
                //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <p>{result.link}</p>
            <p className='font-bold truncate'>{result.name}</p>
        </div>
    ))  
  )
}
