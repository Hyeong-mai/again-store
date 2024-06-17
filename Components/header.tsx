"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import SearchBox from "./search-box";
import MenuBar from "./menu-bar";

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 w-full mx-auto max-w-screen-sm flex flex-col bg-white z-20 items-center justify-center p-5 gap-5 shadow-inner_b">
      <SearchBox />
      {pathname === "/home" ? <MenuBar /> : null}
    </div>
  );
}
