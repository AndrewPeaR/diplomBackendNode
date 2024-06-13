/*
  Warnings:

  - A unique constraint covering the columns `[fingerprint]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fingerprint` to the `Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tokens" ADD COLUMN     "fingerprint" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_fingerprint_key" ON "Tokens"("fingerprint");
