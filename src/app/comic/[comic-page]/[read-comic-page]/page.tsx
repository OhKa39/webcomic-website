'use client'
import React from 'react'

import ComicPage from '@/components/ComicPage'
import { useRouter } from 'next/navigation'
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";

const getPages = async (comicID : any, comicChapter: any) => {
  const data = await fetch(
    `http://localhost:3000/api/comic/${comicID}/${comicChapter}`
  );
  return data.json();
};

const getData = async (comicID : any) => {
  const data = await fetch(
    `http://localhost:3000/api/comic/${comicID}`
  );
  return data.json();
};

function checkButton(ListChapter: Number, comicChapter: Number)  {
  let checkPrev = true;
  let checkNext = true;

  const curPage = Number(comicChapter)
  const countChapter = Number(ListChapter)

  if (isNaN(curPage) || curPage < 1 || curPage > countChapter) {
    checkPrev = false;
    checkNext = false;
  }
  else if (curPage == countChapter) {
    checkNext = false;
  }
  else if (curPage == 1) {
    checkPrev = false;
  }
  return [checkNext, checkPrev];
}


export default async function ReadComicPage({params}) {
  const router = useRouter()
  const comicId = params['comic-page']
  const comicChapter = params['read-comic-page']

  const [count, pages] = await getPages(comicId, comicChapter);
  const [count2, data] = await getData(comicId)  
 
  const nOfChapter = data.comicChapters.length
  const [hasNext, hasPrev] = checkButton(nOfChapter, comicChapter)

  return (
    <div className='p-8 w-auto'>
      <div className='flex gap-5 justify-center pb-5 '>
        <button onClick={()=>router.push(`/comic/${comicId}/${Number(comicChapter) - 1}`)} disabled={!hasPrev} className='disabled:hidden p-3 bg-amber-400 flex gap-2 items-center hover:underline hover:underline-offset-8'><TbPlayerTrackPrevFilled className="inline" />Tập trước </button>
        <button onClick={()=>router.push(`/comic/${comicId}/${Number(comicChapter) + 1}`)} disabled={!hasNext} className='disabled:hidden p-3 bg-amber-400 flex gap-2 items-center hover:underline hover:underline-offset-8'>Tập tiếp theo<TbPlayerTrackNextFilled className="inline" /></button>
      </div>
      <ComicPage data={pages['chapterImages']}/>
    </div>
  )
}
