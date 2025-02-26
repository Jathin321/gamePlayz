-- AlterEnum
ALTER TYPE "ScrimStatus" ADD VALUE 'completed';

-- AlterTable
ALTER TABLE "scrims" ADD COLUMN     "matches_count" INTEGER NOT NULL DEFAULT 0;
