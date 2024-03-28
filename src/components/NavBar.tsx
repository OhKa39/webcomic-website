"use client"
import React, { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaElementor,
  FaTags,
  FaEye,
  FaHistory,
  FaBell,
  FaTrophy,
  FaFacebook
} from "react-icons/fa";
import DropDownContainer from "@/components/DropDownContainer";

const NavBar: React.FC<{ data?: any[] }> = ({ data }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleToggleNav = () => setNavOpen(!navOpen);
  const handleCloseNav = () => setNavOpen(false);

  return (
    <nav className="bg-amber-400 text-black h-10 flex items-center justify-between px-2 relative">
      <ul className="hidden md:flex space-x-4 flex-grow justify-center">
        {[
          { title: "Tìm Nâng Cao", address: "/search", icon: <FaElementor /> },
          { title: "Thể Loại", address: "/tags", icon: <FaTags />, dropdown: true },
          { title: "Theo Dõi", address: "/follow", icon: <FaEye /> },
          { title: "Lịch Sử", address: "/history", icon: <FaHistory /> },
          { title: "Rank", address: "/rank", icon: <FaTrophy /> },
          { title: "Thông Báo", address: "/notification", icon: <FaBell /> },
          { title: "Fanpage", address: "https://facebook.com/100026656487897", icon: <FaFacebook /> },
        ].map(({ title, address, icon, dropdown }) => (
          <li key={title} className="nav-links cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200"
            onMouseEnter={() => setHoveredCategory(title)}
            onMouseLeave={() => setHoveredCategory(null)}>
            <div className="relative" onMouseEnter={() => setHoveredCategory(title)} onMouseLeave={() => setHoveredCategory(null)}>
              <span className="flex items-center">{icon}{title}</span>
              {hoveredCategory === "Thể Loại" && dropdown && <DropDownContainer />}
            </div>
          </li>
        ))}
      </ul>

      <div onClick={handleToggleNav} className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden">
        {navOpen ? <FaBars size={30} /> : <FaBars size={30} />}
      </div>

      {navOpen && (
        <div className="md:hidden fixed inset-0 bg-gradient-to-b from-black to-gray-800 text-gray-500 opacity-0 transition-opacity duration-300"
          onClick={handleCloseNav} onTouchStart={handleCloseNav}></div>
      )}

      <ul className={`md:hidden flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500 transform transition-transform duration-300 ${navOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {[
          { title: "Tìm Nâng Cao", address: "/search" },
          { title: "Thể Loại", address: "/tags" },
          { title: "Theo Dõi", address: "/follow" },
          { title: "Lịch Sử", address: "/history" },
          { title: "Rank", address: "/rank" },
          { title: "Thông Báo", address: "/notification" },
          { title: "Fanpage", address: "https://facebook.com/100026656487897" },
        ].map(({ title, address }) => (
          <li key={title} className="px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link href={address}><span onClick={handleCloseNav}>{title}</span></Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
