"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaElementor, FaTags, FaEye, FaHistory, FaBell, FaTrophy, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ComicTag from "@/components/ComicTag";

const NavBar: React.FC<{ data?: any[] }> = ({ data }) => {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [comicTypes, setComicTypes] = useState<any[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchComicTypes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/comicTypes");
        if (!response.ok) {
          throw new Error("Failed to fetch comic types");
        }
        const data = await response.json();
        setComicTypes(data);
      } catch (error) {
        console.error("Error fetching comic types:", error);
      }
    };

    fetchComicTypes();
  }, []);

  const handleToggleNav = () => setNavOpen(!navOpen);
  const handleCloseNav = () => setNavOpen(false);

  const handleMouseEnter = (title: string) => setHoveredCategory(title);
  const handleMouseLeave = () => setHoveredCategory(null);

  const handleTypeClick = (id: string) => {
    const params = new URLSearchParams({
      page: "1",
      categoryIds: id,
    });
    router.push(`/tags?${params}`);
  };

  return (
    <nav className="bg-amber-400 text-black h-10 flex items-center justify-between px-2 relative">
      <ul className="hidden md:flex space-x-4 flex-grow justify-center">
        {[
          { title: "Tìm Nâng Cao", address: "/search", icon: <FaElementor /> },
          {
            title: "Thể Loại",
            address: "/tags",
            icon: <FaTags />,
            dropdown: hoveredCategory === "Thể Loại" ? comicTypes : [],
          },
          { title: "Theo Dõi", address: "/follow", icon: <FaEye /> },
          { title: "Lịch Sử", address: "/history", icon: <FaHistory /> },
          { title: "Rank", address: "/rank", icon: <FaTrophy /> },
          { title: "Thông Báo", address: "/notification", icon: <FaBell /> },
          { title: "Fanpage", address: "https://facebook.com/100026656487897", icon: <FaFacebook /> },
        ].map(({ title, address, icon, dropdown }) => (
          <li key={title} className="nav-links cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 relative"
            onMouseEnter={() => handleMouseEnter(title)}
            onMouseLeave={handleMouseLeave}>
            <Link href={address}>
              <span className="flex items-center">{icon}{title}</span>
            </Link>
            {dropdown && hoveredCategory === "Thể Loại" && (
              <ComicTag data={dropdown} />
            )}
          </li>
        ))}
      </ul>

      <div onClick={handleToggleNav} className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden">
        {navOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {typeof window !== "undefined" && navOpen && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
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
              <Link href={address}>
                <span onClick={handleCloseNav}>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
