import page from '@/app/follow/page'
import { PrismaClient} from '@prisma/client'
import { pages } from 'next/dist/build/templates/app-page'

import ComicPageItems from '@/components/ComicPage-items'

const prisma = new PrismaClient()

async function getPages({comicId, comicChapter}: {comicId: { [key: string]: string | string[] | undefined }, comicChapter: { [key: string]: string | string[] | undefined }}) {
    const pages = await prisma.comicChapters.findFirstOrThrow({            
        where: {
            comicsId: comicId,
            chapterNumber: Number(comicChapter)
        },
        select: {          
            chapterImages: {
                select: {
                    imageLink: true
                }
            },        
        },
    })    
    return pages
}

export default async function ComicPage({comicId, comicChapter}: {comicId: { [key: string]: string | string[] | undefined }, comicChapter: { [key: string]: string | string[] | undefined }}) 
{
    const data = await getPages({comicId, comicChapter})

    return (
        <div className='p-10 '>
            <ComicPageItems data={data.chapterImages} />

        </div>
    )
}