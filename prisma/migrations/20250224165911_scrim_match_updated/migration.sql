-- AlterTable
ALTER TABLE "scrim_matches" ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "room_id" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "results" DROP NOT NULL;

-- AlterTable
ALTER TABLE "scrims" ALTER COLUMN "matches_count" SET DEFAULT 1;
