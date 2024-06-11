/*
  Warnings:

  - You are about to drop the `LiveStream` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LiveStream" DROP CONSTRAINT "LiveStream_userId_fkey";

-- DropTable
DROP TABLE "LiveStream";

-- CreateTable
CREATE TABLE "BidRecord" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "BidRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BidRecord" ADD CONSTRAINT "BidRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidRecord" ADD CONSTRAINT "BidRecord_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
