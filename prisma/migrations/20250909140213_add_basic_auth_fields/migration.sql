-- AlterTable
ALTER TABLE "public"."script_endpoint" ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "requiresAuth" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "username" TEXT;
