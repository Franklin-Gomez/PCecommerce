import { useQuery } from "@tanstack/react-query"
import { getAllOfertas } from "../api/ofertas"
import { OfertaCard } from "../components/OfertaCard"


export const Ofertas = () => {

    const { data  , isLoading , isPending } = useQuery({
        queryKey : [ "ofertas"],
        queryFn : getAllOfertas,
        retry : 1
    })

    if( isLoading ) return 
    if( isPending ) return 
    if (!data ) return 

    return (

        <div className="">
            
            <section className="container mx-auto px-6 my-8">

                <p className="text-left text-gray-600 mb-8 border-b border-gray-300 pb-2">
                    Inicio / Ofertas
                </p>

                <h2 className="text-3xl  text-gray-400 font-bold text-center mb-8">Nuestras Ofertas</h2>

                {/* <div className="flex justify-center gap-4 mb-10 p-4 border border-gray-300 rounded-lg bg-gray-100">

                    <Link to="/destacadas" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:cursor-pointer hover:text-gray-300">Ofertas Destacadas</Link>
                    <Link to="/todas" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:cursor-pointer hover:text-gray-300">Ver Todas</Link>

                </div> */}

                <div>

                    <div className="rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 w-full bg-[url(/ofertaBanner.png)] bg-center bg-cover h-[30vh]  relative my-4">
                        <div className=" absolute inset-0 bg-black/30  flex flex-col justify-center items-center gap-4 py-4">

                            <h3 className="text-3xl font-semibold mt-2 text-white">Gran Venta de Temporada!</h3>
                            <p className="text-gray-300 mt-1 text-xl">Hasta <span className="font-bold text-2xl">50%</span> de descuento</p>
                            {/* <button className="mt-4 px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors cursor-pointer">Comprar Ahora</button> */}

                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center">
                        
                        {/* <div className="bg-white rounded-lg shadow-md hover:shadow-lg w-lg transition-shadow duration-300 flex justify-around items-center flex-col relative ">

                            <span className="text-gray-300 bg-red-500 absolute top-1 left-1 text-xs font-bold p-2   ">¡Oferta!</span>
                            <img src="/GPU.png" alt="Oferta 2" className="w-full object-cover rounded-t-lg" />
                            <h3 className="text-lg font-semibold mt-2"> Tarjeta Grafica Nvidea RTX 3080Ti</h3>
                            <p className="text-gray-600 mt-1 text-sm"> Antes: $1,500.00 </p>
                            <p className="text-gray-600 mt-1 text-lg font-bold"> Ahora: $1,200.00 </p>

                        </div> */}

                        {/* <div className="bg-white rounded-lg shadow-md hover:shadow-lg w-lg transition-shadow duration-300 flex justify-around items-center flex-col relative ">
                            
                            <span className="text-gray-300 bg-red-500 absolute top-1 left-1 text-xs font-bold p-2   ">¡Oferta!</span>
                            <img src="/CPU.png" alt="Oferta 3" className="w-full object-cover rounded-t-lg" />
                            <h3 className="text-lg font-semibold mt-2"> Procesador Intel Core i9-12900K</h3>
                            <p className="text-gray-600 mt-1 text-sm"> Antes: $800.00 </p>
                            <p className="text-gray-600 mt-1 text-lg font-bold"> Ahora: $600.00 </p>

                        </div> */}

                        { data.map(( producto) => (

                            <OfertaCard
                                imagenUrl={producto.imagenUrl}
                                id={producto.id}
                                nombre={producto.nombre}
                                descripcion={producto.descripcion}
                                modelo={producto.modelo}
                                precioInicial={producto.precio}
                                precioFinal={producto.precioFinal}
                                marca={producto.marca}
                            />

                        ))}

                        
                    </div>

                </div>
            </section>
        </div>
    )
}   