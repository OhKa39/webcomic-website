import React, { useEffect, useState } from "react";
import { useSearchParams, notFound } from "next/navigation";
import Container from "@/components/Container";
import PaginationControl from "@/components/PaginationControl";
import ComicCategory from "@/components/ComicCategory";

const getData = async (page, offset, ctid) => {
  const query = {
    page: page,
    offset: offset,
    categoryIds: ctid,
  };
  let url = "http://localhost:3000/api/comic?";
  Object.entries(query).forEach(([key, value], index) => {
    if (value !== undefined) url += key + "=" + value + "&";
  });
  console.log(url)
  const data = await fetch(url, { cache: 'no-store' });
  return data.json();
};

export default async function SearchType({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const Page = searchParams["page"] ?? "1";
  const categoryIDs = searchParams["categoryIds"];
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const { totalComicsCount, comics } = await getData(page, 40, categoryIDs);
  return (
    <div className="container mx-auto">
      <ComicCategory />
      <Container data={comics} />
      <PaginationControl count={totalComicsCount} perPage={40} />
    </div>
  );
}