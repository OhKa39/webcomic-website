"use client"
import React, { useState, useEffect } from "react";
import DropDownItems from "@/components/DropdownItems";

export default function DropDownContainer() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/comicTypes");
                if (!response.ok) {
                    throw new Error("Failed to fetch comic types");
                }
                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                console.error("Error fetching comic types:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="absolute w-full bg-amber-400">
            <DropDownItems data={data} />
        </div>
    );
}
