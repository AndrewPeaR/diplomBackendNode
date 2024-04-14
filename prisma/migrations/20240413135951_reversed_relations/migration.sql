/*
  Warnings:

  - You are about to drop the column `employeesId` on the `EmployeesLevel` table. All the data in the column will be lost.
  - You are about to drop the column `employeesId` on the `EmployeesPortfolio` table. All the data in the column will be lost.
  - You are about to drop the column `employeesId` on the `EmployeesProfession` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmployeesLevel" DROP CONSTRAINT "EmployeesLevel_employeesId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeesPortfolio" DROP CONSTRAINT "EmployeesPortfolio_employeesId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeesProfession" DROP CONSTRAINT "EmployeesProfession_employeesId_fkey";

-- AlterTable
ALTER TABLE "Employees" ADD COLUMN     "employeesLevelId" INTEGER,
ADD COLUMN     "employeesPortfolioId" INTEGER,
ALTER COLUMN "employeesProfessionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmployeesLevel" DROP COLUMN "employeesId";

-- AlterTable
ALTER TABLE "EmployeesPortfolio" DROP COLUMN "employeesId";

-- AlterTable
ALTER TABLE "EmployeesProfession" DROP COLUMN "employeesId";

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_employeesPortfolioId_fkey" FOREIGN KEY ("employeesPortfolioId") REFERENCES "EmployeesPortfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_employeesProfessionId_fkey" FOREIGN KEY ("employeesProfessionId") REFERENCES "EmployeesProfession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_employeesLevelId_fkey" FOREIGN KEY ("employeesLevelId") REFERENCES "EmployeesLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
