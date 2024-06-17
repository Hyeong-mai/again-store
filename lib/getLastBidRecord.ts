// lib/getLastBidRecord.ts
import db from "@/lib/db";

export async function getLastBidRecord(productId: number) {
  return await db.bidRecord.findFirst({
    where: { productId },
    orderBy: { create_at: "desc" },
    include: { user: true },
  });
}
