// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/db';


// export async function GET(req: NextRequest, context: any) {
//     //const userID = context.params["userID"]
//     try {
//         const comicsId = context.params.comicsId
//         const userID = req.nextUrl.searchParams.get('userID')

//         const data = await prisma.comics.findFirst({
//             select: {
//                 id: true,
//                 comicName: true,
//                 updatedAt: true,
//                 comicImageLink: true,
//             },
//             orderBy: {
//                 createdAt: "desc"
//             },
//             where: {
//                 events: {
//                     some:{
//                         eventType:"FOLLOW"
//                     }
//                 },
//             },
//         }
//         );
//         console.log("data", data)

//         return NextResponse.json(data, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ message: `Something went wrong: ${error}` }, { status: 500 });
//     }
// }