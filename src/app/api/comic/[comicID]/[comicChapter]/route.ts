import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import {Prisma} from '@prisma/client' 
import initialUser from '@/lib/initial-user'
import {currentUser} from '@clerk/nextjs/server'

export async function POST(req: NextRequest, context : any) {
    try{
        const {params} = context
        console.log(params)
        const comicID = params.comicID
        const chapterNumber = params.comicChapter
        // const comicChapter = params.comicChapter
        const profile = await currentUser()
        // const profile = await initialUser()
        console.log(profile)
        const data = await req.json() 
        const increaseViewCount = await prisma.viewCount.create({
           data:{
            comicsId: comicID,
           }, 
        });
        if (!!profile) {
            const user = {
                chapterNumber: chapterNumber,
                userID: profile.id,
                comicsId: comicID
            }
            console.log(user)
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
            return NextResponse.json(response,{status: 201})
        }
        return NextResponse.json(increaseViewCount,{status: 201})
    }
    catch(error)
    {
        return NextResponse.json({ message: `something went wrong:${error}`},{status: 500})
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
    catch(error: any)
    {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2025' || error.code === 'P2023') {
                return NextResponse.json({ message: `Chapter not found`},{status: 404})
            }
        }
        return NextResponse.json({ message: `something went wrong:${error}`},{status: 500})
    }
}
