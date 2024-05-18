"use client";
import Container from "@/components/Container";
import { useEffect, useState } from "react";

export default function SignedInContainer() {
  const [data, setData] = useState([]);
  const [comicIdToDelete, setcomicIdToDelete] = useState("");

  useEffect(() => {
    async function getData() {
      const urlPage = process.env.NEXT_PUBLIC_URL;
      const comic = await fetch(`${urlPage}/api/SignedinHistory`).then((data) =>
        data.json()
      );
      comic.forEach((i: any) => {
        i.id = i.Comics.id;
        i.comicName = i.Comics.comicName;
        i.comicImageLink = i.Comics.comicImageLink;
        delete i["Comics"];
      });
      setData(comic);
    }
    getData();
  }, [comicIdToDelete]);

  if (data.length == 0) return <h1>không tìm thấy truyện!</h1>;

  return (
    <div>
      {data.length > 0 && (
        <Container setcomicIdToDelete={setcomicIdToDelete} data={data} />
      )}
    </div>
  );
}
