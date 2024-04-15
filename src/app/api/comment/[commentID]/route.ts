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
          // commentReplies: recursive(2),
          user: true
        }
      })
      return NextResponse.json(data,{status: 200})
    }
  catch(error)
  {
      return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
  }
}