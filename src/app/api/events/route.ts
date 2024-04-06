import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import initialUser from '@/lib/initial-user';
import { profile } from 'console';

export async function POST(req: NextRequest) {
    try {
        const profile = await initialUser();
        if (!profile) {
            return NextResponse.json({ message: `Unauthorized` }, { status: 401 });
        }
        const data = await req.json();
        const userId = profile.id;
        console.log(data)
        const event = await prisma.events.create({
            data: {
                eventType: data.query.eventType,
                userID: userId,
                comicsId: data.query.comicsId
            }
        });
        return NextResponse.json(event, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: `Something went wrong: ${error}` }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const userID = req.nextUrl.searchParams.get('id') ?? undefined
    const ComicId = req.nextUrl.searchParams.get('ComicId') ?? undefined

    try {
        const data = await prisma.events.findMany({
            select: {
                eventType: true,
                id: true,
                user: true,
                comicsId: true,
            },

            orderBy: {
                createdAt: "desc"
            },
            where: {
                id: userID,
                comicsId: ComicId,

            }
        });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Something went wrong: ${error}` }, { status: 500 });
    }
}
