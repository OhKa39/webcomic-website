import Link from "next/link"
export default function ComicTags({data}:{data:any}) {
    
    return(
    <div className=" flex gap-2 text-blue-300">
        {data.map((i : any) => 
         <Link key={i.id} href={`/tags/${i.id}`}>   
            <div className="inline underline " >
                {i.comicTypeName}
            </div>
         </Link>   

        )}
    </div>) 
  
}
