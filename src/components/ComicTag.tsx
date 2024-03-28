"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ComicTag: React.FC<{ data: any[] }> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const router = useRouter();

  function handleTypeClick(id: string) {
    setSelectedId([]);
    const params = new URLSearchParams({
      page: "1",
      categoryIds: id,
    });
    router.push(`/tags?${params}`);
  }

  return (
    <div className="bg-amber-400 fixed container mx-auto my-auto ">
      <ul className="grid grid-cols-8 gap-2 overflow-y-auto relative">
        {data.map((type: any) => (
          <li
            key={type.id}
            className="text-black cursor-pointer"
            onClick={() => handleTypeClick(type.id)}
          >
            {type.comicTypeName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComicTag;
