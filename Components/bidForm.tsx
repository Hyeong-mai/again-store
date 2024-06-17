"use client";

import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { formatToWon } from "@/lib/utils";
import { useEffect, useState } from "react";
import { addBid, createChatRoom } from "@/app/(sub)/sellplus/[id]/action";

export default function BidForm({
  productUserId,
  id,
  price,
}: {
  productUserId: number;
  id: number;
  price: number;
}) {
  const [bidPrice, setBidPrice] = useState(price);
  const [bidMoney, setBidMoney] = useState(500);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (bidPrice > 5000) {
      setBidMoney(1000);
    } else if (bidPrice > 50000) {
      setBidMoney(5000);
    } else if (bidPrice > 100000) {
      setBidMoney(10000);
    } else if (bidPrice > 1000000) {
      setBidMoney(50000);
    }
  }, [bidPrice]);
  const ChangeBidMoney = (num: number) => {
    setBidPrice((prevPrice) => prevPrice + num * bidMoney);
  };
  const toggleButton = () => {
    setToggle(!toggle);
  };
  const bidAction = async () => {
    setLoading(true);
    try {
      const result = await addBid(id, bidPrice);
      toggleButton();
    } catch (error) {
      console.error("Bid action failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed flex flex-col gap-4 bottom-0 bg-white w-full mx-auto max-w-screen-sm  shadow-inner_t p-5   *:text-green">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-5 rounded-md text-center">
            <p>입찰을 처리 중입니다...</p>
          </div>
        </div>
      )}
      {toggle ? (
        <button
          onClick={toggleButton}
          className="w-full  pt-5 flex items-center justify-center"
        >
          <ChevronDownIcon className="size-8" />
        </button>
      ) : null}

      {toggle ? (
        <div className="w-full bg-white p-5 flex item-end justify-around gap-4">
          <div className="flex w-1/2 flex-col gap-4">
            <h1>입찰 금액</h1>
            <h1 className="text-3xl font-bold">{formatToWon(bidPrice)}원</h1>
          </div>
          <button
            onClick={() => ChangeBidMoney(1)}
            className="p-5 flex items-center border  justify-center text-center text-gray-400 bg-white rounded-md  hover:text-black"
          >
            +{bidMoney}
          </button>
          <button
            onClick={() => ChangeBidMoney(2)}
            className="p-5 flex items-center border  justify-center text-center text-gray-400 bg-white rounded-md  hover:text-black"
          >
            +{bidMoney * 2}
          </button>
          <button
            onClick={() => ChangeBidMoney(3)}
            className="p-5 flex items-center border  justify-center text-center text-gray-400 bg-white rounded-md  hover:text-black"
          >
            +{bidMoney * 3}
          </button>
        </div>
      ) : null}

      <div className="w-full h-full flex  item-center  gap-5 items-center  justify-center text-lg">
        {toggle ? (
          <button
            onClick={bidAction}
            className="bg-green-500 w-full  px-9 py-2.5 rounded-md text-white font-semibold"
          >
            입찰하기
          </button>
        ) : (
          <>
            <form
              action={() => createChatRoom(productUserId)}
              className="w-full"
            >
              <button className="bg-orange-500 w-full  px-9 py-2.5 rounded-md text-white font-semibold">
                채팅하기
              </button>
            </form>
            <form onClick={toggleButton} className="w-full">
              <button className="bg-green-500 w-full  px-9 py-2.5 rounded-md text-white font-semibold">
                입찰하기
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
