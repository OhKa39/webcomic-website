import ComicPage from "@/app/comic/[comic-page]/[read-comic-page]/_components/ComicPage";
import { Suspense } from "react";
// import visitedComics from "./_components/Visited-Comics"
import ChapterListBar from "./_components/ChapterListBar";
import { FaRegCommentDots } from "react-icons/fa6";
import CommentInput from "@/components/CommentInput";
import initialUser from "@/lib/initial-user";
import CommentContainer from "@/components/CommentContainer";

const getPages = async (comicID: any, comicChapter: any) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;

  const data = await fetch(`${urlPage}/api/comic/${comicID}/${comicChapter}`, {
    cache: "no-cache",
  }); // xoa
  return data.json();
};

const getData = async (comicID: any) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const data = await fetch(`${urlPage}/api/comic/${comicID}`);
  return data.json();
};

const increaseViewCount = async (
  comicID: any,
  comicChapter: any,
  chapterId: any
) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const data = await fetch(
    `${urlPage}/api/comic/${comicID}/${comicChapter}?chapterId=${chapterId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  const ListData = getData(comicId);
  const profileData = initialUser();
  const [pages, data, profile] = await Promise.all([
    pagesData,
    ListData,
    profileData,
  ]);
  const chapterId = pages.id;
  console.log(chapterId);
  const query = searchParams["commentID"];

  const viewCount = await increaseViewCount(comicId, comicChapter, chapterId);
  const ListChapter = data.comicChapters; // lay mang gom cac chapter
  return (
    <div className="p-8 w-full bg-gray-400 relative justify-center">
      {/* <Suspense> */}
      <ComicPage data={pages["chapterImages"]} />
      {/* </Suspense> */}

      <div className="mt-2 bg-white h-max px-12 sm:px-42 py-5 rounded-md">
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
