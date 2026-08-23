"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: "📊" },
  { label: "Products", href: "/products", icon: "📦" },
  { label: "Orders", href: "/orders", icon: "🛒" },
  { label: "Users", href: "/users", icon: "👥" },
  { label: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      {/* Light Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
            <span className="text-base font-bold tracking-wider text-slate-900 uppercase">
              Admin Console
            </span>
            <button
              type="button"
              className="lg:hidden text-slate-400 hover:text-slate-700"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
          Admin Portal &bull; Port 3002
        </div>
      </aside>
    </>
  );
}
