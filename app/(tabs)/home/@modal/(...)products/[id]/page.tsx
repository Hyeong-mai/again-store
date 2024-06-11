import CloseButton from "@/Components/CloseButton";
import getSession from "@/lib/auth/session/getSession";
import db from "@/lib/db";
import { formatToWon } from "@/lib/utils";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}
const getCacheProduct = nextCache(getProduct, ["product-detail"], {
  tags: ["product-detail"],
});

export default async function Modal({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  const createChatRoom = async () => {
    "use server";
    const session = await getSession();
    const room = await db.chatRoom.create({
      data: {
        users: {
          connect: [
            {
              id: product.userId,
            },
            {
              id: session.id,
            },
          ],
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/chats/${room.id}`);
  };
  return (
    <div className="absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0">
      <CloseButton />
      <div className="max-w-screen-sm bg-white rounded-md h-1/auto flex-col flex justify-center w-full p-5">
        <div className="flex-col flex gap-10">
          <div className=" p-2 flex flex-row items-center justify-between border-b">
            <div className="relative size-64 bg-black aspect-square">
              <Image
                className="object-cover"
                fill
                src={`${product.photo}/public`}
                alt={product.title}
              />
            </div>
            <div className="flex flex-col justify-center gap-3 p-2 size-72  bg-white w-1/2">
              <span className="font-semibold text-xl">
                <p className="text-sm">현재 입찰가</p>
                {formatToWon(product.price)}원
              </span>
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              <p>{product.description}</p>

              <div className=" py-2 flex items-center gap-3">
                <div className="size-10 rounded-full overflow-hidden">
                  {product.user.avatar !== null ? (
                    <Image
                      src={product.user.avatar}
                      width={40}
                      height={40}
                      alt={product.user.username}
                    />
                  ) : (
                    <UserIcon />
                  )}
                </div>
                <div>
                  <h3>{product.user.username}</h3>
                </div>
              </div>

              <div className="flex flex-row items-center justify-center gap-5 ">
                <form action={createChatRoom}>
                  <button className="bg-orange-500  px-9 py-2.5 rounded-md text-white font-semibold">
                    채팅하기
                  </button>
                </form>
                <form action={createChatRoom}>
                  <button className="bg-green-500  px-9 py-2.5 rounded-md text-white font-semibold">
                    입찰하기
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className=" w-full h-96 flex flex-col bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
