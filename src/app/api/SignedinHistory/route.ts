import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/db'

export async function GET(req:NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get('userId');
        const allComics = await prisma.history.findMany({
            where: {
                userID: userId!
            },
            select: {
                userID: true,
                chapterNumber: true,
                Comics:{
                    select: {
                        id: true,
                        comicName: true,
                        comicImageLink: true
                    }
                }

            }
        })
        return NextResponse.json(allComics, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 405 })
    }
}

export async function DELETE(req:NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get('userId');
        const comicId = req.nextUrl.searchParams.get('comicId');
        const deleteComic = await prisma.history.delete({
            where: { 
                userID: userId!,
                comicsId: comicId! 
            },
        })

        return NextResponse.json(deleteComic, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 405 })
    }
}