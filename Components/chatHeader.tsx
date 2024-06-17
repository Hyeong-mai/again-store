"use client";
import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ChatHeaderProps {
  user: {
    id: number;
    username: string;
    avatar: string;
  };
}

export default function ChatHeader({ user }: ChatHeaderProps) {
  const router = useRouter();
  console.log(user);
  return (
    <div className="fixed top-0 w-full flex items-center justify-between z-20 mx-auto max-w-screen-sm bg-white   p-5  shadow-inner_b">
      <button onClick={() => router.push("/home")}>
        <ChevronLeftIcon className="size-10" />
      </button>
      <div className="flex flex-row items-center justify-center gap-5">
        <h1 className="text-lg font-semibold">{user.username}</h1>
        {user.avatar !== "" ? (
          <Image
            src={user.avatar!}
            alt={user.username}
            width={60}
            height={60}
            className="size-16 rounded-full"
          />
        ) : (
          <UserIcon className="size-16 text-gray-300 border rounded-full" />
        )}
      </div>
    </div>
  );
}
