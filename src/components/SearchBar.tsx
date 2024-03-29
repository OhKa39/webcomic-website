"use client"
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Searching for:', searchValue);
        router.push(`/search?query=${encodeURIComponent(searchValue)}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center justify-center gap-2">
            <div className="relative">
                <input
                    className="border rounded-full py-2 px-10 focus:outline-none focus:border-blue-500"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Bạn muốn mua TV?"
                />
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full px-3 flex items-center"
                    type="submit"
                >
                    <FaSearch />
                </button>
            </div>
        </form>
    );
}
