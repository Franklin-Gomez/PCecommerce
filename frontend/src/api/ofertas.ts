import axios from "axios";
import { toast } from "react-toastify"
import { ProductsSchema } from "../types";

export const getAllOfertas = async () => {

    try {
        
        const url = `${import.meta.env.VITE_API_URL}/promocion/activas`

        const response = await axios.get( url )

        const validateResponse = ProductsSchema.safeParse( response.data )

        if( !validateResponse.success ){
            toast.error( "Error al trerse las ofertas ");
            throw new Error("Error al traer las ofertas ");
        }

        return validateResponse.data

    } catch (error) {
        
        if (axios.isAxiosError(error) && error.response) {

            toast.error(error.response.data.message || "Error en login");
            throw new Error(error.response.data.message || "Error en login");

        } else {

            toast.error("Error inesperado");
            throw error;

        }
    }
    
}