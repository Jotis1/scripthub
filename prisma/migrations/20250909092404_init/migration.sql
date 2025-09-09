-- CreateEnum
CREATE TYPE "public"."Provider" AS ENUM ('gitlab', 'github');

-- CreateTable
CREATE TABLE "public"."repository" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "provider" "public"."Provider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "repository_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "repository_url_key" ON "public"."repository"("url");

-- CreateIndex
CREATE UNIQUE INDEX "repository_groupId_projectId_branchName_provider_key" ON "public"."repository"("groupId", "projectId", "branchName", "provider");
