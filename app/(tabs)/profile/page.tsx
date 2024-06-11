import db from "@/lib/db";
import getSession from "@/lib/auth/session/getSession";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
};

export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col p-4 gap-5">
      <div className="flex flex-row items-center justify-between border border-black rounded-2xl bg-white w-full p-7">
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="w-20 h-20  rounded-full overflow-hidden">
            {user?.avatar ? (
              <Image
                src={user?.avatar}
                alt={user?.username}
                width={80}
                height={80}
              />
            ) : (
              <UserIcon className="w-full h-full bg-gray-200 text-gray-400" />
            )}
          </div>
          <div className="flex flex-col  justify-center ">
            <h1 className="text-xl font-semibold">{user?.username}</h1>
            <span className="text-gray-400">{user?.email}</span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <button className="rounded-xl border py-2 px-3 text-sm">
            프로필 관리
          </button>
          <form action={logOut}>
            <button
              className="rounded-xl border py-2 px-3 text-sm"
              type="submit"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
      <h1 className="text-xl font-semibold">구매 내역</h1>
      <div className="flex flex-row items-center justify-between  rounded-2xl bg-green-50 w-full p-7">
        <div className="flex w-1/5 h-full flex-col gap-2  text-center border-r">
          <h1>전체</h1>
          <span>0</span>
        </div>
        <div className="flex w-1/5 h-full flex-col gap-2  text-center ">
          <h1>전체</h1>
          <span>0</span>
        </div>
        <div className="flex w-1/5 h-full flex-col gap-2  text-center ">
          <h1>전체</h1>
          <span>0</span>
        </div>
        <div className="flex w-1/5 h-full flex-col gap-2  text-center ">
          <h1>전체</h1>
          <span>0</span>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-5">
        <div className="flex flex-row gap-2">
          <div className="size-20 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">IMAGE</span>
          </div>
          <div className="w-2/3 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center">
            <span className="text-gray-500">PRODUCT NAME & DESCRIPTION</span>
          </div>
          <div className="w-1/5 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">DATE</span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="size-20 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">IMAGE</span>
          </div>
          <div className="w-2/3 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center">
            <span className="text-gray-500">PRODUCT NAME & DESCRIPTION</span>
          </div>
          <div className="w-1/5 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">DATE</span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="size-20 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">IMAGE</span>
          </div>
          <div className="w-2/3 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center">
            <span className="text-gray-500">PRODUCT NAME & DESCRIPTION</span>
          </div>
          <div className="w-1/5 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">DATE</span>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-semibold">판매 내역</h1>
      <div className="flex flex-row items-center justify-between  rounded-2xl bg-orange-50 w-full p-7">
        <div className="flex w-1/5 h-full flex-col gap-2  text-center border-r">
          <h1>전체</h1>
          <span>0</span>
        </div>
        <div className="flex w-1/5 h-full flex-col gap-2  text-center ">
          <h1>전체</h1>
          <span>0</span>
        </div>
        <div className="flex w-1/5 h-full flex-col gap-2  text-center ">
          <h1>전체</h1>
          <span>0</span>
        </div>
        <div className="flex w-1/5 h-full flex-col gap-2  text-center ">
          <h1>전체</h1>
          <span>0</span>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-5">
        <div className="flex flex-row gap-2">
          <div className="size-20 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">IMAGE</span>
          </div>
          <div className="w-2/3 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center">
            <span className="text-gray-500">PRODUCT NAME & DESCRIPTION</span>
          </div>
          <div className="w-1/5 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">DATE</span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="size-20 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">IMAGE</span>
          </div>
          <div className="w-2/3 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center">
            <span className="text-gray-500">PRODUCT NAME & DESCRIPTION</span>
          </div>
          <div className="w-1/5 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">DATE</span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="size-20 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">IMAGE</span>
          </div>
          <div className="w-2/3 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center">
            <span className="text-gray-500">PRODUCT NAME & DESCRIPTION</span>
          </div>
          <div className="w-1/5 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
            <span className="text-gray-500">DATE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
