'use client'
import HistoryItems from "./history-items"
import { useState, useEffect } from "react";

export default function HistoryContainer() {
    const [localComics, setLocalComics] = useState([])
    
    
    useEffect(() => {
        setLocalComics(JSON.parse(localStorage.getItem("visited-comics") || "[]"))
    }, [])


    return (
        <HistoryItems data={localComics!} />
        
    )
    
}
