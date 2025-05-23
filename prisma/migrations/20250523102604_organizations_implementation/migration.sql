-- CreateTable
CREATE TABLE "organizations_organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations_organization_membership" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "organizations_organization_membership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_organization_membership_user_id_organization__key" ON "organizations_organization_membership"("user_id", "organization_id");

-- AddForeignKey
ALTER TABLE "organizations_organization_membership" ADD CONSTRAINT "organizations_organization_membership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations_organization_membership" ADD CONSTRAINT "organizations_organization_membership_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations_organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
