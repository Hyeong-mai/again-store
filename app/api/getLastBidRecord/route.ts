import db from "@/lib/db";

export const getLastBidRecord = async (prodId: number) => {
  const lastBidRecord = await db.bidRecord.findFirst({
    where: { productId: prodId },
    orderBy: { create_at: "desc" },
    include: { user: true },
  });

  return lastBidRecord;
};
