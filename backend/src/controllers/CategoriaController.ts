import { Request , Response } from "express"
import prisma from "../db/prisma";

export  class CategoriaController {
    
    static async createCategoria ( req : Request , res : Response ){
        
        try {

            const { categorias } = req.body;

            if (!Array.isArray(categorias) || categorias.length === 0) {
            return res.status(400).json({ message: "Debe enviar un arreglo de categorías" });
            }

            const nuevasCategorias = await prisma.categoria.createMany({
                data: categorias
            });

            return res.status(201).json({
                message: "Categoría creada exitosamente",
                categoria: nuevasCategorias
            });

        } catch (error: any) {
            console.error("Error al crear categoría:", error);
            return res.status(500).json({ message: "Error interno", error: error.message });
        }

    }

    static async getCategorias( req : Request , res : Response ) {

        try {

            const categorias = await prisma.categoria.findMany({
                // include: { 
                //     productos: true 
                // } // trae también los productos relacionados
                
            });

            return res.status(200).json(categorias);

        } catch (error: any) {

            console.error("Error al obtener categorías:", error);
            return res.status(500).json({ message: "Error interno", error: error.message });
        
        }

    }

    static async getOneCategoria ( req : Request , res : Response ) {
        try {
            const categoriaId = parseInt(req.params.categoriaId, 10);

            if (isNaN(categoriaId)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const categoria = await prisma.categoria.findUnique({
                where: { id: categoriaId },
                include: { productos: true } 
            });

            if (!categoria) {
                return res.status(404).json({ message: "Categoría no encontrada" });
            }

            return res.status(200).json(categoria);

        } catch (error: any) {
            console.error("Error al obtener categoría:", error);
            return res.status(500).json({ message: "Error interno", error: error.message });
        }
    }

    static async updateCategoria ( req : Request , res : Response ) {

        try {
            const categoriaId = parseInt(req.params.categoriaId, 10);

            // Validación de ID
            if (isNaN(categoriaId)) {
                return res.status(400).json({ message: "ID de categoría inválido" });
            }

            // Verificar si existe
            const categoria = await prisma.categoria.findUnique({
                where: { id: categoriaId }
            });

            if (!categoria) {
                return res.status(404).json({ message: "Categoría no encontrada" });
            }

            // Actualizar con los campos enviados
            const updateDatos = await prisma.categoria.update({
                where: { id: categoriaId },
                data: {
                    nombre: req.body.nombre ?? categoria.nombre,
                    descripcion: req.body.descripcion ?? categoria.descripcion
                }
            });

            return res.status(200).json({
                message: "Categoría actualizada correctamente",
                categoria: updateDatos
            });

        } catch (error: any) {
            console.error("Error al actualizar categoría:", error);

            if (error.code === "P2025") {
                return res.status(404).json({ message: "Categoría no encontrada" });
            }

            return res.status(500).json({
                message: "Error interno al actualizar la categoría",
                error: error.message
            });
        }
    }


}