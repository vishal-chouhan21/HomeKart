"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/authContext";

interface NavbarProps {
  onOpenSidebar: () => void;
}

export default function Navbar({ onOpenSidebar }: NavbarProps) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user?.name || "Administrator";
  const displayEmail = user?.email || "admin@example.com";
  const avatarLetter = (
    user?.name?.[0] ||
    user?.email?.[0] ||
    "A"
  ).toUpperCase();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
        >
          ☰
        </button>
        <span className="text-sm font-semibold text-slate-800">Overview</span>
      </div>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-slate-50 transition focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {avatarLetter}
          </div>
          <div className="hidden sm:block text-left text-xs">
            <p className="font-semibold text-slate-800">{displayName}</p>
            <p className="text-slate-500 max-w-[140px] truncate">
              {displayEmail}
            </p>
          </div>
          <svg
            className={`w-4 h-4 text-slate-500 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-800">
                {displayName}
              </p>
              <p className="text-xs text-slate-500 truncate">{displayEmail}</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
