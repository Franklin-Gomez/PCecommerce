-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "marca" TEXT NOT NULL,
    "modelo" TEXT,
    "precio" DECIMAL(65,30) NOT NULL,
    "descuento" DECIMAL(65,30),
    "stock" INTEGER NOT NULL DEFAULT 0,
    "ventas" INTEGER NOT NULL DEFAULT 0,
    "categoriaId" INTEGER,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "promocionId" INTEGER,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promocion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoDescuento" TEXT NOT NULL,
    "valorDescuento" DECIMAL(65,30) NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promocion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_promocionId_fkey" FOREIGN KEY ("promocionId") REFERENCES "Promocion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
