import { useEffect, useState } from "react"
import HistoryContainer from "./_components/history-container"

export default function page() {    
    return (
        <div className="container mx-auto">
            <h1 className="pt-5 font-bold text-lg">Lịch sử đọc truyện:</h1> 
            <HistoryContainer/>
        </div>
    )
}
