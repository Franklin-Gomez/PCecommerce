import { useNavigate, useParams } from "react-router"
import { getAllProduct } from "../api/productosAPI"
import { useQuery } from "@tanstack/react-query"
import { ProductCard } from "../components/ProductCard"

export const ListCategorias = () => {

    const navigate = useNavigate()
    const { componente } = useParams<string>()
    
    const { data : products  , isLoading, isError  } = useQuery({
        queryKey : ["products"],
        queryFn : getAllProduct,
        staleTime : 1000 * 60 * 5,
        retry : 3 , 
        retryDelay : 1000
    })

    const handleChangeCategoria = ( categoria : string  ) => { 
        navigate(`/categorias/${categoria}`)   
    }

    const FiltroDeComponentes = products?.filter((categorias) => 
        categorias.categoria.nombre == componente
    );

    const showProducts = componente ? FiltroDeComponentes : products
    
    if( isLoading ) return
    if( isError ) return 
    if( !products ) return 
    
    return(
        //Contenedor  de toda la seccion 
        <div className="container mx-auto px-6 my-8">

            <p className="text-left text-gray-600 mb-8 border-b border-gray-300 pb-2">
                Inicio / Categorias / 
            </p>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* <!-- Columna izquierda: filtros --> */}
                <aside className="md:col-span-1 bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-semibold mb-4">Filtros</h2>
                    <form className="space-y-2">
                        <label className="flex items-center"> 
                            <input 
                                type="checkbox" 
                                className="mr-2" 
                                onChange={() => handleChangeCategoria( "Procesadores" )}
                                checked={componente === "Procesadores"}
                            /> Procesadores 
                        </label>

                        <label className="flex items-center">
                            <input 
                                type="checkbox" 
                                className="mr-2" 
                                onChange={() => handleChangeCategoria( "Tarjetas Gráficas" ) }
                                checked={componente === "Tarjetas Gráficas"}
                            /> 
                            Tarjetas Gráficas 
                        </label>

                        <label className="flex items-center"> 
                            <input 
                                type="checkbox" 
                                className="mr-2" 
                                onChange={() => handleChangeCategoria( "Memorias RAM" ) }
                                checked={componente === "Memorias RAM"}
                            /> Memorias RAM 
                        </label>

                        <label className="flex items-center"> 
                            <input 
                                type="checkbox" 
                                className="mr-2" 
                                onChange={() => handleChangeCategoria( "Almacenamiento" ) }
                                checked={componente === "Almacenamiento"}

                            /> Almacenamiento 
                        </label>
                        
                        <label className="flex items-center"> 
                            <input 
                                type="checkbox" 
                                className="mr-2" 
                                onChange={() => handleChangeCategoria( "Motherboard" ) }
                                checked={componente === "Motherboard"}
                            /> Tarjeta Madre 
                        </label>
                        
                        <label className="flex items-center"> 
                            <input 
                                type="checkbox" 
                                className="mr-2" 
                                onChange={() => handleChangeCategoria( "Monitores" ) }
                                checked={componente === "Monitores"}
                            /> Monitores 
                        </label>
                    </form>
                </aside>

                <main className="md:col-span-3">
                    <h2 className="text-lg font-semibold mb-4">Productos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {  
                            showProducts?.map( product => (
                                
                                <div key={product.id}> 
                                
                                    <ProductCard
                                        imagenUrl={product.imagenUrl}
                                        id={product.id}
                                        nombre={product.nombre}
                                        descripcion={product.descripcion}
                                        modelo={product.modelo}
                                        precioInicial={product.precio}
                                        precioFinal={product.precioFinal}
                                        marca={product.marca}
                                    />

                                </div>
                            ))
                        }
                    </div>
                </main>
            </section>

        </div>
    )
}