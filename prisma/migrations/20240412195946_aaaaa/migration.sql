/*
  Warnings:

  - A unique constraint covering the columns `[managerId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_managerId_key" ON "Company"("managerId");
