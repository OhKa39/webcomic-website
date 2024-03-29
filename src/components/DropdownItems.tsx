import React from "react";
import Link from "next/link";

export default function DropDownItems({ data }) {
    // const [comicTypes, setComicTypes] = useState<any[]>([]);

    // useEffect(() => {
    //     const fetchComicTypes = async () => {
    //         try {
    //             const response = await fetch("http://localhost:3000/api/comicTypes");
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch comic types");
    //             }
    //             const data = await response.json();
    //             setComicTypes(data);
    //         } catch (error) {
    //             console.error("Error fetching comic types:", error);
    //         }
    //     };

    //     fetchComicTypes();
    // }, []);

    return (
        <div className="bg-amber-400  mx-auto my-auto">
            <ul className="grid grid-cols-8 gap-2 ">
                {data.map((type: any) => (
                    <li key={type.id} className="text-black cursor-pointer">
                        <div className="text-black cursor-pointer text-center flex items-center justify-center">
                            <Link href={`/tags/${type.id}`}>
                                {type.comicTypeName}
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
