import HistoryItems from "./history-items"

async function getData(localComic:any){
    const urlPage = process.env.NEXT_PUBLIC_URL;
    let url = `${urlPage}/api/history?IDs=${localComic}`;
    const data = await fetch(url);
    return data.json();

}

export default async function historyContainer({data}:{data:any}) {
    console.log(data)
    const output = data.map((i:any) => i.comicId)
    const output2 = output.join(',')
    const localComic = await getData(output2)
    console.log(localComic)
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5">
            {/* <HistoryItems data={localComic} /> */}
        </div>
    )
    
}
