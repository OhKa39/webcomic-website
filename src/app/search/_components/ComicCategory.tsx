"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ComicTypeCheckbox from "./ComicTypeCheckbox";
import SearchButton from "./SearchButton";
import ClearButton from "./ClearButton";

export default function ComicCategory({ data }: { data: any }) {

  interface ComicType {
    id: string;
  }

  const [selectedId, setSelectedId] = useState<string[]>([]);
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(false);

  const handleHide = () => {
    setIsHidden(!isHidden);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    if (event.target.checked) {
      setSelectedId([...selectedId, id]);
    } else {
      setSelectedId(selectedId.filter((itemId) => itemId !== id));
    }
  };
  const handleClear = () => {
    setSelectedId([]);
    router.push(`/search`);
  };
  const handleSearch = () => {
    try {
      const filteredIds = selectedId.filter(id => id.length === 24 && data.some((item: ComicType) => item.id === id));
      const params = new URLSearchParams({
        page: "1",
        categoryIds: filteredIds.join(","),
      });
      router.push(`/search?${params}`);
    } catch (error) {
      console.error("Error during search:", error);
      router.push("/no-results")
    }
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryIds = urlParams.get("categoryIds");
      if (!categoryIds) {
        //router.push("/no-results");
        return;
      }

      const ids = categoryIds.split(",");
      const isValidIds = ids.every(id => id.length === 24);
      if (!isValidIds) {
        router.push("/no-results");
        return;
      }
      setSelectedId(ids);
    } catch (error) {
      console.error("Error during URL parsing:", error);
      router.push("no-results")
    }
  }, []);


  return (
    <div className={`bg-gray-800 p-5 w-full border-3 border-white rounded-none}`}>
      <div className={`mt-4 flex justify-center`}>
        <button
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 rounded flex justify-center items-center mb-5"
          onClick={handleHide}>
          {isHidden ? <p className="items-bold"> Hiện khung tìm kiếm</p> : <p className="items-bold">Ẩn khung tìm kiếm</p>}
        </button>
      </div>
      {/*-------------------------- Hide text------------------------ */}
      <div className={`${isHidden ? 'hidden' : ''}`}>
        <div className={`mt-4 flex justify-center`}>
          <ClearButton onClick={handleClear} />
        </div>

        <div className=""><h2 className="mb-2 font-bold text-white">
          Thể Loại Truyện
        </h2>
          <div className="grid grid-cols-5 gap-2 justify-center">
            {data.map((type: any) => (
              <ComicTypeCheckbox
                key={type.id}
                id={type.id}
                value={type.id}
                label={type.comicTypeName}
                checked={selectedId.includes(type.id)}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <SearchButton onClick={handleSearch} />
          </div>
        </div>
      </div>
    </div >
  );
}
