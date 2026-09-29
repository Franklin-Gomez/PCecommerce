import { Link } from "react-router";


export const Categorias = () => {
    return (

        <div className="">

            <section className="container mx-auto px-6 my-8">

                <p className="text-left text-gray-600 mb-8 border-b border-gray-300 pb-2">
                    Inicio / Categorias
                </p>

                <h2 className="text-3xl  text-gray-400 font-bold text-center mb-8">Nuestras Categorías</h2>

                <div className="flex justify-center gap-4 mb-10 p-4 border border-gray-300 rounded-lg bg-gray-100">

                    <Link to="/categorias/Procesadores" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:cursor-pointer hover:text-gray-300">CPU</Link>
                    <Link to="/categorias/Tarjetas Gráficas" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:cursor-pointer hover:text-gray-300">GPU</Link>
                    <Link to="/categorias/Memorias RAM" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:cursor-pointer hover:text-gray-300">RAM</Link>
                    <Link to="/categorias/Almacenamiento" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:cursor-pointer hover:text-gray-300">Disco Duro</Link>
                    <Link to="/categorias/Motherboard" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:cursor-pointer hover:text-gray-300">Tarjetas Madres</Link>
                    <Link to="/categorias/Monitores" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:cursor-pointer hover:text-gray-300">Monitores</Link>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    
                    <Link to="/categorias/Procesadores">
                        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                            
                            <img src="/CPUcategoria.png" alt="CPU" className="w-full object-cover rounded-t-lg" />
                            <h3 className="text-lg font-semibold mt-2">Procesadores</h3>
                            <p className="text-gray-600 mt-1">Encuentra los mejores procesadores para tu PC.</p>

                        </div>  
                    </Link>


                    <Link to="/categorias/Tarjetas Gráficas">
                        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">

                            <img src="/GPUcategoria.png" alt="GPU" className="w-full object-cover rounded-t-lg" />
                            <h3 className="text-lg font-semibold mt-2">Tarjetas Gráficas</h3>
                            <p className="text-gray-600 mt-1">Explora nuestra selección de tarjetas gráficas de alto rendimiento.</p>

                        </div>
                    </Link>

                    <Link to="/categorias/Memorias RAM">
                        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">

                            <img src="/RAMcategoria.png" alt="RAM" className="w-full object-cover rounded-t-lg" />
                            <h3 className="text-lg font-semibold mt-2">Memoria RAM</h3>
                            <p className="text-gray-600 mt-1">Mejora el rendimiento de tu PC con nuestra memoria RAM de calidad.</p>

                        </div>
                    </Link>

                    <Link to="/categorias/Almacenamiento">
                        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">   
                    
                            <img src="/DiscoDurocategoria.png" alt="Almacenamiento" className="w-full object-cover rounded-t-lg" />
                            <h3 className="text-lg font-semibold mt-2">Almacenamiento</h3>
                            <p className="text-gray-600 mt-1">Encuentra discos duros y SSDs para tus necesidades de almacenamiento.</p>

                        </div>  
                    </Link>

                    <Link to="/categorias/Motherboard">
                        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">   
                    
                            <img src="/motherboards.png" alt="Fuentes de Poder" className="w-fullobject-cover rounded-t-lg" />
                            <h3 className="text-lg font-semibold mt-2">Tarjetas Madre</h3>
                            <p className="text-gray-600 mt-1">Encuentra las mejores Tarjetas madres para tu equipo.</p>

                        </div>
                    </Link>

                    <Link to="/categorias/Monitores">
                        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">   
                    
                            <img src="/monitores.png" alt="Torres" className="w-full object-cover rounded-t-lg" />
                            <h3 className="text-lg font-semibold mt-2"> Monitores </h3>
                            <p className="text-gray-600 mt-1">Las mejores marcas con los mejores paneles y Hz para disfrutar</p>

                        </div>
                    </Link>
                    
                </div>

            </section>

        </div>

    )
}