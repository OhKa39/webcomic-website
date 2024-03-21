import React from 'react'
import ContainerItems from './Container-items'
import { PrismaClient, SortOrder} from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import PaginationControls from './PaginationControl'

//import axios from "axios";


const prisma = new PrismaClient()
const PER_PAGE = 5

async function getContainerItems({page}) {
    const allComics = await prisma.comics.findMany({      
        take: PER_PAGE,
        skip: (page - 1) * PER_PAGE,
        select: {          
            id: true,
            comicName: true,
            comicImageLink: true,
            isCompleted: true,
            authorName: true,
            updatedAt: true,
            createdAt: true
        },
        // orderBy: {
        //     createdAt: SortOrder.desc,
        // }  

    })
    const count = await prisma.comics.count()
    
    return {data: allComics, count: count}
}


export default async function Container({searchParams,}: {searchParams: { [key: string]: string | string[] | undefined }}) 
{
    const Page = searchParams['page'] ?? '1'
    let page = Number(Page)
    if (page <= 0 || isNaN(page)) return
    const {data, count} = await getContainerItems({page})
    //console.log(searchParams)
    
    //console.log(data)
    
    
    return (
        <div>
            
            <div className="grid grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5">
                <ContainerItems data={data} />
            </div>
            <PaginationControls count={count}/>
        </div>
    )
}



