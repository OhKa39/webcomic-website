import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/db'


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
    catch (error) {
        return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 })
    }

}