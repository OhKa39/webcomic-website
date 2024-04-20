"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  //scroll-to-top classes: fixed, bottom:0, right:0
  return (
    <div className="fixed bottom-[4.5rem] right-1">
      {isVisible && (
        <div
          className="flex justify-center items-center h-10 w-10 border-2 shadow border-yellow-600 text-yellow-600 dark:bg-slate-500 dark:border-white dark:text-white"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </div>
      )}
    </div>
  );
}
