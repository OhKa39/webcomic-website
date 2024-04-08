import Link from "next/link";
import Image from "next/image";
import HistoryItem from "./history-item";

async function getData(localComic:any){
    if (localComic.length == 0) return
    const urlPage = process.env.NEXT_PUBLIC_URL;
    let url = `${urlPage}/api/history?IDs=${localComic}`;
    const data = await fetch(url);
    return data.json();
}


export default async function HistoryItems({data}:{data:any}) {
    if (data.length == 0) return(<h1>Chua tim thay!</h1>)
    const comicIdString = data.map((i:any) => i.comicId)
    const chapterNumberString = data.map((i:any) => i.comicChapter)
    const comicIdArray = comicIdString.join(',')
    let localComic = await getData(comicIdArray)

    localComic.forEach((obj : any, index : any) => {
        obj.chapterNumber = chapterNumberString[index];
      });

    console.log("Local comic", localComic)

    return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5">
        <HistoryItem data={localComic}/>
      </div>
    </div>
    )
}
