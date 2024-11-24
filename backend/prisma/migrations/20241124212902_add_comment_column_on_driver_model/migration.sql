/*
  Warnings:

  - You are about to alter the column `rating` on the `Driver` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "comment" VARCHAR(250) NOT NULL DEFAULT '',
ALTER COLUMN "rating" SET DATA TYPE VARCHAR(10);
