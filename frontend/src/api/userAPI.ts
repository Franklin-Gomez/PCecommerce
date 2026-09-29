import axios from "axios";
import { toast } from "react-toastify"

interface LoginResponse {
    token : string ,
    message : string
}

export const signIn = async  ( data : { email: string; password: string }) : Promise<LoginResponse> => {

    try {

        const url = `${import.meta.env.VITE_API_URL}auth/login`;

        const response = await axios.post<LoginResponse>( url, data );

        if( response.status === 500 ) {
            throw new Error( response.data.message || 'Error respuesta de la API' );
        }

        //localStorage.setItem('token', response.data.token);

        return response.data
        
        
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
    