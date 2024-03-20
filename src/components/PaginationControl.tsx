'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  count: Number
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    count,
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  //console.log(count)
  const per_page = '5'

  let Page = searchParams.get('page') ?? '1'
  let page = Number(Page)
  
  if (isNaN(page) || page < 1 ) {
    return; 
  }
  if (page > Math.ceil(Number(count) / Number(per_page)))
    {
        page = 2;
        return
    }

  return (
    <div className='flex gap-5 justify-center '>
      <button
        className='bg-gray-400 hover:bg-amber-400 text-white p-1 disabled:hidden'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}`)
        }}>
        Trang trước
      </button>

      <div>
        {page} / {Math.ceil(Number(count) / Number(per_page))}
      </div>
      <button
        className='bg-gray-400 hover:bg-amber-400 text-white p-1 disabled:hidden'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}`)
        }}>
        Trang tiếp theo
      </button>
    </div>
  )
}

export default PaginationControls