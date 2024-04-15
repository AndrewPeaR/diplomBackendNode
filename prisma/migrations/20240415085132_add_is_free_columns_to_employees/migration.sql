-- DropIndex
DROP INDEX "EmployeesProfession_id_key";

-- AlterTable
ALTER TABLE "Employees" ADD COLUMN     "isFree" BOOLEAN;

-- AlterTable
CREATE SEQUENCE employeesprofession_id_seq;
ALTER TABLE "EmployeesProfession" ALTER COLUMN "id" SET DEFAULT nextval('employeesprofession_id_seq');
ALTER SEQUENCE employeesprofession_id_seq OWNED BY "EmployeesProfession"."id";
