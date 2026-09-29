import prisma from "../db/prisma";
import { Request , Response } from "express"

export class  ProductsController { 

    static async createProduct ( req : Request , res : Response) {
        
        try {

            const { productos } = req.body

            if (!Array.isArray(productos) && productos.length === 0) {
                return res.status(400).json({ message: "Debe enviar un arreglo de productos" });
            }
            
            // Lógica para crear un usuario uno solo 
            // const { nombre , descripcion , marca , modelo , precio , descuento , stock , ventas , categoriaId , promocionId } = req.body.productos;

            // const nuevoProducto = await prisma.producto.create({
            //     data : {
            //         nombre,
            //         descripcion,
            //         marca,
            //         modelo,
            //         precio,
            //         descuento: descuento ?? null, // opcional
            //         stock: stock ?? 0,            // default 0
            //         ventas: ventas ?? 0,          // default 0
            //         categoriaId,
            //         promocionId
            //     }
            // });

            // return res.status(201).json({
            //     message: "Producto creado exitosamente",
            //     producto: nuevoProducto
            // });
            
            const nuevosProductos = await prisma.producto.createMany({
                data: productos
            });

            return res.status(201).json({
                message: "Producto creado exitosamente",
                producto: nuevosProductos
            });
        
        } catch (error) {
            
            console.error("Error a crear producto")
            
            res.status(500).json({ 
                message: "Error interno al crear producto ", 
                error: error.message 
            });
        
        }

    } 

    static async getOneProduct ( req : Request , res : Response ){
    
        try {
            
            const productId = parseInt( req.params.productId , 10)

            if( isNaN(productId) ) {     
                return res.status(400).json({ message : "Producto no valido"})
            }

            const producto = await prisma.producto.findUnique({
                where :  {
                    id : productId
                } 
            });

            if(!producto) {
                return res.status(404).json({ message : "Producto no encontrado"})
            }

            return res.status(200).json( producto )

        } catch (error) {

            console.error("Error inesperado :" , error)

            res.status(500).json({ 
                message: "Error al obtener los productos", 
                error: error.message
            });
        }
    } 

    static async getAllProduct ( req : Request , res : Response ) {
        
        try {
        
            // const productos  = await  prisma.producto.findMany({
            //     include : {
            //         categoria : {
            //             select : {
            //                 nombre : true
            //             },
            //         },
            //     },
            // });
            
            // if ( productos.length == 0  ) {
            //     return res.status(404).json({ message : "Error al cargar los componentes "})
            // }

            // return res.status(200).json( productos )

            const noew = new Date();

            const productos = await prisma.producto.findMany({
                include: {
                    promocion: true,
                    categoria : { 
                        select : { 
                            nombre : true
                        }
                    }
                },
            });

            const productosConPrecioFinal = productos.map((producto) => {

                let precioOriginal = Number(producto.precio);
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
                            precioFinal = Number(producto.precio) - valorDescuento.toNumber();
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
            
            console.error("Error inesperado :" , error)

            res.status(500).json({ 
                message: "Error al obtener los productos", 
                error: error.message 
            });
        }


    }

    
    static async updateProduct ( req : Request , res : Response ) {

        try {
            
            const productoId = parseInt( req.params.productoId , 10 )

            if ( isNaN( productoId ) ) {
                return res.status(404).json({ message : "Componente no encontrado "})
            }

            const producto = await prisma.producto.findUnique({
                where : {
                    id : productoId
                }
            })

            if ( !producto ) {
                return res.status(404).json({ message : "componente no existe"})
            }

            const updateDatos = await prisma.producto.update({
                where  : { id : productoId },
                data : { 
                    nombre : req.body.nombre ?? producto.nombre,
                    descripcion  : req.body.descipcion ?? producto.descripcion,
                    marca : req.body.marca ?? producto.marca,
                    modelo : req.body.modelo ?? producto.modelo ,
                    precio : req.body.precio ?? producto.precio,
                    descuento: req.body.descuento ?? producto.descuento, 
                    stock: req.body.stock ?? producto.stock,            
                    ventas: req.body.ventas ?? producto.ventas,       
                    categoriaId : req.body.categoriaId ?? producto.categoriaId,
                    promocionId : req.body.promocionId ?? producto.promocionId
                }
            });

            return res.status(200).json({ 
                message : "Producto actualizado correctamente" , 
                producto : updateDatos 
            })
            
        } catch (error) {
             
            console.error("Error al actualizar el componente :" , error) 
            
            if (error.code === "P2025") {
                // Prisma lanza P2025 si no encuentra el registro
                return res.status(404).json({ message: "Componente no encontrado" });
            }    

            res.status(500).json({ 
                message: "Error interno al actualizar el componente", 
                error: error.message 
            });
        }
        
    } 

    
    static async deleteProduct ( req : Request , res : Response ) {
        
        try {

            const productId = parseInt(req.params.productId , 10 ) 
        
            if ( isNaN( productId ) ) { 
                return res.status(400).json({ message : " Producto no encontrado" })
            }

            const deleteProducto = await prisma.producto.delete({
                where : {
                    id : productId
                }
            })

            return res.status(200).json({ 
                message : "producto eliminado correctamente", 
                producto : deleteProducto
            })
            
        } catch (error) {

            console.error("Error al eliminar producto:", error);

            if (error.code === "P2025") {
                // Prisma lanza P2025 si no encuentra el registro
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            return res.status(500).json({
            message: "Error interno al eliminar el producto",
            error: error.message
            });
        }

    } 

} 