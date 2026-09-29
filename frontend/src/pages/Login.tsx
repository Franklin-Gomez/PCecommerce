import { useForm } from "react-hook-form";
import { Link , useNavigate } from "react-router";
import { toast } from "react-toastify";
import { signIn } from "../api/userAPI";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";

type FormData = {
    email : string,
    password : string
}

export const Login = () => {
    
    const navigate = useNavigate()
    const setToken = useAuthStore((state) => state.setToken)

    const { handleSubmit  , reset , register , formState : { errors } } = useForm<FormData>({ defaultValues : {
        email : "",
        password : ""
    }})

    const mutation = useMutation({
        mutationFn : signIn , 

        onSuccess : ( data   ) => { 
            setToken( data.token )
            toast.success("Inicio de sesion exitoso")
            navigate("/")
            reset()
        } , 

        onError : () => { 
            // funcion signIn se encarga de mostrar el error 
            // toast.error( error.message )
            reset()
        }
    })

    const onSubmit = async (data : FormData) => {
        
        // reset no funciona por no haberlo puesto en un try catch
        // const respuesta = await signIn(data);

        // if (!respuesta.token) {
        //     toast.error(respuesta.data.message)
        //     reset({ email: "", password: "" })
        //     return
        // }
        
        // toast.success("Inicio de sesión exitoso");
        // navigate("/", { replace: true });        

        mutation.mutate( data  )
    }
    

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <h2 className="text-2xl text-center font-bold mb-4">Iniciar sesión</h2>

            <div className="flex justify-around items-center gap-4 flex-col md:flex-row ">

                <section className="flex flex-col justify-center items-center w-1/2 max-w-3xl p-9 border-r border-gray-300">

                    <div className="flex justify-center items-center gap-4 w-0 md:w-full p-4 rounded-lg shadow-md"> 

                        <svg className="w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                            <path fill-rule="evenodd" d="M2.25 16.875V5.25h12v7.906H15v-5.28h4.824l1.926 5.05V16.5h-1.937a2.44 2.44 0 0 0-2.375-1.875 2.43 2.43 0 0 0-2.406 2.063H8.594a2.43 2.43 0 0 0-2.406-2.062c-1.28 0-2.336.988-2.43 2.25zm12.78.563H8.594A2.43 2.43 0 0 1 6.188 19.5c-1.152 0-2.117-.797-2.375-1.875H1.5V4.5H15v2.625h5.336L22.5 12.79v4.46h-2.633c-.098 1.262-1.148 2.25-2.43 2.25a2.43 2.43 0 0 1-2.406-2.062zm.72-.375c0 .934.754 1.688 1.688 1.688s1.688-.754 1.688-1.687-.754-1.687-1.687-1.687-1.687.754-1.687 1.688zm-9.562-1.687c.934 0 1.688.754 1.688 1.688S7.12 18.75 6.188 18.75 4.5 17.996 4.5 17.063s.754-1.687 1.688-1.687zM17.625 9.75V12h2.25v.75h-3v-3zm0 0"></path>
                        </svg>

                        <div>
                            <h3 className="text-lg font-semibold">Gestiona tus pedidos</h3>
                            <p className="text-sm text-gray-600">Ten el control de todos tus pedidos y recibe notificaciones con el seguimiento</p>
                        </div>

                    </div>

                    
                    <div className="flex justify-center items-center  gap-4 w-0 md:w-full p-4  rounded-lg shadow-md"> 

                        <svg className="w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24"><path fill-rule="evenodd" d="M12 1.293a7.13 7.13 0 0 0-7.125 7.125A7.13 7.13 0 0 0 12 15.543a7.13 7.13 0 0 0 7.125-7.125A7.13 7.13 0 0 0 12 1.293zM4.125 8.418C4.125 4.07 7.648.543 12 .543s7.875 3.527 7.875 7.875c0 1.84-.63 3.53-1.687 4.87l3.44 7.203-3.81-.422-2.117 3.387-3.328-7.172c-.125.008-.246.008-.37.008s-.246-.004-.37-.008L8.3 23.457 6.188 20.07l-3.816.422 3.44-7.2a7.83 7.83 0 0 1-1.687-4.875zm9.04 7.79c1.75-.258 3.31-1.094 4.488-2.305l2.72 5.69-2.94-.328-1.633 2.617zm-6.816-2.3c1.18 1.21 2.738 2.047 4.488 2.305l-2.633 5.676-1.637-2.617-2.94.328zm7.066-7.047l-1.387-2.867-1.43 2.844-3.148.434 2.258 2.242-.562 3.13 2.828-1.457 2.805 1.5-.512-3.14L16.56 7.34zM11.1 7.53l.922-1.84.895 1.852 2.035.31-1.484 1.426.336 2.027-1.812-.97-1.824.94.363-2.027-1.465-1.445zm0 0"></path></svg>

                        <div>
                            <h3 className="text-lg font-semibold">Gestiona tus pedidos</h3>
                            <p className="text-sm text-gray-600">Ten el control de todos tus pedidos y recibe notificaciones con el seguimiento</p>
                        </div>

                    </div>


                </section>

                <section className="flex flex-col justify-center items-center w-1/2 max-w-3xl p-9">

                    <form 
                        onSubmit={handleSubmit(onSubmit)} 
                        className="flex flex-col justify-center items-center w-full max-w-md p-6 "
                    >

                        <input 
                            type="text" 
                            placeholder="E-mail" 
                            className="mb-4 p-2 border border-gray-300 rounded w-full"
                            {...register("email", { required : "El email es requerido" })} 
                        />
                        
                        {errors.email && <span className="text-white bg-red-500 font-bold text-sm text-center p-2 rounded w-full mb-4">{errors.email.message}</span>}
                        
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="mb-4 p-2 border border-gray-300 rounded w-full"
                            {...register("password", { required : "La contraseña es requerida" })} 
                        />
                        
                        {errors.password && <span className="text-white bg-red-500 font-bold text-sm text-center p-2 rounded w-full mb-4">{errors.password.message}</span>}

                        <button 
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 hover:cursor-pointer"
                            disabled={mutation.isPending}
                        >
                        {/* Iniciar Sesion */}
                        {mutation.isPending ? "Cargando..." : "Iniciar Sesión"} </button>

                    </form>

                    <Link to="/register" className="text-blue-500 hover:underline">¿No tienes una cuenta? Registrate</Link>

                </section>

            </div>

        </div>
    )

}