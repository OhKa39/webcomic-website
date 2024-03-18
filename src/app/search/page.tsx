'use client'
import Container from "@/components/Container";
import React from "react";
import { MouseEvent } from "react";
import { FaBookmark, FaBrain, FaElementor } from "react-icons/fa";

const handleGenreClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const genreTitle = target.getAttribute('title');
    const genreId = target.querySelector('.icon-checkbox')?.getAttribute('data-id');

    console.log('Genre Title:', genreTitle);
    console.log('Genre ID:', genreId);
};


const Search: React.FC = () => {
    return (
        <div className="form-group row">
            <div className="label-search">Thể loại truyện</div>
            <div className="">
                <div className="genre-item" onClick={handleGenreClick}>
                    <span className="icon-checkbox" data-id="26"></span>Action
                </div>
                <div className="genre-item" title="Thể loại phiêu lưu, mạo hiểm, thường là hành trình của các nhân vật" onClick={handleGenreClick}>
                    <span className="icon-checkbox" data-id="27"></span>Adventure
                </div>
                {/* Các thể loại khác */}
            </div>
        </div>)
}
export default Search;