"use client";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const pathname = usePathname();
  if (pathname.includes("canvas")) return null;

  return (
    <nav>
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Draw.dd</h1>
        <div>
          <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Sign In</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
