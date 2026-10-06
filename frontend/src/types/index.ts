import { z } from "zod"

//============================ Categorias ============================

export const CategoriaSchema = z.object({
    nombre : z.string(),
    descripcion : z.string(),
    id : z.number().optional(),
    imagenUrl: z.string()
})

export const CategoriasSchema = CategoriaSchema.array()

export type CategoriasType = z.infer<typeof CategoriasSchema>

//============================= Products =============================

export const ProducSchema = z.object({
    actualizadoEn : z.string().datetime(), 
    categoria : z.object({
        nombre : z.string()
    }),
    categoriaId : z.number(),
    creadoEn : z.string().datetime(), 
    descripcion :  z.string(),
    descuento : z.string().transform(val => Number(val)).nullable(),
    id : z.number(),
    imagenUrl : z.string(), 
    marca : z.string(),
    modelo : z.string(),
    nombre  : z.string(), 
    precio : z.string().transform(val => Number(val)), 
    precioFinal : z.number(),
    precioOriginal : z.number().optional(),
    promocionId : z.number().nullable(), 
    stock : z.number(), 
    ventas : z.number(),
    promocion : z.object({ 
        id : z.number(),
        nombre : z.string(),
        tipoDescuento : z.string(),
        valorDescuento : z.number().nullable(),
        fechaFin : z.string(),
        fechaInicio : z.string()
    }).optional().nullable()
})

export const ProductsSchema = ProducSchema.array()

export type ProductosType = z.infer<typeof ProductsSchema>