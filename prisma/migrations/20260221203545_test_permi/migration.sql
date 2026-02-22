/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_userId_fkey";

-- DropTable
DROP TABLE "Permission";

-- CreateTable
CREATE TABLE "Permi" (
    "id" SERIAL NOT NULL,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Permi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permi_userId_resource_action_key" ON "Permi"("userId", "resource", "action");

-- AddForeignKey
ALTER TABLE "Permi" ADD CONSTRAINT "Permi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
