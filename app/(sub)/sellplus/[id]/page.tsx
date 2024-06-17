import getSession from "@/lib/auth/session/getSession";
import db from "@/lib/db";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";
import BidForm from "@/Components/bidForm";
import UpdateForm from "@/Components/updateForm";
import Timer from "@/Components/timer";

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
  if (product && new Date() > product.endBidDate) {
    await db.product.update({
      where: { id },
      data: { sell: true },
    });
  }
  return product;
}

async function getBudRecord(id: number) {
  const bidRecords = await db.bidRecord.findMany({
    where: {
      productId: id,
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
  return bidRecords;
}

const getCacheProduct = nextCache(getProduct, ["product-detail"], {
  tags: ["product-detail"],
});

async function getProductTitle(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
    },
  });
  return product;
}

const getCacheProductTitle = nextCache(getProductTitle, ["product-title"], {
  tags: ["product-title"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getCacheProductTitle(Number(params.id));
  return { title: product?.title };
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const session = await getSession();
  if (!session || isNaN(id)) {
    return notFound();
  }
  const product = await getCacheProduct(id);
  if (!product) {
    return notFound();
  }
  const bidRecords = await getBudRecord(id);

  const isOwner = await getIsOwner(product.userId);

  const endBidDate = new Date(product.endBidDate);

  // const timeDifference =
  //   product.endBidDate && product.create_at
  //     ? product.endBidDate.getTime() - product.create_at.getTime()
  //     : 0;

  // const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // 날짜로 변환

  // const formattedDate = new Date(daysDifference).toLocaleDateString("ko-KR");
  return (
    <div className="max-w-screen-sm bg-white rounded-md h-1/auto flex-col flex justify-center w-full">
      <div className="flex-col flex">
        <div className="relative w-full bg-black aspect-square">
          <Image
            className="object-cover"
            fill
            src={`${product.photo}/public`}
            alt={product.title}
          />
        </div>
        <div className="flex flex-col justify-center gap-3 px-5  size-72  bg-white w-full">
          <div className="flex justify-between items-center gap-3 shadow-inner_b w-full py-5">
            <div className="flex flex-row items-center gap-4">
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
            {product.sell ? null : (
              <div className="flex *:text-3xl items-center justify-center px-5">
                <Timer
                  productId={product.id}
                  endBidDate={endBidDate.toISOString()}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">현재 입찰가</p>
            <span className="font-semibold text-xl">
              {formatToWon(product.price)}원
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p>{product.description}</p>
          </div>
        </div>

        <div className="p-5 w-full  flex gap-5 flex-col shadow-inner_t rounded-lg ">
          {bidRecords.length > 0 ? (
            bidRecords.map((bidRecord) => (
              <div
                key={bidRecord.id}
                className="flex flex-row gap-2 justify-between"
              >
                <div className="relative w-14 h-14 bg-gray-100 rounded-full overflow-hidden text-center flex items-center justify-center ">
                  {bidRecord?.user.avatar ? (
                    <Image
                      fill
                      className="object-cover"
                      src={`${bidRecord?.user.avatar}`}
                      alt={bidRecord?.user.username}
                    />
                  ) : (
                    <UserIcon className="w-full h-full bg-gray-200 text-gray-400" />
                  )}
                </div>
                <div className="w-2/4 gap-2 rounded-lg overflow-hidden text-center flex flex-col items-start justify-center">
                  <span className="text-black font-semibold">
                    {formatToWon(bidRecord?.price)}원
                  </span>
                </div>
                <div className="w-1/5 rounded-lg overflow-hidden text-center flex items-center justify-center ">
                  <span className="text-black font-semibold">
                    {new Date(bidRecord?.create_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-5 w-full text-center">
              <h1>입찰 내역이 없습니다.</h1>
            </div>
          )}
        </div>
      </div>
      {product.sell ? (
        <div className="fixed  flex flex-col gap-4 bottom-0 bg-white w-full mx-auto max-w-screen-sm  shadow-inner_t p-8 items-center justify-center">
          <h1 className="text-xl text-red-400 font-bold">
            입찰이 종료되었습니다.
          </h1>
        </div>
      ) : !isOwner ? (
        session && session.id ? (
          <BidForm
            productUserId={product.userId}
            id={id}
            price={product.price}
          />
        ) : null
      ) : (
        <UpdateForm />
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });
  return products.map((product) => ({ id: product.id + "" }));
}
