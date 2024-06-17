"use client";

import {
  HomeIcon as SolidHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 bg-white w-full mx-auto max-w-screen-sm  shadow-inner_t   *:text-green">
      <div className="h-full grid grid-cols-3  items-center gap-10 justify-center text-xl">
        <Link href="/home">
          {pathname === "/home" ? (
            <div className="flex text-center p-5  gap-3 item-center justify-center font-bold  border-t-4 border-black  p-2">
              <SolidHomeIcon className="w-7 h-7" />
              <span className="">HOME</span>
            </div>
          ) : (
            <div className="flex gap-3   p-5   item-center justify-center font-extralight border-t-4 border-none h-full p-2">
              <OutlineHomeIcon className="w-7 h-7" />
              <span className="">HOME</span>
            </div>
          )}
        </Link>
        <Link href="/chat">
          {pathname === "/chat" ? (
            <div className="flex  gap-3 p-5   item-center justify-center font-bold border-t-4 border-white h-full p-2">
              <SolidChatIcon className="w-7 h-7" />
              <span className="">CHAT</span>
            </div>
          ) : (
            <div className="flex  gap-3   p-5  item-center justify-center font-extralight border-t-4 border-none h-full p-2">
              <OutlineChatIcon className="w-7 h-7" />
              <span className="">CHAT</span>
            </div>
          )}
        </Link>
        <Link href="/profile">
          {pathname === "/profile" ? (
            <div className="flex gap-3  p-5  item-center justify-center font-bold border-t-4 border-black h-full p-2">
              <SolidUserIcon className="w-7 h-7" />
              <span className="">PROFILE</span>
            </div>
          ) : (
            <div className="flex gap-3  p-5   item-center justify-center font-extralight border-t-4 border-none h-full p-2">
              <OutlineUserIcon className="w-7 h-7" />
              <span className="">PROFILE</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}
