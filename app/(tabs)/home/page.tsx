import ProductList from "@/Components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import Link from "next/link";

const getCacheProducts = nextCache(getInitialProducts, ["home-products"]);
async function getInitialProducts() {
  const products = await db.product.findMany({
    where: {
      sell: false,
    },
    select: {
      title: true,
      price: true,
      create_at: true,
      description: true,
      endBidDate: true,
      photo: true,
      id: true,
      sell: true,
    },
    take: 25,
    orderBy: {
      create_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metadata = {
  title: "Home",
};

// export const revalidate = 60;

export default async function Home() {
  const initialProducts = await getCacheProducts();
  return (
    <div className="pt-14">
      <ProductList initialProducts={initialProducts}></ProductList>
      <Link
        href="/products/add"
        className=" bg-black flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-green-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
