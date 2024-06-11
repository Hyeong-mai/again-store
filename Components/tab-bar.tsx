"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="p-2">
          <h1 className="italic text-5xl font-extrabold">AGAIN</h1>
        </div>
        <div className="w-full p-1 bg-gray-100"></div>
      </div>

      <div className=" bg-white w-full mx-auto max-w-screen-sm  shadow-inner py-0 px-5 *:text-green">
        <div className="h-full flex flex-row items-center gap-10 justify-center">
          <Link
            href="/home"
            className="flex h-full flex-row items-center gap-px"
          >
            {pathname === "/home" ? (
              <span className="font-bold border-b-4 border-black h-full p-2">
                HOME
              </span>
            ) : (
              <span className="font-extralight border-b-4 border-none h-full p-2">
                HOME
              </span>
            )}
          </Link>
          <Link href="/chat" className="flex flex-row items-center gap-px">
            {pathname === "/chat" ? (
              <span className="font-bold border-b-4 border-white h-full p-2">
                CHAT
              </span>
            ) : (
              <span className="font-extralight border-b-4 border-none h-full p-2">
                CHAT
              </span>
            )}
          </Link>
          <Link href="/profile" className="flex flex-row items-center gap-px">
            {pathname === "/profile" ? (
              <span className="font-bold border-b-4 border-black h-full p-2">
                PROFILE
              </span>
            ) : (
              <span className="font-extralight border-b-4 border-none h-full p-2">
                PROFILE
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
