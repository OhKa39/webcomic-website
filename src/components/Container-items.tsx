'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TiDelete } from "react-icons/ti";

export default function Containeritems({ data, setcomicIdToDelete }: { data: any, setcomicIdToDelete: any }) {
  
  const handleClick = (newComicIdToDelete : string) => {
      const localStorageComics = JSON.parse(localStorage.getItem("visited-comics") || "[]")
      let comics = localStorageComics.filter((u: any) => u.comicId !== newComicIdToDelete);
      localStorage.setItem("visited-comics", JSON.stringify(comics))
      setcomicIdToDelete(newComicIdToDelete)
  }



  return (data.map((result: any) => (
    <div key={result.id} className="rounded border-amber-400 bg-slate-200 dark:bg-amber-400 border-5 ">
      {result.chapterNumber && <button onClick={() => handleClick(result.id)}><TiDelete/></button>}
      <Link
        href={`/comic/${result.id}`} 
        key={result.id}
      >
      <Image
        src={result.comicImageLink}
        width={1000}
        height={1000}
        alt="Picture of comic"
        className="hover:opacity-80 transition-opacity duration-300"
        // blurDataURL={result.comicImageLink}
        // placeholder="blur"
      />
    </Link>
      <p className="text-center font-bold truncate">{result.comicName}</p>
      {result.chapterNumber && <p className="text-center">Đọc tiếp chương {result.chapterNumber}</p>}
    </div>
    
  )));
}
