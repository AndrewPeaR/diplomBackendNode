-- CreateEnum
CREATE TYPE "EmployeesProfession" AS ENUM ('JUNIOR', 'MIDDLE', 'SENIOR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isActivated" BOOLEAN DEFAULT false,
    "activationLink" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "imageUrl" TEXT,
    "dateOfBirth" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3),
    "managerId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyPortfolio" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "CompanyPortfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "description" TEXT,
    "contacts" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "imageUrl" TEXT,
    "profession" "EmployeesProfession" NOT NULL DEFAULT 'JUNIOR',
    "grade" INTEGER,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeesPortfolio" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "employeesId" INTEGER,

    CONSTRAINT "EmployeesPortfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeesLevel" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "employeesId" INTEGER,

    CONSTRAINT "EmployeesLevel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_managerId_key" ON "Company"("managerId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPortfolio" ADD CONSTRAINT "CompanyPortfolio_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeesPortfolio" ADD CONSTRAINT "EmployeesPortfolio_employeesId_fkey" FOREIGN KEY ("employeesId") REFERENCES "Employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeesLevel" ADD CONSTRAINT "EmployeesLevel_employeesId_fkey" FOREIGN KEY ("employeesId") REFERENCES "Employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
