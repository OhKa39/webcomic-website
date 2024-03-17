'use client'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";


export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');

    //   const handleInputChange = event => {
    //     setSearchValue(event.target.value);
    //   };

    const handleSearch = event => {
        event.preventDefault();
        console.log('Searching for:', searchValue);
        // ...
    };

    return (
        <form onSubmit={handleSearch} className='flex gap-4 hidden lg:inline-flex'>
            <input className="border rounded"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search here.."
            />
            <button type="submit"><FaSearch /></button>

        </form>
    );
}
