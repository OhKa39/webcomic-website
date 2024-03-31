import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
export async function GET(req: NextRequest) {

  try {
    const pageNumber = Number(req.nextUrl.searchParams.get('page'));
    const offset = Number(req.nextUrl.searchParams.get('offset'));
    const categoryID = req.nextUrl.searchParams.get('categoryIds');

    const whereClause = {
      comicTypesIDs: {
        hasEvery: !!categoryID ? categoryID.split(",") : [],
      }
    };

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
        // comicTypesIDs: true
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
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
