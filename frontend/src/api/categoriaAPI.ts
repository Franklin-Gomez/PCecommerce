import axios from "axios"

export const createCategorias = async () => {

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


export const getAllCategorias = async () => {
    try {

        const url = `${import.meta.env.VITE_API_URL}categoria/categorias`;

        const response = await axios.get( url );

        if( response.status === 500 ) {
            throw new Error( response.data.message || 'Error respuesta de la API' );
        }
        
        return response.data;
        
    } catch (error) {
        console.log('Error al fetching ', error);
        throw error;
    }
}

