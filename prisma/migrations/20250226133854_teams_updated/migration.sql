-- DropForeignKey
ALTER TABLE "team_join_requests" DROP CONSTRAINT "team_join_requests_receiver_id_fkey";

-- AlterTable
ALTER TABLE "team_join_requests" ALTER COLUMN "receiver_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "team_join_requests" ADD CONSTRAINT "team_join_requests_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
