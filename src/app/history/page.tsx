import { useEffect, useState } from "react"
import HistoryContainer from "./_components/history-container"

export default function page() {    
    return (
        <div>
            <h1>Lịch sử:</h1> 
            <HistoryContainer/>
        </div>
    )
}
