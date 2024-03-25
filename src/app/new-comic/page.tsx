// "use client";
import React, { Suspense } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import PaginationControls from "@/components/PaginationControl";
const getData = async (page, offset) => {
  const data = await fetch(
    `http://localhost:3000/api/comic?page=${page}&offset=${offset}`
  );
  const dataJson = await data.json();
  return dataJson;
};

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const Page = searchParams["page"] ?? "1";
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const { totalComicsCount, comics } = await getData(page, 40);
  return (
    <div className="container mx-auto text-center">
      <Container data={comics} />
      <PaginationControls count={totalComicsCount} perPage={40} />
    </div>
  );
}

// export default page
