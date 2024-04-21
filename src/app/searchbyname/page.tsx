import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PaginationControl from "@/components/PaginationControl";
import ComicCategory from "@/app/search/_components/ComicCategory";

const getComicData = async (page: any, offset: any, searchValue: any) => {
  const query = {
    page: page,
    offset: offset,
    sValue: searchValue,
  };
  const urlPage = process.env.NEXT_PUBLIC_URL;
  let url = `${urlPage}/api/comic?`;
  Object.entries(query).forEach(([key, value], index) => {
    if (value !== undefined) url += key + "=" + value + "&";
  });
  const data = await fetch(url, { cache: "no-store" });
  return data.json();
};

export default async function SearchByName({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const Page = searchParams["page"] ?? "1";
  const Name = searchParams["sValue"];
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const perPage = 40;
  const comicFetch = await getComicData(page, perPage, Name);

  const { totalComicsCount, comics } = comicFetch;
  if (totalComicsCount == 0) {
    return <div>Tìm thấy: {totalComicsCount} kết quả!</div>;
  }
  return (
    <div className="container mx-auto">
      <div className="pt-5 font-bold text-lg">
        Tìm thấy: {totalComicsCount} kết quả!
      </div>
      <Container data={comics} />
      <PaginationControl count={totalComicsCount} perPage={perPage} />
    </div>
  );
}
