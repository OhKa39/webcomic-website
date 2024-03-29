import React from "react";
import Link from "next/link";

interface ComicTagProps {
  data: { id: string; comicTypeName: string }[];
}

const ComicTag: React.FC<ComicTagProps> = ({ data }) => {
  return (
    <div className="bg-amber-400 fixed container mx-auto my-auto">
      <ul className="grid grid-cols-8 gap-2 overflow-y-auto relative">
        {data.map(({ id, comicTypeName }) => (
          <li key={id} className="text-black cursor-pointer">
            <Link href={`/tags/${id}`}>
              {comicTypeName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComicTag;
