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
            comicChapters: {
              include: {
                comics: true
              }
            }
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

export async function PATCH(req: NextRequest)
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
            comicChapters: {
              include:{
                comics:true
              }
            }
          }
        },
        entityNotification: true
      },
    })

    await pusherServer.trigger(data.query.userID, `NotificationUpdate: ${data.query.userID}`, updateData)
    return NextResponse.json(updateData,{status: 204})
  }
  catch(error)
  {
    return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
  }
}

export async function POST(req: NextRequest){
  try{
    const profile = await initialUser()

    if(!profile)
      return NextResponse.json({message: `Unauthorized`},{status: 401})
        
    const data = await req.json()

    // console.log(data)

    const subscribeEvent = await prisma.events.create({
      data:{
        eventType: "COMMENT",
        userID: profile!.id,
        commentsId: data.queryNotification.currentComment.id
      }
    })
    
    if(!!data.queryNotification.commentID)
    {
      const followerComment = await prisma.events.findMany({
        where:
        {
          commentsId: data.queryNotification.commentID,
          userID: {
            not: profile.id
          },
          isTurnOn: true 
        },
      })

      for(const ele of followerComment){
        const dataNotificationOut = await prisma.notifications.create({
          data:{
            commentsActorId: data.queryNotification.currentComment.id,
            entityNotificationId: "661962f9da0105ab37470cb9",
            eventsId: ele.id
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
                comicChapters: {
                  include:{
                    comics:true
                  }
                }
              }
            },
            entityNotification: true
          }
        })
        await pusherServer.trigger(ele.userID, `notificationMessage: ${ele.userID}`, dataNotificationOut)
      }

      const subscribeParentEvent = await prisma.events.findFirst({
        where:{
          eventType: "COMMENT",
          userID: profile.id,
          commentsId: data.queryNotification.commentID 
        }
      })

      if(!subscribeParentEvent)
      {
        const subscribeParent = await prisma.events.create({
          data: {
            eventType: "COMMENT",
            userID: profile.id,
            commentsId: data.queryNotification.commentID 
          }
        })
      }
    }
    return NextResponse.json({ message: `Push notification successfully`},{status: 201})
  }
  catch(error)
  {
    return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
  }
}