"use client";
import React from "react";
import ComicPage from "@/components/ComicPage";
import { Suspense } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";

const getPages = async (comicID: any, comicChapter: any) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;

  const data = await fetch(`${urlPage}/api/comic/${comicID}/${comicChapter}`);
  return data.json();
};

const getData = async (comicID: any) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const data = await fetch(`${urlPage}/api/comic/${comicID}`);
  return data.json();
};

function checkButton(ListChapter: Number, comicChapter: Number) {
  let checkPrev = true;
  let checkNext = true;

  const curPage = Number(comicChapter);
  const countChapter = Number(ListChapter);

  if (isNaN(curPage) || curPage < 1 || curPage > countChapter) {
    checkPrev = false;
    checkNext = false;
  } else if (curPage == countChapter) {
    checkNext = false;
  } else if (curPage == 1) {
    checkPrev = false;
  }
  return [checkNext, checkPrev];
}

export default async function ReadComicPage({ params }: { params: any }) {
  const router = useRouter();
  const comicChapter = params["read-comic-page"]; // chapter cua thg comic do
  const comicId = params["comic-page"]; // id cua thg comic

  const pagesData = getPages(comicId, comicChapter); // lay trang trong chapter do
  const ListData = getData(comicId);
  const [[count1, pages], [count2, data]] = await Promise.all([
    pagesData,
    ListData,
  ]);
  const ListChapter = data.comicChapters; // lay mang gom cac chapter

  const nOfChapter = data.comicChapters.length; // lay so phan tu cua mang tren
  const [hasNext, hasPrev] = checkButton(nOfChapter, comicChapter); // check button next, prev

  const handleSelectionChange = (e: any) => {
    const selectedChapter = e.target.value;
    if (selectedChapter == "") return;
    router.push(`/comic/${comicId}/${selectedChapter}`);
  };

  // console.log(ListChapter)
  return (
    <div className="p-8 w-full bg-gray-400 relative justify-center">
      <Suspense>
        <ComicPage data={pages["chapterImages"]} />
      </Suspense>

      <div className="p-1 flex w-full mx-auto gap-5 fixed bottom-0 bg-slate-200 dark:bg-gray-700 h-15 -ml-8 justify-center">
        <button
          onClick={() =>
            router.push(`/comic/${comicId}/${Number(comicChapter) - 1}`)
          }
          disabled={!hasPrev}
          className="p-3 rounded-full disabled:hidden bg-amber-400 flex gap-2 items-center hover:opacity-80 transition-opacity duration-300"
        >
          <TbPlayerTrackPrevFilled className="inline" />
        </button>
        <Select
          className="w-1/2"
          label="Chapter"
          items={ListChapter}
          defaultSelectedKeys={[comicChapter]}
          onChange={handleSelectionChange}
        >
          {ListChapter.map((chap: any) => (
            <SelectItem key={chap.chapterNumber} textValue={chap.chapterNumber}>
              Chương {chap.chapterNumber}
            </SelectItem>
          ))}
        </Select>
        <button
          onClick={() =>
            router.push(`/comic/${comicId}/${Number(comicChapter) + 1}`)
          }
          disabled={!hasNext}
          className="p-3 rounded-full disabled:hidden bg-amber-400 flex gap-2 items-center hover:opacity-80 transition-opacity duration-300"
        >
          <TbPlayerTrackNextFilled className="inline" />
        </button>
      </div>
    </div>
  );
}
