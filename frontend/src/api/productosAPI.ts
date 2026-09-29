import axios from "axios";
import { ProductsSchema } from "../types";

export const createProducts = async () => {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/mangas/create`;

        const response = await axios.post( url );

        if( response.status === 500 ) {
            throw new Error( response.data.message || 'Error respuesta de la API' );
        }
        
        return response.data;
        
    } catch (error) {

        console.log('Error al fetching ', error);
        throw error;

    }

}

export const getAllProduct = async () => {
   try {

        const url = `${import.meta.env.VITE_API_URL}product/productos`;

        const response = await axios.get( url );

        const product = ProductsSchema.safeParse( response.data )

        if( response.status === 500 ) {
            throw new Error( response.data.message || 'Error respuesta de la API' );
        }

        if( product.error) {
            throw new Error( response.data.message || 'Error respuesta de la API' );

        }
        
        return product.data;
        
    } catch (error) {
        console.log('Error al fetching ', error);
        throw error;
    }

}