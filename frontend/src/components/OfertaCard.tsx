import { useCartStore } from "../store/cartStore"

interface OferCardInterface { 
    imagenUrl : string ;
    id : number ;
    nombre : string ;
    descripcion : string ;
    modelo : string ;
    precioInicial : number ;
    precioFinal : number ; 
    marca : string ;
}

export const OfertaCard = ( { imagenUrl  , id , nombre , descripcion , modelo , precioFinal , precioInicial , marca } : OferCardInterface   ) => {

    const addToCart = useCartStore(( state ) => state.addToCart)

    return (

        <div className="bg-white rounded-lg shadow-md hover:shadow-lg w-full transition-shadow duration-300 flex justify-around items-center flex-col relative ">
                            
            <span className="text-gray-300 bg-red-500 absolute top-1 left-1 text-xs font-bold p-2   ">¡Oferta!</span>

            <img src={`/${imagenUrl}.png`} alt="Oferta 3" className="object-cover rounded-t-lg w-full" />


            <h3 className="text-lg font-semibold mt-2"> { marca } { modelo}</h3>
            
            <p className="text-sm font-semibold mt-2" >{ descripcion }</p>

            <div className="flex gap-2 items-center">
                <p className="text-gray-600 mt-1 text-sm line-through">
                    ${ precioInicial }
                </p>
                <p className="text-red-600 font-semibold">
                    ${ precioFinal }
                </p>
            </div>

            <button
                className=" mt-auto w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition hover:cursor-pointer"
                onClick={() => addToCart({ nombre , precioFinal , descripcion , imagenUrl , modelo })}
            >
                Agregar al Carrito
            </button>

        </div>
    )
}