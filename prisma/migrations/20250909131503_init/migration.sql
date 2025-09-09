-- CreateTable
CREATE TABLE "public"."script_endpoint" (
    "id" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "servePath" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "script_endpoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "script_endpoint_servePath_key" ON "public"."script_endpoint"("servePath");

-- AddForeignKey
ALTER TABLE "public"."script_endpoint" ADD CONSTRAINT "script_endpoint_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "public"."repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
