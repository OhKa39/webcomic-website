import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { Prisma } from '@prisma/client';
export async function GET(req: NextRequest) {
    
        
    try{
        // console.log(req.nextUrl.searchParams)
        const pageNumber = Number(req.nextUrl.searchParams.get('page'))
        const offset = Number(req.nextUrl.searchParams.get('offset'))
        const categoryID = req.nextUrl.searchParams.get('categoryIds') ?? undefined
        const query: Prisma.ComicsFindManyArgs  = {
            select:{
                id: true,
                comicName: true,
                updatedAt: true,
                comicImageLink: true,
                
            },
            where:{
                comicTypes: {
                    some: {
                        id: {
                          in: !!categoryID ? (<string>categoryID).split(",") : undefined
                        }
                    },
                },
            },
            
            skip: (pageNumber - 1) * offset,
            take: offset,
        };
        const allComics = await prisma.$transaction([
            prisma.comics.count({where: query.where}),
            prisma.comics.findMany(query)
        ])
        return NextResponse.json(allComics,{status: 200})
    }
    catch(error)
    {
        return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
    }
}