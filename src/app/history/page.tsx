import { useEffect, useState } from "react"
import HistoryContainer from "./_components/history-container"

export default function page() {        
    return (
        <div className="container mx-auto min-h-screen h-auto w-screen">
            <h1 className="pt-5 pb-8 font-bold text-lg">Lịch sử đọc truyện:</h1> 
            <HistoryContainer/>
        </div>
    )
}
