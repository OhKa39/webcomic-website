import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import initialUser from '@/lib/initial-user'
import { pusherServer } from '@/lib/pusher'
export async function POST(req: NextRequest, context : any) {
    try{
        const profile = await initialUser()
        
        if(!profile)
          return NextResponse.json({message: `Unauthorized`},{status: 401})
        
        const data  = await req.json()  
        
        console.log(data)
        const dataOut = await prisma.comments.create({
          data:{
              content: data.query.content,
              userID: profile.id,
              comicsId: data.query.comicsID,
              comicChaptersId: data.query.chapterID,
              commentReplyId: data.query.commentID
          },
          select:{
            id: true,
            user: true,
            content: true,
            updateAt: true,
            commentReplies: true,
            likes: true
          }
        })
        
        const id = data.query.commentID 
          ||  data.query.comicsID || data.query.chapterID
        await pusherServer.trigger(id, `commentMessage: ${id}`, dataOut)

        return NextResponse.json(dataOut,{status: 200})
    }
    catch(error)
    {
        return NextResponse.json({ message: `Something is error:${error}`},{status: 500})
    }
}

export async function GET(req: NextRequest)
{
  const recursive = (level: number) => {
    if (level === 0) {
      return {
        include: {
          commentReplies: true,
          user: true
        }
      };
    }
    return {
      include: {
        commentReplies: recursive(level - 1),
        user: true
      }
    };
  }
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
          commentReplies: recursive(6),
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
