import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import initialUser from '@/lib/initial-user'
import { pusherServer } from '@/lib/pusher'
import { Comments } from "@prisma/client";
export async function POST(req: NextRequest, context : any) {
    try{
        const profile = await initialUser()
        
        if(!profile)
          return NextResponse.json({message: `Unauthorized`},{status: 401})
        
        const data  = await req.json()  

        if((data.query.chapterID && data.query.comicID) || data.query.content.trim() === "")
          return NextResponse.json({message: `Bad Request`},{status: 400})

        // console.log(data)
        const dataOut = await prisma.comments.create({
          data:{
              content: data.query.content.trim(),
              userID: profile.id,
              comicsId: data.query.comicsID,
              comicChaptersId: data.query.chapterID,
              commentReplyId: data.query.commentID
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
         
        const id = data.query.commentID 
          ||  data.query.comicsID || data.query.chapterID
        await pusherServer.trigger(id, `commentMessage: ${id}`, dataOut)

        return NextResponse.json(dataOut,{status: 201})
    }
    catch(error)
    {
        return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
    }
}

export async function GET(req: NextRequest) //Lấy tất cả các root của comment
{
  try{
      const comicId = req.nextUrl.searchParams.get('ComicId') === "undefined" ? undefined : req.nextUrl.searchParams.get('ComicId')
      const chapterId = req.nextUrl.searchParams.get('chapterId') === "undefined" ? undefined : req.nextUrl.searchParams.get('chapterId')
      const data = await prisma.comments.findMany({
        where:{
          comicsId: comicId,
          commentReply: null,
          comicChaptersId: chapterId,
        },
        orderBy:{
          updateAt: "desc"
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
      return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
  }
}

export async function PATCH(req: NextRequest, context : any) { //chỉnh sửa nội dung comment
  try{
      const profile = await initialUser()
      
      if(!profile)
        return NextResponse.json({message: `Unauthorized`},{status: 401})
      
      const data  = await req.json()
      
      if(profile.id !== data.query.userId)  
        return NextResponse.json({message: `Forbidden`},{status: 403})

      if(data.query.content.trim() === "")
        return NextResponse.json({message: `Bad Request`},{status: 400})
      
      // console.log(data)
      const dataOut = await prisma.comments.update({
        where: {
          id: data.query.commentID,
        },
        data:{
            content: data.query.content.trim()
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
      
      const id = data.query.commentID 
      await pusherServer.trigger(id, `commentMessageEdit: ${id}`, dataOut)

      return new Response(null,{status: 204})
  }
  catch(error)
  {
      return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
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
      
      if(!profile)
        return NextResponse.json({message: `Unauthorized`},{status: 401})
      
      const data  = await req.json()

      if(profile.id !== data.query.comment.user.id)  
        return NextResponse.json({message: `Forbidden`},{status: 403})
      
      // console.log(data)
      await deleteCommentWithChildren(data.query.comment)
      
      const id = data.query.parentId
      await pusherServer.trigger(id, `commentMessageDelete: ${id}`, data.query.comment.id)

      return new Response(null,{status: 204})
  }
  catch(error)
  {
      return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
  }
}
