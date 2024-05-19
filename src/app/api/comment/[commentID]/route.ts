import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import initialUser from '@/lib/initial-user'
import { pusherServer } from '@/lib/pusher'
import { Comments } from "@prisma/client";
import {Prisma} from '@prisma/client'
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

      // if(commentID === "undefined")
      //     return NextResponse.json({rootComment: []},{status: 200})

      if(isGetRootChain === "true") //Lấy chuỗi root query
      {
        const data =  await recursive(commentID)
        return NextResponse.json(data,{status: 200})
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2023') {
          return NextResponse.json([],{status: 200})
      }
    }
      // console.log(error)
      return NextResponse.json({ message: `something went wrong`},{status: 500})
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
      return NextResponse.json({ message: `Unauthorized: Please login to use this feature`},{status: 401})

    const data = await req.json()
    const commentID = context.params.commentID
    const {isLike} = data

    const comment = await prisma.comments.findUnique({
      where:{
        id: commentID
      }
    })
    if(!comment)
      return NextResponse.json({message: `Not Found: Can not find comment`},{status: 404})


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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2023') {
          return NextResponse.json({ message: `Not Found: Can not find comment`},{status: 404})
      }
    }
    // console.log(error)
    return NextResponse.json({ message: `something went wrong`},{status: 500})
  } 
}

export async function PATCH(req: NextRequest, context : any) { //chỉnh sửa nội dung comment
  try{
      const profile = await initialUser()
      const commentID = context.params.commentID;
      if(!profile)
        return NextResponse.json({message: `Unauthorized: Please login to use this feature`},{status: 401})
      
      const data  = await req.json()

      const comment = await prisma.comments.findUnique({
        where:{
          id: commentID
        }
      })
      if(!comment)
        return NextResponse.json({message: `Not Found: Can not find comment`},{status: 404})

      if(profile.id !== comment.userID)  
        return NextResponse.json({message: `Forbidden: Can not edit comment with this account`},{status: 403})

      if(data.content.trim() === "")
        return NextResponse.json({message: `Bad Request: content is required`},{status: 400})
      
      // console.log(data)
      const dataOut = await prisma.comments.update({
        where: {
          id: commentID,
        },
        data:{
            content: data.content.trim()
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
      
      const id = commentID 
      await pusherServer.trigger(id, `commentMessageEdit: ${id}`, dataOut)

      return new Response(null,{status: 204})
  }
  catch(error: any)
  {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2023') {
          return NextResponse.json({ message: `Not Found: Can not find comment`},{status: 404})
      }
    }
    return NextResponse.json({ message: `something went wrong:${error}`},{status: 500})
  }
}

export async function DELETE(req: NextRequest, context : any) {
  async function deleteCommentWithChildren(node: Comments) {
    return prisma.$transaction(async (tx)=>{
      const children = await tx.comments.findMany({
        where: {
          commentReply: {
            id: node.id,
          },
        },
      });
    
      for (const child of children) {
        await deleteCommentWithChildren(child);
      }
    
      await prisma.comments.delete({
        where: {
          id: node.id,
        },
      });
    })
  }

  try{
      const profile = await initialUser()
      const commentID = context.params.commentID;

      if(!profile)
        return NextResponse.json({message: `Unauthorized: Please login to use this feature`},{status: 401})
      
      const data  = await req.json()
      const comment = await prisma.comments.findUnique({
        where:{
          id: commentID
        }
      })
      if(!comment)
        return NextResponse.json({message: `Not Found: Can not find comment`},{status: 404})

      if(profile.id !== comment.userID)  
        return NextResponse.json({message: `Forbidden: Can not delete comment with this account`},{status: 403})
      
      // console.log(data)
      await deleteCommentWithChildren(comment)
      
      const id = data.parentId
      await pusherServer.trigger(id, `commentMessageDelete: ${id}`, comment.id)

      return new Response(null,{status: 204})
  }
  catch(error)
  {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2023') {
            return NextResponse.json({ message: `Not Found: Can not find comment`},{status: 404})
        }
      }
      return NextResponse.json({ message: `something went wrong:${error}`},{status: 500})
  }
}