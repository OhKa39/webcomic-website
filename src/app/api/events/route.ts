import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import initialUser from '@/lib/initial-user';

export async function POST(req: NextRequest) {
    try {
        const profile = await initialUser();
        if (!profile) {
            return NextResponse.json(null, { status: 401 });
        }
        const data = await req.json();
        console.log(data)
        const event = await prisma.events.findFirst({
            where:{
                comicsId: data.query.comicsId,
                userID: profile.id,
            }
        });
        console.log(event)
        if(!!event)
        {
            const updateEvent = prisma.events.update({
                data:{
                    isTurnOn: !event.isTurnOn
                },
                where:{
                    id: event.id
                },
            });
            const updateLog = prisma.followLog.create({
                data:{
                    eventLogType: !event.isTurnOn == true ? "FOLLOW" : "UNFOLLOW",
                    eventID: event.id
                }
            })
            const [currentEvent, currentFollowLog] = await prisma.$transaction([
                updateEvent,
                updateLog,
              ]);
            return NextResponse.json(currentEvent, { status: 200 });
                
        }

        const updateEvent = await prisma.events.create({
            data:
                {
                    eventType: "FOLLOW",
                    userID: profile.id,
                    comicsId: data.query.comicsId,
                    followLog:{
                        create:
                        {
                            eventLogType: data.query.eventType,
                        }
                    }
                }
        })
        return NextResponse.json(updateEvent, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: `Something went wrong: ${error}` }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const userID = req.nextUrl.searchParams.get('id')
    const pageNumber = Number(req.nextUrl.searchParams.get('page')) || 1;
    const offset = Number(req.nextUrl.searchParams.get('offset'));

    try {
        const countQuery = prisma.events.count({where:{
            userID: userID!,
            isTurnOn: true,
            eventType: "FOLLOW"
        }})
        const comicsQuery = prisma.events.findMany({
            select: {
                comics: true
            },
            where: {
                userID: userID!,
                isTurnOn: true,
                eventType: "FOLLOW"
            },
            skip: (pageNumber - 1) * offset,
            take: offset
        });

        const [totalComicsCount, comics] = await prisma.$transaction([
            countQuery,
            comicsQuery,
        ]);

        const response = {
            totalComicsCount,
            comics,
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Something went wrong: ${error}` }, { status: 500 });
    }
}
