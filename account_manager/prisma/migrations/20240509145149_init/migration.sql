/*
  Warnings:

  - You are about to drop the `PaymentHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_account_id_fkey";

-- DropTable
DROP TABLE "PaymentHistory";

-- CreateTable
CREATE TABLE "payment_history" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "payment_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_history" ADD CONSTRAINT "payment_history_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "payment_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
