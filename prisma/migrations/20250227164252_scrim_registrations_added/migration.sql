-- AlterTable
ALTER TABLE "team_join_requests" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "scrim_registrations" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "scrim_id" TEXT NOT NULL,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "scrim_registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "scrim_registrations" ADD CONSTRAINT "scrim_registrations_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scrim_registrations" ADD CONSTRAINT "scrim_registrations_scrim_id_fkey" FOREIGN KEY ("scrim_id") REFERENCES "scrims"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
