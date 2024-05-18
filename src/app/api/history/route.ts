import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/db'
import {Prisma} from '@prisma/client'

export async function GET(req:NextRequest) {
    try {
        const historyComicIds = req.nextUrl.searchParams.get('IDs');
        const IdArray = historyComicIds?.split(',');
        
        const allComics = await prisma.comics.findMany({
            where: {
                id: { in: IdArray} 
            },
            select: {
                id: true,
                comicName: true,
                comicImageLink: true,
            }
        })
        return NextResponse.json(allComics, { status: 200 })
    }
    catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2023') {
                return NextResponse.json({message: "Bad request: contain at least one wrong id format in IDs"},{status: 400})
            }
          }
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }

}