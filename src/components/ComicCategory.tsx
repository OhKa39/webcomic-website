"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ComicCategory({ data }: { data: any }) {
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const router = useRouter();

  function UpdateID(id: string) {
    if (!selectedId.includes(id)) {
      setSelectedId([...selectedId, id]);
    }
  }

  function removeID(idToRemove: string) {
    setSelectedId(selectedId.filter((itemId) => itemId !== idToRemove));
  }

  function handleCheckboxChange(event: {
    target: { value: any; checked: any };
  }) {
    const id = event.target.value;
    if (event.target.checked) {
      UpdateID(id);
    } else {
      removeID(id);
    }
  }

  function handleSearch() {
    const params = new URLSearchParams({
      page: "1",
      categoryIds: selectedId.join(","),
    });
    router.push(`/search?${params}`);
  }

  return (
    <div className="bg-white p-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black">
        Comic Types
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {data.map((type: any) => (
          <div key={type.id} className="flex items-center space-x-1">
            <input
              type="checkbox"
              id={type.id}
              value={type.id}
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 text-blue-500"
            />
            <label htmlFor={type.id} className="text-black text-sm">
              {type.comicTypeName}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={handleSearch}
        >
          <FaSearch className="mr-2" /> Tìm kiếm
        </button>
      </div>
    </div>
  );
}
