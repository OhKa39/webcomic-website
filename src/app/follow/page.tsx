import React, { useEffect } from "react";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PaginationControl from "@/components/PaginationControl";
import initialUser from "@/lib/initial-user";
import { useToast } from "@/components/ui/use-toast";

const getComicData = async (page: any, offset: any) => {
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

export default async function SearchType({ searchParams, }
  : {
    searchParams: { [key: string]: string | string[] | undefined };
  }) {

  const profile = await initialUser();
  if (!profile) {
    const { toast } = useToast();
    toast({
      variant: "warning",
      title: "Đã có lỗi xảy ra",
      description: "Vui lòng đăng nhập để sử dụng tính năng này",
    });
    return (
      <div className="container mx-auto">
        <h1 className="mx-auto mt-5 font-bold text-center text-2xl text-red">VUI LÒNG ĐĂNG NHẬP ĐỂ SỬ DỤNG TÍNH NĂNG NÀY</h1>
      </div>
    )
  }
  const Page = searchParams["page"] ?? "1";
  const categoryIDs = searchParams["categoryIds"];
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const perPage = 40;
  const comicFetch = getComicData(page, perPage);
  const [comicsData,] = await Promise.all([
    comicFetch,
  ]);
  const { totalComicsCount, comics } = comicsData;


  return (
    <div className="container mx-auto">
      <h1 className="mx-auto mt-5 font-bold text-center text-2xl w-max">Truyện đang theo dõi</h1>
      <Container data={comics} />
      <PaginationControl count={totalComicsCount} perPage={perPage} />
    </div>
  );
}
