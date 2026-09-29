import { useForm } from "react-hook-form"
import { CiInstagram, CiTwitter } from "react-icons/ci"
import { FaFacebookSquare } from "react-icons/fa"
import { Link } from "react-router"

export const Contacto = () => {

    const { handleSubmit , setError , reset , register , formState : { errors } } = useForm({ defaultValues : {
        nombre : "",
        email : "",
        mensaje : ""
    }})

    const onSubmit = (data : any) => {
        console.log(data)
        reset()
    }

    return (
        <div className="">

            <section className="container mx-auto px-6 my-8">

                <p className="text-left text-gray-600 mb-8 border-b border-gray-300 pb-2">
                    Inicio / Contacto
                </p>

                <h2 className="text-3xl  text-gray-400 font-bold text-center mb-8"> Contactanos </h2>

                <p className="text-center text-md text-gray-400 "> Necesitas ayuda? Contáctanos y te responderemos lo antes posible.</p>

                <div className="grid grid-cols-2 justify-center items-start gap-4 mt-8">

                    <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col gap-4 w-full max-w-md mx-auto">

                        <h3 className="text-2xl text-gray-400 font-semibold col-span-2 border-b border-gray-300 pb-2+ mb-4">Envianos un Mensaje </h3>

                        <div>
                            <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-2">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                {...register("nombre", { required: "El nombre es obligatorio" })}
                                className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none ${errors.nombre ? "border-red-500" : ""}`}
                            />
                            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", { required: "El email es obligatorio" })}
                                className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="mensaje" className="block text-gray-700 font-semibold mb-2">Mensaje</label>
                            <textarea
                                id="mensaje"
                                {...register("mensaje", { required: "El mensaje es obligatorio" })}
                                className={`border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 outline-none resize-none ${errors.mensaje ? "border-red-500" : ""}`}
                            ></textarea>
                            {errors.mensaje && <p className="text-red-500 text-sm mt-1">{errors.mensaje.message}</p>}
                        </div>  

                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors mt-4 hover:shadow-lg hover:shadow-blue-500/50 hover:cursor-pointer"
                        >
                            Enviar
                        </button>

                    </form>

                    <div>

                        <h3 className="text-2xl text-gray-400 font-semibold col-span-2 border-b border-gray-300 pb-2+ mb-4">Información de Contacto</h3>

                        <p className="text-gray-600 mb-2"><span className="font-semibold">Telefono :</span> +1 234 567 890</p>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Email :</span> correo@pccomponentes.com</p>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Dirección :</span> Calle Falsa 123, Florida, Estados Unidos</p>
                        
                        <div className="mt-4">

                            <h4 className="text-lg text-gray-400 font-semibold mb-2">Síguenos en Redes Sociales</h4>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors"><CiTwitter size={32}/></a>
                                <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors"><FaFacebookSquare size={32}/></a>
                                <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors"><CiInstagram size={32}/></a>
                            </div> 
                            
                        </div>

                        <div style={{ width: "100%" }}>
                            <iframe 
                                width="100%" 
                                height="400" 
                                scrolling="no" 
                                style={{ border: "0" }} 
                                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVizdQeh3udy11xDc5Ao2YStR2gLc-rfc&amp;q=centro%20comercial%20paseo&amp;maptype=roadmap&amp;zoom=14">
                            </iframe>
                        </div>

                    </div>

                </div>

            </section>

        </div>
    )
}
