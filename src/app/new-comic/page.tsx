// "use client";
import React, { Suspense } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import PaginationControls from "@/components/PaginationControl";
const getData = async (page, offset) => {
  const data = await fetch(
    `http://localhost:3000/api/comic?page=${page}&offset=${offset}`
  );
  return data.json();
};

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const Page = searchParams["page"] ?? "1";
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const [count, data] = await getData(page, 40);
  return (
    <div className="container mx-auto text-center">
      <Container data={data} />
      <PaginationControls count={count} perPage={40} />
    </div>
  );
}

// export default page
