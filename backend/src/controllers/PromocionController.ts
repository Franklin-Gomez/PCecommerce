import { Request , Response } from "express"
import prisma from "../db/prisma";

export class PromocionController {

    static async createPromocion ( req : Request , res : Response ){
        try {
            const { nombre, tipoDescuento, valorDescuento, fechaInicio, fechaFin } = req.body;

            if (!nombre || !tipoDescuento || !valorDescuento || !fechaInicio || !fechaFin) {
                return res.status(400).json({ message: "Faltan datos obligatorios" });
            }

            const nuevaPromocion = await prisma.promocion.create({
                data: { 
                    nombre, 
                    tipoDescuento, 
                    valorDescuento, 
                    fechaInicio, 
                    fechaFin 
                }
            });

            return res.status(201).json({
                message: "Promoción creada exitosamente",
                promocion: nuevaPromocion
            });

        } catch (error: any) {

            console.error("Error al crear promoción:", error);
            return res.status(500).json({ message: "Error interno", error: error.message });
        
        }
    }

    static async getAllPromocion( req : Request , res : Response ){
        try {
            const promociones = await prisma.promocion.findMany({
                include: { 
                    productos: true 
                } // trae productos asociados
            });

            return res.status(200).json(promociones);

        } catch (error: any) {
            console.error("Error al obtener promociones:", error);
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    }

    static async getOnePromocion ( req : Request , res : Response ) {

        try { 

            const promocionId = parseInt(req.params.promocionId, 10);

            if (isNaN(promocionId)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const promocion = await prisma.promocion.findUnique({
                where: { id: promocionId },
                include: { productos: true }
            });

            if (!promocion) {
                return res.status(404).json({ message: "Promoción no encontrada" });
            }

            return res.status(200).json(promocion);

        } catch (error: any) {
            
            console.error("Error al obtener promoción:", error);
            return res.status(500).json({ message: "Error interno", error: error.message });
        
        } 
    }

    static async updatePromocion( req : Request , res : Response ){
        try {
            const promocionId = parseInt(req.params.promocionId, 10);

            if (isNaN(promocionId)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const promocion = await prisma.promocion.findUnique({ where: { id: promocionId } });

            if (!promocion) {
                return res.status(404).json({ message: "Promoción no encontrada" });
            }

            const updateDatos = await prisma.promocion.update({
                where: { id: promocionId },
                data: {
                    nombre: req.body.nombre ?? promocion.nombre,
                    tipoDescuento: req.body.tipoDescuento ?? promocion.tipoDescuento,
                    valorDescuento: req.body.valorDescuento ?? promocion.valorDescuento,
                    fechaInicio: req.body.fechaInicio ?? promocion.fechaInicio,
                    fechaFin: req.body.fechaFin ?? promocion.fechaFin
                }
            });

            return res.status(200).json({
                message: "Promoción actualizada correctamente",
                promocion: updateDatos
            });

        } catch (error: any) {
            console.error("Error al actualizar promoción:", error);
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    }

    static async deletePromocion( req : Request , res : Response ){
        try {

            const promocionId = parseInt( req.params.promocionId , 10 )

            if( isNaN(promocionId)) {
                return res.status(404).json({ message : 'ID invalido'})
            }

            const deletePromocion = await prisma.promocion.delete({
                where : { id : promocionId }
            })

            return res.status(200).json({
                message: "Promoción eliminada correctamente",
                promocion: deletePromocion
            });
            
        } catch (error : any ) {
            console.error("Error al actualizar promoción:", error);

            if( error.code == 'P2025'){
                return res.status(404).json({ message : "Promocion no encontrada "})
            }

            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    }

    static async getProductsWithPromocion ( req : Request , res : Response ) {

        const now = new Date()
        
        try {
            const productos = await prisma.producto.findMany({
                include: {
                    promocion: true,
                    categoria : { 
                        select : { 
                            nombre : true
                        }
                    }
                },
                where : { 
                    NOT : {
                        promocionId : null
                    },

                    promocion: {
                        fechaInicio: { lte: now },
                        fechaFin: { gte: now }
                    }
                    
                }
            });

            const productosConPrecioFinal = productos.map((producto) => {

                let precioOriginal = producto.precio.toNumber();
                let precioFinal = precioOriginal
                let promocionActiva = null  

                if (producto.promocion) {
                    const now = new Date();
                    const { fechaInicio, fechaFin, tipoDescuento, valorDescuento } = producto.promocion;
                    
                    // Verificar si la promoción está activa
                    if (fechaInicio <= now && fechaFin >= now) {
                
                        promocionActiva = producto.promocion

                        if (tipoDescuento === "porcentaje") {
                            
                            precioFinal = Number(precioOriginal) - ( Number(precioOriginal) * valorDescuento.toNumber()) / 100;

                        } else if (tipoDescuento === "fijo") {
                            precioFinal = Number(precioOriginal) - valorDescuento.toNumber();
                        }
                    }
                }

                return {
                    ...producto,
                    precioFinal,
                    precioOriginal,
                    promocion : promocionActiva ? {
                        id: promocionActiva.id,
                        nombre: promocionActiva.nombre,
                        tipoDescuento: promocionActiva.tipoDescuento,
                        valorDescuento: promocionActiva.valorDescuento.toNumber(),
                        fechaInicio: promocionActiva.fechaInicio,
                        fechaFin: promocionActiva.fechaFin
                    }
                    
                    : 
                    
                    null
                };
                
            });

            return res.status(200).json(productosConPrecioFinal); 

        } catch (error) {

            console.error(error);
            res.status(500).json({ message: "Error al obtener productos con promoción" });
        
        }
    }
}