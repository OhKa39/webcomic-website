import React from 'react'

import ComicPage from '@/components/ComicPage'

export default function ReadComicPage({params}) {
  const comicId = params['comic-page']
  const comicChapter = params['read-comic-page']

  return (
    <ComicPage comicId={comicId} comicChapter={comicChapter}/>
  )
}
