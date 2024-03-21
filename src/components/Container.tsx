import React from "react";
import ContainerItems from "./Container-items";

// async function getData() {
//     const res = await fetch('http://localhost:3000/api/comic?page=1')

//     return res.json()
//   }

// export default async function Container() {
//     const data = await getData()
//     return (
//         <div className="grid grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5">
//             <ContainerItems data={data} />
// import { PrismaClient, SortOrder } from "@prisma/client";
// import { useSearchParams } from "next/navigation";
// import PaginationControls from "./PaginationControl";

//import axios from "axios";

// async function getContainerItems({page}) {
//     const allComics = await prisma.comics.findMany({
//         take: PER_PAGE,
//         skip: (page - 1) * PER_PAGE,
//         select: {
//             id: true,
//             comicName: true,
//             comicImageLink: true,
//             isCompleted: true,
//             authorName: true,
//             updatedAt: true,
//             createdAt: true
//         },
//         // orderBy: {
//         //     createdAt: SortOrder.desc,
//         // }

//     })
//     const count = await prisma.comics.count()

//     return {data: allComics, count: count}
// }

export default function Container({ data }) {
  //   console.log(data);

  return (
    <div>
      <div className="grid grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5">
        <ContainerItems data={data} />
      </div>
    </div>
  );
}
