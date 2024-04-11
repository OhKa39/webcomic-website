"use client";
import React, { useEffect } from "react";
export default function VisitedComics(comicChapter : any, comicId : any ) {
    useEffect(()=>{
        const localStorageComics = JSON.parse(localStorage.getItem("visited-comics") || "[]")
        let comics = localStorageComics.filter((u: any) => u.comicId !== comicId);
        comics.push({comicChapter, comicId})
        localStorage.setItem("visited-comics", JSON.stringify(comics))
    }, [comicId])
}
