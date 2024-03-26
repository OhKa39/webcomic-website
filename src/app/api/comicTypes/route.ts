import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/db'


export async function GET() {
    try {
        const allComics = await prisma.comicTypes.findMany({
            select: {
                id: true, comicTypeName: true
            }
        })
        // const typeComics = await prisma.comics.findMany(
        //     {
        //         select:{
        //             id:true,
        //             comicName: true,
        //             comicTypesIDs:true,
        //             comicTypes:{select:{id:true}}
        //         }
        //     }
        // )
        return NextResponse.json(allComics, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 405 })
    }

}