"use server";

import getSession from "@/lib/auth/session/getSession";
import db from "@/lib/db";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createChatRoom = async (userId: number) => {
  const session = await getSession();
  const room = await db.chatRoom.create({
    data: {
      users: {
        connect: [
          {
            id: userId,
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

export const addBid = async (id: number, bidPrice: number) => {
  const session = await getSession();
  try {
    const result = await db.bidRecord.create({
      data: {
        price: bidPrice,
        user: {
          connect: {
            id: session.id,
          },
        },
        product: {
          connect: {
            id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    if (result) {
      const result = await db.product.update({
        where: {
          id,
        },
        data: {
          price: bidPrice,
        },
      });
      if (!result) {
        console.error("입찰 추가 중 오류:");
      }
      await revalidateTag("product-detail");
      return result;
    }
  } catch (error) {
    console.error("입찰 추가 중 오류:", error);
    return null;
  }
};
