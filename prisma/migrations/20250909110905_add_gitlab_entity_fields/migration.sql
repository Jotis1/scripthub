-- AlterTable
ALTER TABLE "public"."repository" ADD COLUMN     "branchProtected" BOOLEAN DEFAULT false,
ADD COLUMN     "branchWebUrl" TEXT,
ADD COLUMN     "groupFullName" TEXT,
ADD COLUMN     "groupName" TEXT,
ADD COLUMN     "groupPath" TEXT,
ADD COLUMN     "projectDefaultBranch" TEXT,
ADD COLUMN     "projectName" TEXT,
ADD COLUMN     "projectPath" TEXT,
ADD COLUMN     "projectWebUrl" TEXT;
