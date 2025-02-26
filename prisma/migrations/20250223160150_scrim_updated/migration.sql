/*
  Warnings:

  - Added the required column `status` to the `scrims` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScrimStatus" AS ENUM ('upcoming', 'registering', 'matchmaking');

-- AlterTable
ALTER TABLE "scrims" ADD COLUMN     "status" "ScrimStatus" NOT NULL;
