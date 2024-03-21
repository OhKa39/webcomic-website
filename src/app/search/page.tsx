'use client'
import { color } from "framer-motion";
import { PiSelectionBackground } from "react-icons/pi";
import React, { useState } from 'react';

async function getData() {
    const res = await fetch('http://localhost:3000/api/comicTypes')
    return res.json()

}




export default async function SearchType() {

    const data = await getData()



    // check box
    // function setSelectedIds(selectedId: string[]) {
    //     try {
    //         setSelectedIds(selectedId.concat(selectedId));
    //     } catch (error) {
    //         console.error('Error when updating selectedIds:', error);
    //     }
    // }


    const selectedId: string[] = []

    function UpdateID(id: string, selectedIds: string[]) {
        if (!selectedIds.includes(id)) {
            selectedIds.push(id);
        }
        return selectedIds;
    }
    function removeID(idToRemove: string, selectedIds: string[]) {
        const index = selectedIds.indexOf(idToRemove);
        if (index !== -1) {
            selectedIds.splice(index, 1);
        }
        return selectedIds;
    }



    function handleCheckboxChange(event: { target: { value: any; checked: any; }; }) {
        const id = event.target.value;
        if (event.target.checked) {
            UpdateID(id, selectedId);
        } else {
            removeID(id, selectedId);

        }

    }

    //search 
    function handleSearch() {
        console.clear();
        console.log('Các id đã chọn:', selectedId);
    }


    return (

        <div className="bg-white p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center text-black">Comic Types</h2>
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
                        <label htmlFor={type.id} className="text-gray-700 text-sm">{type.comicTypeName}</label>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </button>
            </div>

        </div>
    );
}


function usestate(arg0: never[]): string[] {
    throw new Error("Function not implemented.");
}