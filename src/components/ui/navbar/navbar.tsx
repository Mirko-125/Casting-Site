"use client";

import React, { useState, useRef, useEffect } from "react";
import { SlidingWindow } from "@/components/ui/navbar/sliding-window/sliding-window"; // client component

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const toggleSlidingWindow = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sliderRef.current &&
        !sliderRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <nav
        className="flex justify-between items-center px-6 py-4 h-[80px] list-none"
        style={{ backgroundColor: "var(--navbar-bg-color)" }}
      >
        <li>
          <a className="text-white font-medium text-xl hover:text-[#83a088] cursor-pointer">
            FAQ
          </a>
        </li>
        <li>
          <button
            onClick={toggleSlidingWindow}
            className="text-white font-medium text-xl hover:text-[#83a088] cursor-pointer"
          >
            Sign in
          </button>
        </li>
      </nav>
      {open && <div className="fixed inset-0 bg-black/50 z-5" />}
      <SlidingWindow
        ref={sliderRef}
        openCheck={open}
        onClose={toggleSlidingWindow}
      />
    </div>
  );
};
