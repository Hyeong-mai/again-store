import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getLastBidRecord } from "../getLastBidRecord/route";

export async function POST(request: NextRequest) {
  const { productId } = await request.json();

  try {
    const lastBidRecord = await getLastBidRecord(productId);

    if (lastBidRecord) {
      await db.product.update({
        where: { id: productId },
        data: { sell: true },
      });

      await db.soldOut.create({
        data: {
          userId: lastBidRecord.user.id,
          productId: productId,
        },
      });

      return NextResponse.json({
        message: "판매 완료 처리가 성공적으로 수행되었습니다.",
      });
    } else {
      return NextResponse.json(
        { message: "최근 입찰 기록을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "판매 완료 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
