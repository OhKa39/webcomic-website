import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: NextRequest, context : any) {
    try{
        const {params} = context
        const comicID = params.comicID
        // const comicChapter = params.comicChapter
        const data = await req.json() 
        const increaseViewCount = await prisma.viewCount.create({
           data:{
            comicsId: comicID,
           }, 
        });
        if (data.profile) {
            const user = {
                chapterNumber: parseInt(data.chapterNumber),
                userID: data.profile.id,
                comicsId: data.comicID
            }
            const history = await prisma.history.upsert(
                {
                  where: {
                    comicsId: user.comicsId,
                    userID: user.userID
                  },
                  update: {
                    chapterNumber: user.chapterNumber,
                  },
                  create: user
                }); 
            const response = {increaseViewCount, history}
            return NextResponse.json(response,{status: 200})
        }
        return NextResponse.json(increaseViewCount,{status: 200})
    }
    catch(error)
    {
        return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
    }
}

export async function GET(req: NextRequest, context : any) {
    try{
        const {params} = context
        const comicID = params.comicID
        const comicChapter = params.comicChapter

        const pages = await prisma.comicChapters.findFirstOrThrow({            
                where: {
                    comicsId: comicID,
                    chapterNumber: Number(comicChapter)
                },
                select: {          
                    id: true,
                    chapterImages: {
                        select: {
                            imageLink: true
                        }
                    },        
                },
            })  
        return NextResponse.json(pages,{status: 200})
    }
    catch(error)
    {
        return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
    }
}
