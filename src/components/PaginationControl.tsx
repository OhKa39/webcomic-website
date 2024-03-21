'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {Pagination} from "@nextui-org/react";


interface PaginationControlsProps {
  count: Number
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
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
      <div>
          <Pagination boundaries={2} loop total={Math.ceil(Number(count) / Number(per_page))} initialPage={page}  color={`danger`} classNames={{
        wrapper: "gap-1 overflow-visible h-8 rounded border border-divider",
        item: "w-8 h-8 text-small rounded-none bg-transparent",
        cursor:
          "bg-amber-400 shadow-lg from-default-500 to-default-800 text-white font-bold",
        }} 
        onChange={(page: Number)=> router.push(`/?page=${Number(page)}`)}
        page={page}
      />
      </div>
    </div>
  )
}

export default PaginationControls