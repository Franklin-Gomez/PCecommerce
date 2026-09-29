import { Request, Response } from "express";
import prisma from "../db/prisma";
import { comparePassword } from "../service/passwordCryp";
import { generateToken } from "../service/jwt";
import bcrypt from "bcrypt";

interface LoginBody {
    email: string;
    password: string;
}

export class UserController {

    static async createUser (req: Request, res: Response) {

        try {
            // Lógica para crear un usuario
            const { name, email, password } = req.body;

            if ( name == "" || email == ""|| password ==  "" ) {
                return res.status(404).json({ message : "Falta Informacion" })
            } 

            // verificar si el usuario ya existe en la base de datos
            const existingUser = await prisma.user.findUnique({ where: { email } });
            
            if (existingUser) {
                return res.status(409).json({ message: "El email ya está registrado" });
            }     

            const hashedPassword = await bcrypt.hash(password, 10);
                        
            const nuevoUser = await prisma.user.create({
                data : {
                    nombre : name,
                    email: email ,
                    password : hashedPassword              
                }
            });

            if( !nuevoUser ) {
                return res.status(404).status({ message : "Imposible crear usuario" })
            }

            res.status(201).json({ message: "Usuario creado exitosamente"  });
        
        } catch (error) {
            
            console.error("Error al crear usuario:", error);

            return res.status(500).json({
                message: "Error interno al crear usuario",
                error: error.message,
            });
        
        }

    }

    static async getUser (req: Request, res: Response) {

        try {
            
            // Lógica para obtener un usuario por su ID
            const userId = parseInt( req.params.userId , 10)

            if( !userId ) {     
                return res.status(404).json({ message : "Usuario no Valido"})
            }

            const usuario = await prisma.user.findUnique({
                where :  {
                    id : userId
                } 
            });

            if(!usuario) {
                return res.status(404).json({ message : "Usuario no encontrado"})
            }

            return res.status(200).json( usuario)

        } catch (error) {

            console.error("Error inesperado :" , error)

            res.status(500).json({ 
                message: "Error al obtener el usuario", 
                error: error.message
            });
        }
    
    }

    static async getAll ( req : Request , res : Response ) { 

        try {
        
            const user = await  prisma.user.findMany();

            if ( !user ) {
                return res.status(404).json({ message : "Usuarios no encontrados"})
            }

            return res.status(200).json( user )

        } catch (error) {
            
            console.error("Error inesperado :" , error)

            res.status(500).json({ 
                message: "Error al obtener el usuario", 
                error: error.message
            });
        }
    }

    static async updateUser ( req : Request , res : Response ) {

        try {
            
            const userId = parseInt( req.params.userI , 10 )

            if ( !userId ) {
                return res.status(404).json({ message : "Usuario no encontrado"})
            }

            const user = await prisma.user.findUnique({
                where : {
                    id : userId
                }
            })

            if ( !user ) {
                return res.status(404).json({ message : "Usuario no existe"})
            }

            const { nombre , email } = req.body 

            const updateDatos = await prisma.user.update({
                where  : { id : userId },
                data : { 
                    nombre , 
                    email
                }
            });

            return res.status(200).json({ 
                message : "Usuario actualizado correctamente" , 
                usuario : updateDatos 
            })
            
        } catch (error) {
             
            console.error("Error al actualizar usuario :" , error) 
            
            if (error.code === "P2025") {
                // Prisma lanza P2025 si no encuentra el registro
                return res.status(404).json({ message: "Usuario no encontrado" });
            }    

            res.status(500).json({ 
                message: "Error interno al actualizar el usuario", 
                error: error.message 
            });
        }
    }

    static async deleteUser ( req : Request , res : Response ) {

        try {

            const userId = parseInt(req.params.id , 10 ) 
        
            if ( !userId ) { 
                return res.status(404).json({ message : "Error al buscar usuario" })
            }

            const deleteUser = await prisma.user.delete({
                where : {
                    id : userId
                }
            })

            if ( deleteUser ) { 
                return res.statu(404).json({ message : "Error al eliminar" })
            }

            return res.status(200).json({ message : " usuario eliminado correctamente" })
            
        } catch (error) {

            console.error("Error a eliminar el usuario")
            
            res.status(500).json({ 
                message: "Error interno al eliminar el usuario", 
                error: error.message 
            });
        }
    }

    static async loginUser ( req : Request<{}, {}, LoginBody> , res : Response ) {

        try {
            
            const { email , password } = req.body;

            if ( email == "" || password == "" ) {
                return res.status(400).json({ message : "Falta credenciales" })
            }

            const user = await prisma.user.findUnique({
                where : {
                    email : email
                }
            })
            
            if ( !user ) {
                return res.status(404).json({ message : "Usuario no encontrado" })
            }

            const validatePassowrd = await comparePassword(password, user.password);

            if ( !validatePassowrd ) {
                return res.status(401).json({ message : "Contraseña incorrecta" })
            }

            const token = generateToken({ id : user.id , email : user.email })
        
            return res.status(200).json({ message : "Sesion iniciada correctamente" , token })

        } catch (error) {
            console.error("Error al iniciar sesion" , error)
        
            res.status(500).json({
                message : "Error interno al iniciar sesion",
                error : error.message
            })
        }
    }
}