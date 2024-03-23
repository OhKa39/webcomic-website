import React from 'react'

import ComicPage from '@/components/ComicPage'

const getPages = async (comicID : any, comicChapter: any) => {
  const data = await fetch(
    `http://localhost:3000/api/getpages?comicID=${comicID}&comicChapter=${comicChapter}`
  );
  return data.json();
};


export default async function ReadComicPage({params}) {
  const comicId = params['comic-page']
  const comicChapter = params['read-comic-page']

  const [count, pages] = await getPages(comicId, comicChapter);

  return (
    <ComicPage data={pages['chapterImages']}/>
  )
}
