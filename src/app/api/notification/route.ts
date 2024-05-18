import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import initialUser from '@/lib/initial-user'
import { pusherServer } from '@/lib/pusher'
import { Comments } from "@prisma/client";

export async function GET(req: NextRequest)
{
  try{
    const profile = await initialUser()
    if(!profile)
      return NextResponse.json({message: `Unauthorized: Please login to use this feature`},{status: 401})
    const userID = profile!.id;
    // const userID = req.nextUrl.searchParams.get('userID')
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
            user: {
              select:{
                id: true,
                role: true,
                name: true,
                imageUrl: true
              }
            }
          }
        },
        commentActor: {
          include:{
            user: {
              select:{
                id: true,
                role: true,
                name: true,
                imageUrl: true
              }
            },
            comics: {
              select: {
                id: true,
                comicName: true,
              }
            },
            comicChapters: {
              select:{
                id: true,
                chapterNumber: true,
                comics: {
                  select: {
                    id: true,
                    comicName: true,
                  }
                }
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
    return NextResponse.json({ message: `something went wrong:${error}`},{status: 500})
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
            user: {
              select:{
                id: true,
                role: true,
                name: true,
                imageUrl: true
              }
            }
          }
        },
        commentActor: {
          include:{
            user: {
              select:{
                id: true,
                role: true,
                name: true,
                imageUrl: true
              }
            },
            comics: {
              select:{
                id: true,
                comicName: true,
              }
            },
            comicChapters: {
              select:{
                id: true,
                chapterNumber: true,
                comics:{
                  select:{
                    id: true,
                    comicName: true,
                  }
                }
              }
            }
          }
        },
        entityNotification: true
      },
    })

    await pusherServer.trigger(data.query.userID, `NotificationUpdate: ${data.query.userID}`, updateData)
    return new Response(null,{status: 204})
  }
  catch(error)
  {
    return NextResponse.json({ message: `something went wrong:${error}`},{status: 500})
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

      const COMMENT_NOTIFICATION_ENTITYID = "661962f9da0105ab37470cb9"
      for(const ele of followerComment){
        const dataNotificationOut = await prisma.notifications.create({
          data:{
            commentsActorId: data.queryNotification.currentComment.id,
            entityNotificationId: COMMENT_NOTIFICATION_ENTITYID,
            eventsId: ele.id
          },
          include:{
            events:{
              include:
              {
                user: {
                  select:{
                    id: true,
                    role: true,
                    name: true,
                    imageUrl: true
                  }
                }
              }
            },
            commentActor: {
              include:{
                user: {
                  select:{
                    id: true,
                    role: true,
                    name: true,
                    imageUrl: true
                  }
                },
                comics: {
                  select:{
                    id: true,
                    comicName: true,
                  }
                },
                comicChapters: {
                  select:{
                    id: true,
                    chapterNumber: true,
                    comics:{
                      select:{
                        id: true,
                        comicName: true,
                      }
                    }
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
    return NextResponse.json({ message: `something went wrong:${error}`},{status: 500})
  }
}