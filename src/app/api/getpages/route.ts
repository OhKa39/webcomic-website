import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
export async function GET(req: NextRequest) {
    
    try{
        const comicID = String(req.nextUrl.searchParams.get('comicID'))
        const comicChapter = Number(req.nextUrl.searchParams.get('comicChapter'))

        const pages = await prisma.$transaction([
            prisma.comics.count(),
            prisma.comicChapters.findFirstOrThrow({            
                where: {
                    comicsId: comicID,
                    chapterNumber: Number(comicChapter)
                },
                select: {          
                    chapterImages: {
                        select: {
                            imageLink: true
                        }
                    },        
                },
            })   ])
        return NextResponse.json(pages,{status: 200})
    }
    catch(error)
    {
        return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
    }
}