/*
  Warnings:

  - Made the column `modelo` on table `Producto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN     "imagenUrl" TEXT;

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "imagenUrl" TEXT,
ALTER COLUMN "modelo" SET NOT NULL;
