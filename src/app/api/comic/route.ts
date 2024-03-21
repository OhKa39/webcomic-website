import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/'
export async function GET(req: NextRequest) {
    try{
        const pageNumber = req.nextUrl.searchParams.get('page')
        const allComics = await prisma.comics.findMany({      
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
            skip: (Number(pageNumber) - 1) * 20,
            take: 20,
            _count:{
                $total: true,
              }
            // orderBy: {
            //     createdAt: SortOrder.desc,
            // }  
        })
        return NextResponse.json(allComics,{status: 200})
    }
    catch(error)
    {
        return NextResponse.json({ message: 'Something is error:'},{status: 500})
    }
}