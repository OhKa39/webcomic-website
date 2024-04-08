import Link from "next/link";
import Image from "next/image";


export default async function HistoryItem({data}:{data:any}) {
    return(
        <div>
            {data.map((item:any) => (
            <div key={item.id}>
            <h1>Ban dang doc {item.comicName}, chuong: {item.chapterNumber}</h1>
           <Link
                href={`/comic/${item.id}/`}
                className="rounded border-amber-400 bg-slate-200 dark:bg-amber-400 my-3"
                key={item.id}>
            <Image
                src={item.comicImageLink}
                width={150}
                height={150}
                style={{
                width: "100%",
                height: "100%",
                }}
                alt="Picture of comic"
                className="hover:opacity-80 transition-opacity duration-300"
            />
            <p className="font-bold truncate">{item.comicName}</p>
        </Link>

        </div>
    ))}
    </div>

    )

    
}
