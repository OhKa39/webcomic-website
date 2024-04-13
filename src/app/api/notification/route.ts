import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import initialUser from '@/lib/initial-user'
import { pusherServer } from '@/lib/pusher'
import { Comments } from "@prisma/client";

export async function GET(req: NextRequest)
{
  try{
    const userID = req.nextUrl.searchParams.get('userID')
    const data = await prisma.notifications.findMany({
      where:
      {
        events:{
          userID: userID!,
        }
      },
      include:{
        events:{
          include:
          {
            user: true,
          }
        },
        commentActor: {
          include:{
            user:true,
            comics: true,
            comicChapters: true
          }
        },
        entityNotification: true
      },
      orderBy:{
        commentActor:{
          updateAt: 'desc'
        }
      }
    })
    return NextResponse.json(data,{status: 200})
  }
  catch(error)
  {
    return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
  }
}

export async function PUT(req: NextRequest)
{
  try{
    const data = await req.json()

    const updateData = await prisma.notifications.update({
      where:{
        id: data.query.id
      },
      data:{
        isRead: !data.query.isRead
      },
      include:{
        events:{
          include:
          {
            user: true,
          }
        },
        commentActor: {
          include:{
            user:true,
            comics: true,
            comicChapters: true
          }
        },
        entityNotification: true
      },
    })

    await pusherServer.trigger(data.query.userID, `NotificationUpdate: ${data.query.userID}`, updateData)
    return NextResponse.json({ message: `Update notification successfully`},{status: 200})
  }
  catch(error)
  {
    return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
  }
}