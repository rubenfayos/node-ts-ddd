/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_user_id_fkey";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "core_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "roles" TEXT[],
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verified_at" TIMESTAMP(3),
    "verify_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "core_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core_events" (
    "id" TEXT NOT NULL,
    "related_id" TEXT NOT NULL,
    "stream" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "root" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB,
    "user_id" TEXT,

    CONSTRAINT "core_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "core_users_email_key" ON "core_users"("email");

-- AddForeignKey
ALTER TABLE "core_events" ADD CONSTRAINT "core_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
