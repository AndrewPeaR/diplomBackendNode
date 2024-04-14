/*
  Warnings:

  - You are about to drop the column `profession` on the `Employees` table. All the data in the column will be lost.
  - Added the required column `employeesProfessionId` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "profession",
ADD COLUMN     "employeesProfessionId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "EmployeesProfession";

-- CreateTable
CREATE TABLE "EmployeesProfession" (
    "id" INTEGER NOT NULL,
    "profession" TEXT NOT NULL,
    "employeesId" INTEGER,

    CONSTRAINT "EmployeesProfession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeesProfession" ADD CONSTRAINT "EmployeesProfession_employeesId_fkey" FOREIGN KEY ("employeesId") REFERENCES "Employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
