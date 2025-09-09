/*
  Warnings:

  - You are about to drop the column `url` on the `repository` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."repository_url_key";

-- AlterTable
ALTER TABLE "public"."repository" DROP COLUMN "url";
