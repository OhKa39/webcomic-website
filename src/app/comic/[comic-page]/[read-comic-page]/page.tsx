"use client";
import ComicPage from "@/app/comic/[comic-page]/[read-comic-page]/_components/ComicPage";
import { Suspense } from "react";
import visitedComics from "./_components/Visited-Comics"
import ChapterListBar from "./_components/ChapterListBar";

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


export default async function ReadComicPage({ params }: { params: any }) {  
  const comicChapter = params["read-comic-page"]; // chapter cua thg comic do
  const comicId = params["comic-page"]; // id cua thg comic
  visitedComics(comicChapter, comicId)
  
  const pagesData = getPages(comicId, comicChapter); // lay trang trong chapter do
  const ListData = getData(comicId);
  const [pages, data] = await Promise.all([pagesData, ListData]);
  const ListChapter = data.comicChapters; // lay mang gom cac chapter
  return (
    <div className="p-8 w-full bg-gray-400 relative justify-center">
      <Suspense>
        <ComicPage data={pages["chapterImages"]} />
      </Suspense>

    <ChapterListBar listChapter={ListChapter} comicChapter={comicChapter} comicId={comicId}/>
    </div>
  );
}