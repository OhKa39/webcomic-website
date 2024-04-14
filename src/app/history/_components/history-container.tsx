'use client'
import HistoryItems from "./history-items"
import { useState, useEffect } from "react";

export default function HistoryContainer() {
    const [localComics, setLocalComics] = useState([])
    const [comicIdToDelete, setcomicIdToDelete] = useState("")
    
    const handleChangeComicIdToD = (e:string) => {
        setcomicIdToDelete(e)
    } 

    useEffect(() => {
        setLocalComics(JSON.parse(localStorage.getItem("visited-comics") || "[]"))
    }, [comicIdToDelete])

    return (
        <HistoryItems data={localComics!} comicIdToDelete={comicIdToDelete} setcomicIdToDelete={handleChangeComicIdToD}/>
        
    )
    
}
