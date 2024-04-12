// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/db';

// export async function GET(req: NextRequest) {
//     try {
//         const pageNumber = Number(req.nextUrl.searchParams.get('page')) || 1;
//         const offset = Number(req.nextUrl.searchParams.get('offset'));

//         const countQuery = prisma.comics.count({
//             where: {
//                 AND: [
//                     {
//                         events: {
//                             some: {
//                                 eventType: "FOLLOW",
//                             }
//                         },
//                     },
//                     {
//                         NOT: {
//                             events: {
//                                 some: {
//                                     eventType: "UNFOLLOW",
//                                 }
//                             },
//                         },
//                     },
//                 ],
//             },
//             orderBy: {
//                 createdAt: "desc"
//             },
//         });

//         const comicsQuery = prisma.comics.findMany({
//             select: {
//                 id: true,
//                 comicName: true,
//                 updatedAt: true,
//                 comicImageLink: true,
//                 events: {
//                     select: {
//                         eventType: true,
//                     },
//                     orderBy: {
//                         createdAt: "desc"
//                     },
//                     take: 1,
//                 }
//             },
//             where: {
//                 AND: [
//                     {
//                         events: {
//                             some: {
//                                 eventType: "FOLLOW"
//                             }
//                         },
//                     },
//                     {
//                         NOT: {
//                             events: {
//                                 some: {
//                                     eventType: "UNFOLLOW"
//                                 }
//                             },
//                         },
//                     },
//                 ],
//             },
//             orderBy: {
//                 updatedAt: "desc"
//             },
//             skip: (pageNumber - 1) * offset,
//             take: offset
//         });

//         const [totalComicsCount, comics] = await prisma.$transaction([
//             countQuery,
//             comicsQuery,
//         ]);

//         const response = {
//             totalComicsCount,
//             comics,
//         };

//         console.log("comicsQuery", comicsQuery)


//         return NextResponse.json(response, { status: 200 });
//     }
//     catch (error) {
//         return NextResponse.json(
//             { message: `Something went wrong: ${error}` },
//             { status: 500 }
//         );
//     }
// }
