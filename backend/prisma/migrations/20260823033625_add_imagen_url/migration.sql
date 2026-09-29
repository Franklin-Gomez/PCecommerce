/*
  Warnings:

  - Made the column `imagenUrl` on table `Categoria` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Categoria" ALTER COLUMN "imagenUrl" SET NOT NULL;
