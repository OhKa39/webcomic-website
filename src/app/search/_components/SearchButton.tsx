import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchButtonProps {
    onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
    return (
        <button
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 rounded flex justify-center items-center"
            onClick={onClick}
        >
            <FaSearch className="mr-2" /> Tìm kiếm
        </button>
    );
};

export default SearchButton;
