import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import {Prisma} from '@prisma/client'
export async function GET(req: NextRequest) {
  try {
    if(isNaN(Number(req.nextUrl.searchParams.get('page')))
      || isNaN(Number(req.nextUrl.searchParams.get('offset'))))
      return NextResponse.json(
        { message: `Bad request: Page or offset must be a number` },
        { status: 400 }
      );
    const pageNumber = Number(req.nextUrl.searchParams.get('page'));
    const offset = Number(req.nextUrl.searchParams.get('offset'));
    const categoryID = req.nextUrl.searchParams.get('categoryIds');
    const sValue = req.nextUrl.searchParams.get('sValue');
    const value = sValue?.replace(/\?/g, "\\?")

    const whereClause = {
      comicTypesIDs: {
        hasEvery: !!categoryID ? categoryID.split(",") : [],
      },
      comicName: {
        contains: !!value ? value.toLowerCase().trim() : "",
        mode: "insensitive"
      }
    } as any;

    const countQuery = prisma.comics.count({ where: whereClause });
    const comicsQuery = prisma.comics.findMany({
      where: whereClause,
      skip: (pageNumber - 1) * offset,
      take: offset,
      select: {
        id: true,
        comicName: true,
        updatedAt: true,
        comicImageLink: true,
        comicTypesIDs: true
      },
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2023') {
          return NextResponse.json({totalComicsCount: 0, comics: []},{status: 200})
      }
    }
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
