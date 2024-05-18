import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import initialUser from '@/lib/initial-user'
import { pusherServer } from '@/lib/pusher'
import {Prisma} from '@prisma/client'
export async function POST(req: NextRequest, context : any) { 
    try{
        const profile = await initialUser()
        
        if(!profile)
          return NextResponse.json({message: `Unauthorized: Please login to use this feature`},{status: 401})
        
        const data  = await req.json()  

        if((data.chapterID && data.comicsID))
          return NextResponse.json({message: `Bad Request: Can not have both chapterID and comicsID`},{status: 400})

        if(data.content.trim() === "")
          return NextResponse.json({message: `Bad Request: Content is required`},{status: 400})

        const comic = !data.comicsID ? undefined : 
          await prisma.comics.findUnique({
            where: {
              id: data.comicsID,
            },
          });

        if(comic === null)
          return NextResponse.json({message: `Not Found: Can not find comic`},{status: 404})

        const chapter = !data.chapterID ? undefined : 
          await prisma.comicChapters.findUnique({
            where: {
              id: data.chapterID,
            },
          });

        if(chapter === null)
          return NextResponse.json({message: `Not Found: Can not find comic chapter`},{status: 404})

        const commentReply = !data.commentID ? undefined : 
          await prisma.comments.findUnique({
            where: {
              id: data.commentID,
            },
          });

        if(commentReply === null)
          return NextResponse.json({message: `Not Found: Can not find comment reply`},{status: 404})

        const dataOut = await prisma.comments.create({
          data:{
              content: data.content.trim(),
              userID: profile.id,
              comicsId: data.comicsID,
              commentReplyId: data.commentReplyId,
              comicChaptersId: data.chapterID
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
         
        const id = data.commentID 
          ||  data.comicsID || data.chapterID
        await pusherServer.trigger(id, `commentMessage: ${id}`, dataOut)

        return NextResponse.json(dataOut,{status: 201})
    }
    catch(error: any)
    {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (error.code === 'P2023') {
              return NextResponse.json({ message: `Some fields are wrong format`},{status: 400})
          }
        }
        return NextResponse.json({ message: `something went wrong: ${error}`},{status: 500})
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2023') {
          return NextResponse.json([],{status: 200})
      }
    }
      return NextResponse.json({ message: `something went wrong:${error}`},{status: 500})
  }
}




