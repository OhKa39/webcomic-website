import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import {Prisma} from '@prisma/client' 
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
                _count: {
                    select:{
                        viewCount: true,
                        events:{
                            where:{
                                isTurnOn: true
                            }
                        }
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
    catch(error: any)
    {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2025' || error.code === 'P2023') {
                return NextResponse.json({ message: `Comic not found`},{status: 404})
            }
        }
        return NextResponse.json({ message: `something went wrong:${error}`},{status: 500})
    }
}
