/*
  Warnings:

  - Added the required column `customer_id` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "comment" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "customer_id" VARCHAR(50) NOT NULL;
