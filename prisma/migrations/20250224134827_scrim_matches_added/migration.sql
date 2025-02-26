-- CreateTable
CREATE TABLE "scrim_matches" (
    "id" TEXT NOT NULL,
    "scrimId" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "room_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "results" JSON NOT NULL,

    CONSTRAINT "scrim_matches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "scrim_matches" ADD CONSTRAINT "scrim_matches_scrimId_fkey" FOREIGN KEY ("scrimId") REFERENCES "scrims"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
