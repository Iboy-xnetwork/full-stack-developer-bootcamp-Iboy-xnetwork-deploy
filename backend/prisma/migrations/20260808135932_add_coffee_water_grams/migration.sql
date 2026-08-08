/*
  Warnings:

  - Added the required column `coffeeGrams` to the `Brew` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterGrams` to the `Brew` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brew" ADD COLUMN     "coffeeGrams" INTEGER NOT NULL,
ADD COLUMN     "waterGrams" INTEGER NOT NULL;
