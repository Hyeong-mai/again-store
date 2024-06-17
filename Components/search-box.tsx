"use client";

import { redirect, usePathname, useRouter } from "next/navigation";
import Input from "./input";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const handleFocus = () => {
    if (pathname !== "/home/search") {
      router.push("/home/search");
    }
  };
  return (
    <div className="flex flex row w-full items-center justify-center gap-5 ">
      <form className="w-4/5">
        <input
          onFocus={handleFocus}
          className="bg-transparent text-black rounded-md w-full h-12 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-green-500 border-none placeholder:text-neutral-400"
          placeholder="검색어를 입력해주세요."
        />
      </form>
      {pathname === "/home/search" ? (
        <button
          onClick={() => router.back()}
          className="text-3xl w-1/5 font-bold italic"
        >
          <h1>CANCEL</h1>
        </button>
      ) : (
        <div className="w-1/5">
          <h1 className="text-3xl font-bold italic">AGAIN</h1>
        </div>
      )}
    </div>
  );
}
