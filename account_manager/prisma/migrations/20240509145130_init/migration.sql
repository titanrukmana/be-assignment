/*
  Warnings:

  - You are about to drop the column `typeId` on the `payment_account` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `payment_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `payment_account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment_account" DROP CONSTRAINT "payment_account_typeId_fkey";

-- AlterTable
ALTER TABLE "payment_account" DROP COLUMN "typeId",
ADD COLUMN     "type_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PaymentHistory" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "PaymentHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_account" ADD CONSTRAINT "payment_account_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "payment_account_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_account" ADD CONSTRAINT "payment_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "payment_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
