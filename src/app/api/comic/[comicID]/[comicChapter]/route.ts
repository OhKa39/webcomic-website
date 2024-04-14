import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'


export async function POST(req: NextRequest, context : any) {
    try{
        const {params} = context
        const comicID = params.comicID
        // const comicChapter = params.comicChapter
        const chapterId = req.nextUrl.searchParams.get('chapterId')
        

        const increaseViewCount = await prisma.viewCount.create({
           data:{
            comicsId: comicID,
           }, 
        });
        
        // if (profile) {
        //     const addHistory = await prisma.history.create({
        //         data: {
        //            comicChapterId: chapterId!,
        //            userID: profile.userId
        //         }, 
        //      }); 
        //     console.log("Im here")
        //     const response = {
        //         increaseViewCount,
        //         addHistory
        //     };
        //     return NextResponse.json(response,{status: 200}) 
        // }
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
