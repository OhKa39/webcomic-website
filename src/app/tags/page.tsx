'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchType() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/comicTypes');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);
    //apply API 
    function handleTypeClick(id: string) {
        console.log('Selected comic type id:', id);
    }

    return (
        <div className="bg-white p-8 ">
            <div className="flex flex-wrap">
                {data.map((type: any) => (
                    <div key={type.id} className="bg-gray-100 p-4 text-black hover:bg-orange-300 rounded-md cursor-pointer inline-flex items-center justify-center mr-4 mb-4" onClick={() => handleTypeClick(type.id)}>
                        {type.comicTypeName}
                    </div>
                ))}
            </div>
        </div>
    );
}
