import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  title: string;
  price: number;
  create_at: Date;
  description: string;
  photo: string;
  id: number;
}

export default function ListProduct({
  title,
  price,
  create_at,
  description,
  photo,
  id,
}: ListProductProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="flex flex-col items-center justify-center  bg-white gap-5"
    >
      <div className="relative w-full h-64 bg-black rounded-2xl overflow-hidden ">
        <Image
          fill
          className="object-cover"
          src={`${photo}/public`}
          alt={title}
        />
      </div>
      <div className="flex justify-end w-full  flex-col gap-1 *:text-black">
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-sm text-neutral-500">
          {/* {formatToTimeAgo(create_at.toString())} */}
          {description}
        </span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
