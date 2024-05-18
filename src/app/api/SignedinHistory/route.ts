import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/db'
import initialUser from "@/lib/initial-user";

export async function GET(req:NextRequest) {
    try {
        const profile = await initialUser()
        if(!profile)
            return NextResponse.json({message: `Unauthorized: Please login to use this feature`},{status: 401})

        const userId = profile!.id
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
        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
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

        return new Response(null, { status: 204 })
    }
    catch (error) {
        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
    }
}