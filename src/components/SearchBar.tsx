'use client'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    const handleSearch = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log('Searching for:', searchValue);
        router.push(`/search?query=${encodeURIComponent(searchValue)}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center justify-center gap-2">
            <input
                className="border rounded py-2 px-10 focus:outline-none focus:border-blue-500"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search here.."
            />
            <button
                className="hover:bg-orange-300 py-3 px-4 rounded hover:text-black focus:outline-none"
                type="submit"
            >
                <FaSearch />
            </button>
        </form>
    );
}
