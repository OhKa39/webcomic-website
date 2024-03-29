"use client";
import React, { useState, useEffect } from "react";
import DropDownItems from "@/components/DropdownItems";

export default function DropDownContainer({
  onMouseLeave,
}: {
  onMouseLeave: any;
}) {
  // const datafetch = await fetch("http://localhost:3000/api/comicTypes", {cache: "no-cache"})
  // const data = await datafetch.json()
  const [data, setData] = useState([]);
  console.log("data");
  const urlPage = process.env.NEXT_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${urlPage}/api/comicTypes`, {
          cache: "no-store",
        });
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
    <div
      className={`z-50 absolute top-10 left-0 w-screen bg-amber-400`}
      onMouseLeave={onMouseLeave}
    >
      <DropDownItems data={data} />
    </div>
  );
}
