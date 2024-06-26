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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  // const urlPage = process.env.NEXT_PUBLIC_URL;
  // const categoryIds = searchParams.get("categoryIds");
  // const sValue = searchParams.get("sValue");

  if (count == 0) {
    return (
      <h1 className="font-bold justìy-center text-center">
        KHÔNG TÌM THẤY TRUYỆN YÊU CẦU
      </h1>
    );
  } else {
    // console.log(searchParams);
    const categoryIds = searchParams.get("categoryIds");
    const sValue = encodeURIComponent(searchParams.get("sValue") || "");

    // const sValue = searchParams.get("sValue");
    // console.log(sValue);

    const urlPage = process.env.NEXT_PUBLIC_URL;

    let Page = searchParams.get("page") ?? "1";
    let page = Number(Page);

    if (isNaN(page) || page < 1) {
      return;
    }
    if (page > Math.ceil(Number(count) / Number(perPage))) {
      page = 2;
      return;
    }
    // console.log(pathName);
    // console.log(params);
    return (
      <div className="flex gap-5 mt-3 justify-center ">
        <div>
          <Pagination
            boundaries={2}
            loop
            showControls
            showShadow
            total={Math.ceil(Number(count) / Number(perPage))}
            initialPage={page}
            color={`danger`}
            classNames={{
              wrapper:
                "gap-1 overflow-visible h-8 rounded border border-divider",
              item: "w-8 h-8 text-small rounded-none bg-transparent",
              cursor:
                "bg-amber-400 shadow-lg from-default-500 to-default-800 text-white font-bold",
              prev: "dark:text-white dark:bg-gray-500",
              next: "dark:text-white dark:bg-gray-500",
            }}
            onChange={(page: Number) => {
              type typeParam = {
                page: string;
                categoryIds?: string;
                sValue?: string;
              };
              const paramObj: typeParam = {
                page: page.toString(),
                categoryIds: categoryIds ?? "delete",
                sValue: sValue ?? "delete",
              };
              if (paramObj.categoryIds === "delete")
                delete paramObj.categoryIds;
              if (paramObj.sValue === "delete" || paramObj.sValue === "")
                delete paramObj.sValue;

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
