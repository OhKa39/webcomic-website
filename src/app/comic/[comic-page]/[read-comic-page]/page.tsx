import React from 'react'

import ComicPage from '@/components/ComicPage'
import ComicPageMenu from '@/components/ComicPageMenu'


const getPages = async (comicID : any, comicChapter: any) => {
  const data = await fetch(
    `http://localhost:3000/api/comic/${comicID}/${comicChapter}`
  );
  return data.json();
};


export default async function ReadComicPage({params}) {
  const comicId = params['comic-page']
  const comicChapter = params['read-comic-page']

  const [count, pages] = await getPages(comicId, comicChapter);

  return (
    <div className='p-8'>
      <ComicPageMenu />
      <ComicPage data={pages['chapterImages']}/>

    </div>
  )
}
