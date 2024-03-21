import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
export async function GET(req: NextRequest) {
    try{
        // console.log(req.nextUrl.searchParams)
        const pageNumber = Number(req.nextUrl.searchParams.get('page'))
        const offset = Number(req.nextUrl.searchParams.get('offset'))
        const allComics = await prisma.$transaction([
            prisma.comics.count(),
            prisma.comics.findMany({      
            select: {          
                id: true,
                comicName: true,
                comicImageLink: true,
                // isCompleted: true,
                // authorName: true,
                updatedAt: true
                // comicChapters: {
                //     select: {
                //         id: true,
                //         chapterNumber: true
                //     }
                // },
            },
            skip: (pageNumber - 1) * offset,
            take: offset,
            // _count:{
            //     $total: true,
            //   }
            // orderBy: {
            //     createdAt: SortOrder.desc,
            // }  
        })])
        return NextResponse.json(allComics,{status: 200})
    }
    catch(error)
    {
        return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
    }
}