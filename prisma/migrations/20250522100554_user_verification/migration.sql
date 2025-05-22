-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "data" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verified_at" TIMESTAMP(3),
ADD COLUMN     "verify_code" TEXT;
