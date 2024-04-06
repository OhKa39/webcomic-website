import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';


export async function GET(req: NextRequest, context: any) {
    //const userID = context.params["userID"]
    try {
        const comicsId = context.params.comicsId
        const userID = req.nextUrl.searchParams.get('userID')

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
                userID: userID!,
                comicsId: comicsId,
            }
        }
        );
        console.log("data", data)

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Something went wrong: ${error}` }, { status: 500 });
    }
}