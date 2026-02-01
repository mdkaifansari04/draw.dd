"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const pathname = usePathname();
  if (pathname.includes("canvas")) return null;

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold text-gray-900">draw.dd</div>
        <div className="flex items-center gap-6">
          <Link href="/signin" className="text-sm text-gray-600 hover:text-gray-900">
            Sign in
          </Link>
          <Link href="/signup" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
