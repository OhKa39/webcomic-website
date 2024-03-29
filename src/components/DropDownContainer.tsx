// "use client"
import React from "react";
import DropDownItems from "@/components/DropdownItems";

export default async function DropDownContainer() {
    const datafetch = await fetch("http://localhost:3000/api/comicTypes", {cache: "no-cache"})
    const data = await datafetch.json()
    // const [data, setData] = useState([]);
    // console.log("data")
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("http://localhost:3000/api/comicTypes", {cache: "no-store"});
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch comic types");
    //             }
    //             const responseData = await response.json();
    //             setData(responseData);
    //         } catch (error) {
    //             console.error("Error fetching comic types:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    return (
        <div className="absolute top-10 left-0 w-screen bg-amber-400">
            <DropDownItems data={data} />
        </div>
    );
}
 