import React from 'react'
import ContainerItems from './Container-items'
import { PrismaClient, SortOrder} from '@prisma/client'
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
    return allComics
}


export default async function Container() {
    
    const data = await getContainerItems()

    return (
        <div className="grid grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5">
            <ContainerItems data={data} />
        </div>
    )
}



