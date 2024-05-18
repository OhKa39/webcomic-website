import HistoryContainer from "./_components/history-container"
import SignedInContainer from "./_components/SignedIn-container"

import initialUser from "@/lib/initial-user"

export default async function page() {        
    const profile = await initialUser()
  
    return (
        <div className="container mx-auto min-h-screen h-auto w-screen">
            <h1 className="pt-5 pb-8 font-bold text-lg">Lịch sử đọc truyện:</h1> 
            {profile && <SignedInContainer/>}
            {!profile && <HistoryContainer/>}
        </div>
    )
}
