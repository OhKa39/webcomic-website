'use client'

import { useEffect, useState } from "react"
import HistoryContainer from "./_components/history-container"

export default function page() {
    
    const [localComics, setLocalComics] = useState([])      
    useEffect(() => {
        setLocalComics(JSON.parse(localStorage.getItem("visited-comics") || "[]"))
      }, [])
    console.log(localComics)
    return (
        <div>
            <h1>Lịch sử:</h1> 
            <HistoryContainer data={localComics}/>
        </div>
    )
}
