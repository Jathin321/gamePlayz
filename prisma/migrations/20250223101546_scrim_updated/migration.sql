/*
  Warnings:

  - You are about to drop the column `profilePic` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "profilePic",
ADD COLUMN     "profile_pic" TEXT;
