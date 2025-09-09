/*
  Warnings:

  - Made the column `branchProtected` on table `repository` required. This step will fail if there are existing NULL values in that column.
  - Made the column `branchWebUrl` on table `repository` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groupFullName` on table `repository` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groupName` on table `repository` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groupPath` on table `repository` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectDefaultBranch` on table `repository` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectName` on table `repository` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectPath` on table `repository` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectWebUrl` on table `repository` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."repository" ALTER COLUMN "branchProtected" SET NOT NULL,
ALTER COLUMN "branchWebUrl" SET NOT NULL,
ALTER COLUMN "groupFullName" SET NOT NULL,
ALTER COLUMN "groupName" SET NOT NULL,
ALTER COLUMN "groupPath" SET NOT NULL,
ALTER COLUMN "projectDefaultBranch" SET NOT NULL,
ALTER COLUMN "projectName" SET NOT NULL,
ALTER COLUMN "projectPath" SET NOT NULL,
ALTER COLUMN "projectWebUrl" SET NOT NULL;
