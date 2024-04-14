/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `EmployeesProfession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmployeesProfession_id_key" ON "EmployeesProfession"("id");
