import ComicPage from "@/app/comic/[comic-page]/[read-comic-page]/_components/ComicPage";
import { Suspense } from "react";
import ChapterListBar from "./_components/ChapterListBar";
import initialUser from "@/lib/initial-user";
import { FaRegCommentDots } from "react-icons/fa6";
import CommentInput from "@/components/CommentInput";
import CommentContainer from "@/components/CommentContainer";
import { notFound } from "next/navigation";

const getPages = async (comicID: any, comicChapter: any) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;

  const data = await fetch(`${urlPage}/api/comic/${comicID}/${comicChapter}`); // xoa
  if (data.status === 404) notFound();
  return data.json();
};

const getData = async (comicID: any) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const data = await fetch(`${urlPage}/api/comic/${comicID}`);
  if (data.status === 404) notFound();
  return data.json();
};

const userHistory = async (comicID: any, chapterNumber: any) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const data = await fetch(
    `${urlPage}/api/comic/${comicID}/${chapterNumber}?`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comicID, chapterNumber }),
    }
  );
  return data.json();
};

export default async function ReadComicPage({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const comicChapter = params["read-comic-page"]; // chapter cua thg comic do
  const comicId = params["comic-page"]; // id cua thg comic
  const pagesData = getPages(comicId, comicChapter); // lay trang trong chapter do
  const listData = getData(comicId);
  const [pages, data] = await Promise.all([pagesData, listData]);
  const profile = await initialUser();
  const chapterId = pages["id"];
  const query = searchParams["commentID"];

  await userHistory(comicId, comicChapter);

  const ListChapter = data.comicChapters; // lay mang gom cac chapter
  return (
    <div className="p-8 w-full bg-gray-400 relative justify-center">
      <Suspense>
        <ComicPage data={pages["chapterImages"]} />
      </Suspense>

      <div className="mt-2 bg-white dark:bg-gray-400 h-max px-12 sm:px-42 py-5 rounded-md">
        <div className="flex gap-3 items-center text-lg">
          <FaRegCommentDots />
          <p className="font-bold">Bình luận</p>
        </div>
        <CommentInput user={profile} chapterID={chapterId} />
        <Suspense>
          <CommentContainer
            chapterID={chapterId}
            user={profile}
            query={query as string | undefined}
          />
        </Suspense>
      </div>

      <ChapterListBar
        listChapter={ListChapter}
        comicChapter={comicChapter}
        comicId={comicId}
      />
    </div>
  );
}
