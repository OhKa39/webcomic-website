import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Containeritems({ data }: { data: any }) {
  return data.map((result: any) => (
    <Link
      href={`/comic/${result.id}`}
      className="rounded border-amber-400 bg-slate-200 dark:bg-amber-400 border-4 my-3"
      key={result.id}
    >
      <Image
        src={result.comicImageLink}
        width={150}
        height={150}
        style={{
          width: "100%",
          height: "100%",
        }}
        alt="Picture of comic"
        className="hover:opacity-80 transition-opacity duration-300"
        blurDataURL={result.comicImageLink}
        placeholder="blur"
      />
      <p className="font-bold truncate">{result.comicName}</p>
    </Link>
  ));
}
