"use client";

import { FC } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@nextui-org/react";

interface PaginationControlsProps {
  count: Number;
  perPage: Number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  count,
  perPage,
}) => {
  if(count ==0){
return(
<h1 className="font-bold justìy-center text-center">KHÔNG TÌM THẤY TRUYỆN YÊU CẦU</h1>
);
  }
  else{

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const categoryIds = searchParams.get("categoryIds");

  // console.log(searchParams);
  // const params = new URLSearchParams(searchParams);
  //console.log(count)

  let Page = searchParams.get("page") ?? "1";
  let page = Number(Page);

  if (isNaN(page) || page < 1) {
    return;
  }
  if (page > Math.ceil(Number(count) / Number(perPage))) {
    page = 2;
    return;
  }
  console.log(pathName);

  // console.log(params);
  return (
    <div className="flex gap-5 justify-center ">
      <div>
        <Pagination
          boundaries={2}
          loop
          total={Math.ceil(Number(count) / Number(perPage))}
          initialPage={page}
          color={`danger`}
          classNames={{
            wrapper: "gap-1 overflow-visible h-8 rounded border border-divider",
            item: "w-8 h-8 text-small rounded-none bg-transparent",
            cursor:
              "bg-amber-400 shadow-lg from-default-500 to-default-800 text-white font-bold",
          }}
          onChange={(page: Number) => {
            type typeParam = {
              page: string;
              categoryIds?: string;
            };
            const paramObj: typeParam = {
              page: page.toString(),
              categoryIds: categoryIds ?? "delete",
            };
            if (paramObj.categoryIds === "delete") delete paramObj.categoryIds;
            router.push(
              `${urlPage}${pathName}?${new URLSearchParams(paramObj)}`
            );
          }}
          page={page}
        />
      </div>
    </div>
  );
  }
};

export default PaginationControls;
