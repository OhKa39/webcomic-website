import { image } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'


export default async function ComicPageItems({data}: {data: any}) 
{
    return (
        data.map((result : any) => (      
            <Image 
                className='block m-auto w-1/2 h-1/2'
                src={result.imageLink}
                width={2000}
                height={2000}
                alt="Picture of comic"
                
            /> 
        ))                
    )
}