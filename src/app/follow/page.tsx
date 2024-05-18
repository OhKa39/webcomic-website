import React from "react";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PaginationControl from "@/components/PaginationControl";
import initialUser from "@/lib/initial-user";
// import { useToast } from "@/components/ui/use-toast";

const getComicData = async (page: any, offset: any) => {
  const query = {
    page,
    offset,
  };

  const urlPage = process.env.NEXT_PUBLIC_URL;
  let url = `${urlPage}/api/follow?`;
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) url += key + "=" + value + "&";
  });
  const data = await fetch(url, { cache: "no-cache" });
  return data.json();
};

export default async function SearchType({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const Page = searchParams["page"] ?? "1";
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const perPage = 40;
  const data = await getComicData(page, perPage);
  if (data.message === "Unauthorized: Please login to use this feature")
    return (
      <div className="container mx-auto">
        <h1 className="mx-auto mt-5 font-bold text-center text-2xl text-red">
          VUI LÒNG ĐĂNG NHẬP ĐỂ SỬ DỤNG TÍNH NĂNG NÀY
        </h1>
      </div>
    );

  return (
    <div className="container mx-auto min-h-screen h-auto">
      <h1 className="mx-auto mt-5 font-bold text-center text-2xl w-max">
        Truyện đang theo dõi
      </h1>
      <Container data={data.comics.map((comic: any) => comic.comics)} />
      <PaginationControl count={data.totalComicsCount} perPage={perPage} />
    </div>
  );
}
