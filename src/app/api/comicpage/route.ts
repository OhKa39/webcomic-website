import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
export async function GET(req: NextRequest) {
    
    try{
        const comicID = String(req.nextUrl.searchParams.get('comicID'))

        const comic = await prisma.$transaction([
            prisma.comics.count(),
            prisma.comics.findUniqueOrThrow({
        where: {
            id: comicID
        },
        select: {
            id: true,
            comicName: true,
            comicImageLink: true,
            isCompleted: true,
            authorName: true,
            comicDescription: true,
            comicChapters: {
                select: {
                    id: true,
                    chapterNumber: true,
                }
            },
        },
    })])
        return NextResponse.json(comic,{status: 200})
    }
    catch(error)
    {
        return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
    }
}