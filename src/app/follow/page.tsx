import React from "react";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PaginationControl from "@/components/PaginationControl";
import { User, Events } from "@prisma/client"

type props = {
    profileFetch: User,
    comicId: string,
    currentEvent: Events
  }
const getComicData = async (page: any, offset: any, ctid: any) => {
  const query = {
    page: page,
    offset: offset,
  };
  
  const urlPage = process.env.NEXT_PUBLIC_URL;
  let url = `${urlPage}/api/following?`;
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) url += key + "=" + value + "&";
  });
  const data = await fetch(url, { cache: "no-store" });
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
  const perPage = 40;
  const comicFetch = getComicData(page, perPage, categoryIDs);
  const [comicsData, ] = await Promise.all([
    comicFetch,
  ]);
  const { totalComicsCount, comics } = comicsData;
  return (
    <div className="container mx-auto">
        <h1 className = "mx-auto font-bold text-center text-2xl">Truyện đang theo dõi</h1>
      <Container data={comics} />
      <PaginationControl count={totalComicsCount} perPage={perPage} />
    </div>
  );
}
