import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import initialUser from '@/lib/initial-user';


export async function GET(req: NextRequest, context: any) {
    const comicsId = context.params.comicsId
    //const userID = context.params["userID"]
    try {
        const profile = await initialUser();
        if (!profile) {
            return NextResponse.json(null, { status: 401 });
        }

        const data = await prisma.events.findFirst({
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
                userID: profile.id,
                comicsId: comicsId,
            }
        }
        ); console.log("data", data)

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Something went wrong: ${error}` }, { status: 500 });
    }
}
