import React from 'react'
import ContainerItems from './Container-items'
import { PrismaClient, SortOrder} from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import PaginationControls from './PaginationControl'

//import axios from "axios";


const prisma = new PrismaClient()

async function getContainerItems() {
    const allComics = await prisma.comics.findMany({      
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
    const {data, count} = await getContainerItems()
    //console.log(searchParams)
    const Page = searchParams['page'] ?? '1'
    let page = Number(Page)
    let per_page = '5'
    
    if (page < 0) return
    
    let start = (Number(page) - 1) * Number(per_page) 
    let end = start + Number(per_page) 
    

    const entries = data.slice(start, end)

    return (
        <div>
            
            <div className="grid grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5">
                <ContainerItems data={entries} />
            </div>
            <PaginationControls hasNextPage={end < data.length} hasPrevPage={start > 0} count={count}/>
        </div>
    )
}



