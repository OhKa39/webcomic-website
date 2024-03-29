import React from "react";
import Link from "next/link";

export default function DropDownItems({ data }: { data: any }) {
  return (
    <div className="bg-amber-400  mx-auto my-auto">
      <ul className="grid grid-cols-8 gap-2 ">
        {data.map((type: any) => (
          <li key={type.id} className="text-black cursor-pointer">
            <div className="text-black cursor-pointer text-center flex items-center justify-center">
              <Link href={`/tags/${type.id}`}>{type.comicTypeName}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
