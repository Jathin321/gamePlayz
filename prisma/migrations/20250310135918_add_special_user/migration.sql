-- CreateEnum
CREATE TYPE "ChatContextType" AS ENUM ('spaces', 'tournaments', 'scrims', 'teams');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "special_user" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "live_chat_messages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "replied_to_id" TEXT,
    "context_type" "ChatContextType" NOT NULL,
    "context_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "live_chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "important" BOOLEAN NOT NULL DEFAULT false,
    "sender_id" TEXT NOT NULL,
    "context_type" "ChatContextType" NOT NULL,
    "context_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "live_chat_messages_sender_id_idx" ON "live_chat_messages"("sender_id");

-- CreateIndex
CREATE INDEX "live_chat_messages_context_type_context_id_idx" ON "live_chat_messages"("context_type", "context_id");

-- CreateIndex
CREATE INDEX "announcements_sender_id_idx" ON "announcements"("sender_id");

-- CreateIndex
CREATE INDEX "announcements_context_type_context_id_idx" ON "announcements"("context_type", "context_id");

-- AddForeignKey
ALTER TABLE "live_chat_messages" ADD CONSTRAINT "live_chat_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_chat_messages" ADD CONSTRAINT "live_chat_messages_replied_to_id_fkey" FOREIGN KEY ("replied_to_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
