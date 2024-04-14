/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tokens_refreshToken_key" ON "Tokens"("refreshToken");
