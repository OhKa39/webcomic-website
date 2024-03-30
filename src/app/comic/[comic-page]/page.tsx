import Image from "next/image";

import { FaUserTie } from "react-icons/fa";
import { RiCalendarCheckFill } from "react-icons/ri";
import { ImPen } from "react-icons/im";
import { FaRegListAlt } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import { Button } from "@nextui-org/react";

import Link from "next/link";
import ComicMenu from "@/components/ComicMenu";
import ComicPageButton from "@/components/ComicPageButtons";

const getComic = async (comicID: any) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const data = await fetch(`${urlPage}/api/comic/${comicID}`);
  return data.json();
};

export default async function comicPage({ params }: { params: any }) {
  const path = params["comic-page"];
  const [count, comic] = await getComic(path);

  return (
    <div className="px-12 sm:px-42 py-5">
      <div className="gap-10 flex pb-8">
        <div className="rounded border-amber-400 border-4 w-60 hidden md:inline">
          <Image
            src={comic.comicImageLink}
            width={150}
            height={150}
            style={{
              width: "100%",
              height: "100%",
            }}
            alt="Picture of comic"
          />
        </div>
        <div className="text-left text-lg">
          <h1 className="font-bold">{comic.comicName}</h1>
          <ul className="leading-10">
            <li>
              {" "}
              <FaUserTie className="inline" /> Tác giả: {comic.authorName}
            </li>
            <li>
              {" "}
              <RiCalendarCheckFill className="inline" /> Tình trạng:{" "}
              {comic.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
            </li>
            <li>
              {" "}
              <AiFillLike className="inline" /> Lượt thích:{" "}
              {comic.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
            </li>
            <li>
              {" "}
              <FaHeart className="inline" /> Lượt theo dõi:{" "}
              {comic.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
            </li>
            <li>
              {" "}
              <FaRegEye className="inline" /> Lượt xem:{" "}
              {comic.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
            </li>
          </ul>
          <div className="flex gap-5 mt-6">
            <Link
              href={
                "/comic/" +
                comic.id +
                "/" +
                comic.comicChapters[0].chapterNumber
              }
            >
              <Button className="font-bold" color="warning">
                Đọc từ đầu
              </Button>{" "}
            </Link>
            <ComicPageButton />
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center text-lg ">
        <ImPen className="inline" />
        <p className="font-bold"> Giới thiệu</p>
      </div>
      <div>
        <p className="text-left text-lg pb-8 ">{comic.comicDescription}</p>
      </div>
      <div className="flex gap-3 items-center text-lg">
        <FaRegListAlt />
        <p className="font-bold">Danh sách chương</p>
      </div>
      <div className="overflow-auto h-44">
        <ComicMenu data={comic.comicChapters.reverse()} path={path} />
      </div>
      <div className="flex gap-3 items-center text-lg">
        <FaRegCommentDots />
        <p className="font-bold">Bình luận</p>
      </div>
    </div>
  );
}
