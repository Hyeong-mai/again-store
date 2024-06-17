import db from "@/lib/db";
import getSession from "@/lib/auth/session/getSession";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { formatToWon } from "@/lib/utils";
import Link from "next/link";

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

const getProduct = async () => {
  const session = await getSession();
  if (session.id) {
    const products = await db.product.findMany({
      where: {
        userId: session.id,
      },
      select: {
        id: true,
        photo: true,
        title: true,
        price: true,
        description: true,
        sell: true,
      },
    });

    if (products) {
      const productsSelling = products.filter((product) => product.sell);
      const productsSoldOut = products.filter((product) => !product.sell);
      return { products, productsSelling, productsSoldOut };
    }
  }
  return { products: [], productsSelling: [], productsSoldOut: [] };
};
const getBid = async () => {
  const session = await getSession();
  const bid = await db.bidRecord.findMany({
    where: {
      userId: session.id,
    },
    distinct: ["productId"],
  });
  return bid.length;
};
const getSoldOut = async () => {
  const session = await getSession();
  if (session.id) {
    const soldOuts = await db.soldOut.findMany({
      where: {
        userId: session.id,
      },
      include: {
        product: {
          select: {
            id: true,
            photo: true,
            title: true,
            price: true,
            description: true,
            sell: true,
          },
        },
      },
    });
    if (soldOuts) {
      const soldOutsSelling = soldOuts.filter(
        (soldOut) => soldOut?.product?.sell
      );
      const soldOutsSoldOut = soldOuts.filter(
        (soldOut) => !soldOut?.product?.sell
      );
      return { soldOuts, soldOutsSelling, soldOutsSoldOut };
    }
  }
  return { soldOuts: [], soldOutsSelling: [], soldOutsSoldOut: [] };
};

export default async function Profile() {
  const user = await getUser();
  const bid = await getBid();
  const { soldOuts, soldOutsSelling, soldOutsSoldOut } = await getSoldOut();
  const { products, productsSelling, productsSoldOut } = await getProduct();
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
          <span>{soldOuts?.length + bid}</span>
        </div>
        <div className="flex w-1/5 h-full flex-col gap-2  text-center ">
          <h1>진행중</h1>
          <span>{bid}</span>
        </div>
        <div className="flex w-1/5 h-full flex-col gap-2  text-center ">
          <h1>종료</h1>
          <span>{soldOuts?.length}</span>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-5">
        {soldOuts?.map((soldOut) => (
          <Link
            href={`/sellplus/${soldOut.product.id}`}
            key={soldOut.id}
            className="flex flex-row gap-2 justify-between"
          >
            <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
              {soldOut?.product.photo || " " ? (
                <Image
                  fill
                  className="object-cover"
                  src={`${soldOut?.product.photo}/public`}
                  alt={soldOut?.product.title}
                />
              ) : (
                <UserIcon className="w-full h-full bg-gray-200 text-gray-400" />
              )}
            </div>
            <div className="w-2/4 gap-2 rounded-lg overflow-hidden text-center flex flex-col items-start justify-center">
              <span className="text-black text-lg font-semibold">
                {soldOut?.product.title}
              </span>
              <span className="text-gray-500">
                {soldOut?.product.description}
              </span>
            </div>
            <div className="w-1/5 rounded-lg overflow-hidden text-center flex items-center justify-center ">
              <span className="text-black font-semibold">
                {formatToWon(soldOut?.product.price)}원
              </span>
            </div>
          </Link>
        ))}
      </div>

      <h1 className="text-xl font-semibold">판매 내역</h1>
      <div className="flex flex-row items-center justify-between  rounded-2xl bg-orange-50 w-full p-7">
        <div className="flex w-1/5 h-full flex-col gap-2  text-center border-r">
          <h1>전체</h1>
          <span>{productsSelling.length + productsSoldOut.length}</span>
        </div>
        <div className="flex w-1/5 h-full flex-col gap-2  text-center ">
          <h1>진행중</h1>
          <span>{productsSelling.length}</span>
        </div>
        <div className="flex w-1/5 h-full flex-col gap-2  text-center ">
          <h1>종료</h1>
          <span>{productsSoldOut.length}</span>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-5">
        {products?.map((product) => (
          <Link
            href={`/sellplus/${product.id}`}
            key={product.id}
            className="flex flex-row gap-2 justify-between"
          >
            <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden text-center flex items-center justify-center ">
              {product.photo || " " ? (
                <Image
                  fill
                  className="object-cover"
                  src={`${product.photo}/public`}
                  alt={product.title}
                />
              ) : (
                <UserIcon className="w-full h-full bg-gray-200 text-gray-400" />
              )}
            </div>
            <div className="w-2/4 gap-2 rounded-lg overflow-hidden text-center flex flex-col items-start justify-center">
              <span className="text-black text-lg font-semibold">
                {product.title}
              </span>
              <span className="text-gray-500">{product.description}</span>
            </div>
            <div className="w-1/5 rounded-lg overflow-hidden text-center flex items-center justify-center ">
              <span className="text-black font-semibold">
                {formatToWon(product.price)}원
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
