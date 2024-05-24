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
      <div className="max-w-screen-sm bg-black h-1/auto flex-col flex justify-center w-full p-5">
        <div className="flex-col flex gap-10">
          <div className="relative aspect-square">
            <Image
              className="object-cover"
              fill
              src={`${product.photo}/public`}
              alt={product.title}
            />
          </div>
          <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
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
          <div className="flex items-center justify-between px-5">
            <div>
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              <p>{product.description}</p>
            </div>
            <span className="font-semibold text-xl">
              {formatToWon(product.price)}원
            </span>
          </div>

          <form action={createChatRoom}>
            <button className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold">
              채팅하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
