import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import initialUser from '@/lib/initial-user'
import { pusherServer } from '@/lib/pusher'
import { Comments } from "@prisma/client";

export async function GET(req: NextRequest, context : any)
{
  const recursive = async (id: string) => {
    const rootList: string[] = []
    while(!!id)
    {
      const self = await prisma.comments.findFirst({
        where:{
          id: id
        }
      })
      rootList.push(id)
      id = self?.commentReplyId!
    }
    return rootList
  }

  try{
      const commentID = context.params.commentID
      const isGetRootChain = req.nextUrl.searchParams.get("isGetRootChain")

      if(commentID === "undefined")
          return NextResponse.json({rootComment: []},{status: 200})

      if(isGetRootChain === "true") //Lấy chuỗi root query
      {
        const data =  await recursive(commentID)
        return NextResponse.json({rootComment: data},{status: 200})
      }

      //Lấy thông tin của comment có id là commentID
      const data = await prisma.comments.findMany({  
        where:{
          commentReplyId: commentID
        },
        orderBy:{
          updateAt: "asc"
        },
        include:{
          user: {
            select:{
              id: true,
              role: true,
              name: true,
              imageUrl: true
            }
          }
        }
      })
      return NextResponse.json(data,{status: 200})
    }
  catch(error)
  {
      // console.log(error)
      return NextResponse.json({ message: `Something is error`},{status: 500})
  }
}

export async function POST(req: NextRequest, context : any)
{
  const queryOptionLike = (isLike: boolean, userID: any) => {
    const connect: any = {
      connect: {
        id: userID
      }
    }
    const disconnect: any = {
      disconnect: {
        id: userID
      }
    }

    return (
      !isLike ? connect : disconnect
    );
  }

  try{
    const profile = await initialUser()
    if(!profile)
      return NextResponse.json({ message: `Unauthorized`},{status: 401})

    const data = await req.json()
    const commentID = context.params.commentID
    const {isLike} = data

    const dataUpdate = await prisma.comments.update({
      where:{
        id: commentID
      },
      data:{
        userLikes:{
          ...queryOptionLike(isLike, profile.id)
        }
      },
      include:{
        user: {
          select:{
            id: true,
            role: true,
            name: true,
            imageUrl: true
          }
        }
      }
    })

    // console.log(dataUpdate)
    await pusherServer.trigger(commentID, `commentMessageEdit: ${commentID}`, dataUpdate)
    return NextResponse.json(dataUpdate,{status: 201})
  }
  catch(error)
  {
    // console.log(error)
    return NextResponse.json({ message: `Something is error`},{status: 500})
  } 
}