'use client'
import React from 'react'
import ComicPage from '@/components/ComicPage'

import {Select, SelectItem} from "@nextui-org/react";
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
  Promise.all([getPages, getData])
  const ListChapter = data.comicChapters

  console.log(ListChapter)
  const nOfChapter = data.comicChapters.length
  const [hasNext, hasPrev] = checkButton(nOfChapter, comicChapter)
  
  return (
    <div className='p-8 w-full bg-gray-400 relative'> 
      {/* <Select label="Chapter" items={ListChapter}>
        {ListChapter.map((chap) => <SelectItem key={chap.chapterNumber}>Chuong {chap.chapterNumber}</SelectItem>)}
      </Select>   */}
      <ComicPage data={pages['chapterImages']}/>
      <div className='flex w-full gap-5 justify-center fixed bottom-0  bg-black h-12 -ml-8'>   
        <button onClick={()=>router.push(`/comic/${comicId}/${Number(comicChapter) - 1}`)} disabled={!hasPrev} className='p-4 rounded-full disabled:hidden bg-amber-400 flex gap-2 items-center hover:underline hover:underline-offset-8'><TbPlayerTrackPrevFilled className="inline" /></button>
        <button onClick={()=>router.push(`/comic/${comicId}/${Number(comicChapter) + 1}`)} disabled={!hasNext} className='p-4 rounded-full disabled:hidden bg-amber-400 flex gap-2 items-center hover:underline hover:underline-offset-8'><TbPlayerTrackNextFilled className="inline" /></button>
      </div>
      
    </div>
  )
}
