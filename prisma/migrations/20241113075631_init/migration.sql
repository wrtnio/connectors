/*
  Warnings:

  - Made the column `type` on table `x_tweet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "x_tweet" ALTER COLUMN "type" SET NOT NULL;
