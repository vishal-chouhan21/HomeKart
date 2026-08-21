"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-[#FAF7F2] border-b border-[#EDE6DC] text-[#24211E]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-24 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span className="font-serif text-3xl font-medium tracking-tight group-hover:text-[#5B554E] transition">
              Artisan
            </span>
            <span className="font-serif text-3xl font-medium tracking-tight group-hover:text-[#5B554E] transition -mt-1">
              Collective
            </span>
          </Link>

          {/* Center Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] text-[#4A453E]">
            <Link
              href="/"
              className="font-normal text-[#24211E] border-b border-[#24211E] pb-0.5"
            >
              Home
            </Link>
            <Link href="#products" className="hover:text-[#24211E] transition">
              Shop All
            </Link>
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#24211E] transition">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4 text-[#7A7268] group-hover:text-[#24211E] transition" />
            </div>
            <Link href="#journal" className="hover:text-[#24211E] transition">
              Journal
            </Link>
            <Link href="#our-story" className="hover:text-[#24211E] transition">
              About
            </Link>
          </nav>

          {/* Right Side Icons / Account */}
          <div className="flex items-center gap-6 text-[15px] text-[#4A453E]">
            <button
              aria-label="Search"
              className="p-1 hover:text-[#24211E] transition cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Desktop Auth State / User Menu */}
            {!loading && (
              <div className="hidden sm:block relative" ref={userMenuRef}>
                {user ? (
                  <button
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 hover:text-[#24211E] transition cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#EAE3D9] text-[#24211E] flex items-center justify-center text-xs font-semibold uppercase">
                      {user.name ? user.name.charAt(0) : user.email.charAt(0)}
                    </div>
                    <span className="max-w-[120px] truncate">
                      {user.name || user.email.split("@")[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#7A7268]" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="hover:text-[#24211E] transition cursor-pointer"
                  >
                    Account Login
                  </button>
                )}

                {/* User Dropdown */}
                {user && isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-[#FAF7F2] border border-[#EDE6DC] rounded-xl shadow-lg py-2 z-20 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-[#EDE6DC]">
                      <p className="text-xs text-[#7A7268]">Signed in as</p>
                      <p className="text-xs font-medium text-[#24211E] truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-[#EDE6DC]/50 flex items-center gap-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              aria-label="Cart"
              className="p-1 hover:text-[#24211E] transition cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 text-[#24211E]"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-t border-[#EDE6DC] px-6 py-6 space-y-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-base text-[#24211E]"
            >
              Home
            </Link>
            <Link
              href="#products"
              onClick={() => setIsOpen(false)}
              className="block text-base text-[#4A453E]"
            >
              Shop All
            </Link>
            <Link
              href="#categories"
              onClick={() => setIsOpen(false)}
              className="block text-base text-[#4A453E]"
            >
              Categories
            </Link>
            <Link
              href="#journal"
              onClick={() => setIsOpen(false)}
              className="block text-base text-[#4A453E]"
            >
              Journal
            </Link>
            <Link
              href="#our-story"
              onClick={() => setIsOpen(false)}
              className="block text-base text-[#4A453E]"
            >
              About
            </Link>

            {/* Mobile Auth Button */}
            {!loading && (
              <div className="pt-4 border-t border-[#EDE6DC]">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-[#24211E] font-medium">
                      <div className="w-7 h-7 rounded-full bg-[#EAE3D9] text-[#24211E] flex items-center justify-center text-xs font-semibold uppercase">
                        {user.name ? user.name.charAt(0) : user.email.charAt(0)}
                      </div>
                      <span className="truncate">
                        {user.name || user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsAuthOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 text-base text-[#24211E] font-medium py-2 hover:bg-[#EDE6DC]/40 rounded-lg transition"
                  >
                    <User className="w-4 h-4" /> Account Login
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
