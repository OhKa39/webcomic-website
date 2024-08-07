import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
export async function GET(req: NextRequest, context : any) {
    try{
        const {params} = context
        const comicID = params.comicID

        const comic = await prisma.comics.findUniqueOrThrow({
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
                viewCount: true,
                events:{
                 where:{
                    isTurnOn: true
                 }
                },
                comicTypes: {
                    select:{
                        id:true,
                        comicTypeName: true
                    }
                }
            },
        })
        return NextResponse.json(comic,{status: 200})
    }
    catch(error)
    {
        return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
    }
}
