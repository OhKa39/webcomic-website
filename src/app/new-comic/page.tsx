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
  let perPage = 40
  if (page <= 0 || isNaN(page)) notFound();
  const [count, data] = await getData(page, perPage);
  return (
    <div className="container p-auto pt-4 text-center m-auto ">
      <Suspense fallback={<p>Loading feed...</p>}>
        <Container data={data} />
      </Suspense>

      <PaginationControls count={count} perPage={perPage} />
    </div>
  );
}

// export default page
