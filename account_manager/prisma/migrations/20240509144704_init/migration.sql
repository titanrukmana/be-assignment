/*
  Warnings:

  - You are about to drop the `PaymentAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PaymentAccount";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_account_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "payment_account_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_account" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "payment_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "payment_account_type_name_key" ON "payment_account_type"("name");

-- AddForeignKey
ALTER TABLE "payment_account" ADD CONSTRAINT "payment_account_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "payment_account_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
