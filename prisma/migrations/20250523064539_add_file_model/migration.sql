-- CreateTable
CREATE TABLE "core_files" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "core_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "core_files" ADD CONSTRAINT "core_files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
