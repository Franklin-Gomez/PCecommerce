import { useCartStore } from "../store/cartStore"

type ProducCard = {
    imagenUrl : string ;
    id : number ;
    nombre : string ;
    descripcion : string ;
    modelo : string ;
    precioInicial : number ;
    precioFinal : number ; 
    marca : string ;
}

export const ProductCard = ({ nombre , precioFinal, precioInicial , descripcion , imagenUrl , modelo , id  } : ProducCard) => {

    const addToCart = useCartStore((state) => state.addToCart )

    console.log( precioFinal == precioInicial )

    return (
        <article className="border  rounded shadow flex flex-col" key={id}>
            
            <img 
                src={`/${ imagenUrl }.png`} 
                alt="CPU" 
                className="w-full h-fit object-cover mb-2" 
            />

            <div className="p-4 flex-1 max-h-34 overflow-hidden ">
                <h3 className="font-bold"> { nombre }</h3>
                <p className="text-sm text-gray-600 max-h-12">{ descripcion }</p>

                { precioFinal == precioInicial ?     
                    <p className=" text-lg font-bold">${ precioFinal }</p>
                    
                    :
                    
                    <div className="flex gap-2 items-center">
                        <p className="text-gray-600 mt-1 text-sm line-through">
                            ${precioInicial}
                        </p>
                        
                        <p className="text-red-600 font-semibold">
                            ${precioFinal}
                        </p>
                    </div>

                }
            </div>

            <button
                className=" mt-auto w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition hover:cursor-pointer"
                onClick={() => addToCart({ nombre , precioFinal , descripcion , imagenUrl , modelo })}
            >
                Agregar al Carrito
            </button>

        </article>
    )
}