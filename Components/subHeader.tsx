"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function SubHeader() {
  const router = useRouter();
  return (
    <div className="fixed top-0 w-full z-10 mx-auto max-w-screen-sm bg-white p-5 shadow-inner_b">
      <button onClick={() => router.back()}>
        <ChevronLeftIcon className="size-10" />
      </button>
    </div>
  );
}
