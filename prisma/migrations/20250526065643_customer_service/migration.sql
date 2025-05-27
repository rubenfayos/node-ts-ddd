-- CreateTable
CREATE TABLE "customer_service_tickets" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "customer_service_tickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer_service_tickets" ADD CONSTRAINT "customer_service_tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
