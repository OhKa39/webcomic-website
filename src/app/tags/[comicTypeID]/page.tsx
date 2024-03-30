import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PaginationControl from "@/components/PaginationControl";

const getData = async (page: any, offset: any, ctid: any) => {
  const query = {
    page: page,
    offset: offset,
    categoryIds: ctid,
  };
  const urlPage = process.env.NEXT_PUBLIC_URL;
  let url = `${urlPage}/api/comic?`;
  Object.entries(query).forEach(([key, value], index) => {
    if (value !== undefined) url += key + "=" + value + "&";
  });
  const data = await fetch(url, { cache: "no-store" });
  return data.json();
};

export default async function SearchType({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: any;
}) {
  const Page = searchParams["page"] ?? "1";
  const categoryIDs = params.comicTypeID;
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const { totalComicsCount, comics } = await getData(page, 40, categoryIDs);
  return (
    <div className="container mx-auto">
      <Container data={comics} />
      <PaginationControl count={totalComicsCount} perPage={40} />
    </div>
  );
}
