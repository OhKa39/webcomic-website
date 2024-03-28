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

  let Page = searchParams.get("page") ?? "1";
  let CatergoryIds = searchParams.get("categoryIds") ?? "";

  let page = Number(Page);

  if (isNaN(page) || page < 1) {
    return;
  }
  if (page > Math.ceil(Number(count) / Number(perPage))) {
    page = 2;
    return;
  }
  const pathName = usePathname();
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
          onChange={(page: Number) =>
            router.push(`http://localhost:3000${pathName}?page=${Number(page)}&categoryIds=${CatergoryIds}`)
          }
          page={page}
        />
      </div>
    </div>
  );
};

export default PaginationControls;