-- CreateTable
CREATE TABLE "core_event_subscriptions" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "handler_name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "retries" INTEGER NOT NULL DEFAULT 0,
    "executed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "core_event_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core_event_subscription_errors" (
    "id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "trace" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "core_event_subscription_errors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToEventSubscriptionError" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventToEventSubscriptionError_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "core_event_subscription_errors_subscription_id_key" ON "core_event_subscription_errors"("subscription_id");

-- CreateIndex
CREATE INDEX "_EventToEventSubscriptionError_B_index" ON "_EventToEventSubscriptionError"("B");

-- AddForeignKey
ALTER TABLE "core_event_subscriptions" ADD CONSTRAINT "core_event_subscriptions_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "core_events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "core_event_subscription_errors" ADD CONSTRAINT "core_event_subscription_errors_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "core_event_subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventSubscriptionError" ADD CONSTRAINT "_EventToEventSubscriptionError_A_fkey" FOREIGN KEY ("A") REFERENCES "core_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventSubscriptionError" ADD CONSTRAINT "_EventToEventSubscriptionError_B_fkey" FOREIGN KEY ("B") REFERENCES "core_event_subscription_errors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
