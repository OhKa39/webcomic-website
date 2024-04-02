import Container from "@/components/Container";
import { PiBookOpenFill } from "react-icons/pi";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import initialUser from "@/lib/initial-user";

const getData = async (page: number, offset: number) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const data = await fetch(
    `${urlPage}/api/comic?page=${page}&offset=${offset}`,
    {
      next: { revalidate: 5 },
    }
  );
  return data.json();
};

export default async function Home({}) {
  const profile = await initialUser();
  const perPage = 20;

  const { totalComicsCount, comics } = await getData(1, perPage);
  return (
    <div className="p-3 pt-4 text-center">
      <PiBookOpenFill className="inline" />
      <h1 className="uppercase font-bold">New Comics</h1>
      <Container data={comics} />
      <Link href={`/new-comic?page=1`}>
        <Button
          color="warning"
          variant="shadow"
          className="text-white text-base m-2"
        >
          Xem thêm nhiều truyện
        </Button>
      </Link>
    </div>
  );
}
