/*
  Warnings:

  - A unique constraint covering the columns `[menuId]` on the table `menus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PermissionAction" AS ENUM ('VIEW', 'CREATE', 'UPDATE', 'DELETE');

-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "menuId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "menus_menuId_key" ON "menus"("menuId");
