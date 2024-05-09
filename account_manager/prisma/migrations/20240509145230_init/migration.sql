/*
  Warnings:

  - You are about to drop the column `type_id` on the `payment_account` table. All the data in the column will be lost.
  - You are about to drop the `payment_account_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `payment_account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment_account" DROP CONSTRAINT "payment_account_type_id_fkey";

-- AlterTable
ALTER TABLE "payment_account" DROP COLUMN "type_id",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "payment_account_type";
