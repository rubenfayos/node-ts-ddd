/*
  Warnings:

  - You are about to drop the column `updated_at` on the `core_events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "core_event_subscriptions" ALTER COLUMN "executed_at" DROP NOT NULL,
ALTER COLUMN "executed_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "core_events" DROP COLUMN "updated_at",
ALTER COLUMN "stream" DROP NOT NULL;
