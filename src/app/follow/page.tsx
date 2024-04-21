import React from "react";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PaginationControl from "@/components/PaginationControl";
import initialUser from "@/lib/initial-user";
// import { useToast } from "@/components/ui/use-toast";

const getComicData = async (page: any, offset: any, id: string) => {
  const query = {
    id,
    page,
    offset,
  };

  const urlPage = process.env.NEXT_PUBLIC_URL;
  let url = `${urlPage}/api/follow?`;
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
  const profile = await initialUser();
  if (!profile) {
    // const { toast } = useToast();
    // toast({
    //   variant: "warning",
    //   title: "Đã có lỗi xảy ra",
    //   description: "Vui lòng đăng nhập để sử dụng tính năng này",
    // });
    return (
      <div className="container mx-auto">
        <h1 className="mx-auto mt-5 font-bold text-center text-2xl text-red">
          VUI LÒNG ĐĂNG NHẬP ĐỂ SỬ DỤNG TÍNH NĂNG NÀY
        </h1>
      </div>
    );
  }
  const Page = searchParams["page"] ?? "1";
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const perPage = 40;
  const { totalComicsCount, comics } = await getComicData(
    page,
    perPage,
    profile.id
  );

  return (
    <div className="container mx-auto min-h-screen h-auto">
      <h1 className="mx-auto mt-5 font-bold text-center text-2xl w-max">
        Truyện đang theo dõi
      </h1>
      <Container data={comics.map((comic: any) => comic.comics)} />
      <PaginationControl count={totalComicsCount} perPage={perPage} />
    </div>
  );
}
