import Link from "next/link"
export default function ComicTags({data}:{data:any}) {
    
    return(
    <div className="flex gap-2">
        {data.map((i : any) => 
         <Link className="text-sm rounded-md border-2 text-amber-400 hover:bg-amber-400 hover:text-black border-amber-400 p-1 " key={i.id} href={`/tags/${i.id}`}>   
            <div>
                {i.comicTypeName}
            </div>
         </Link>   

        )}
    </div>) 
  
}
