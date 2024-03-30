"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { GrPowerReset } from "react-icons/gr";


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

  function handleClear(): void {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedId([]);
    router.push(`/search`);
  }


  return (
    <div className="bg-gray-800 p-5 w-full border-3 border-white rounded-none ">
      <div className="mt-4 flex justify-center">
        <button
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 rounded flex justify-center items-center"
          onClick={handleClear}
        >
          <GrPowerReset size={20} className="m-1 items-bold" />
        </button>
      </div>
      <h2 className=" mb-2 font-bold text-white">
        Thể Loại Truyện
      </h2>
      <div className="grid grid-cols-5 gap-2 justify-center ">
        {data.map((type: any) => (
          <div key={type.id} className="flex items-center space-x-1">
            <input
              type="checkbox"
              id={type.id}
              value={type.id}
              onChange={handleCheckboxChange}
              checked={selectedId.includes(type.id)}
              className="form-checkbox h-4 w-4 text-blue-500"
            />
            <label htmlFor={type.id} className="text-white text-sm">
              {type.comicTypeName}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 rounded flex justify-center items-center"
          onClick={handleSearch}
        >
          <FaSearch className="mr-2" /> Tìm kiếm
        </button>
      </div>
    </div>
  );
}

//http://localhost:3000/search?page=1&categoryIds=