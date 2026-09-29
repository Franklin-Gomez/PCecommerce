import { useCartStore } from "../store/cartStore"
import { IoTrashOutline } from "react-icons/io5";

export const Cart = () => {

    const cart = useCartStore((state) => state.cart )
    const updateQuantity = useCartStore((state) => state.updateQuantity )
    const removeFromCart = useCartStore((state) => state.removeFromCart )

    // buena forma de eliminar los elemetos que tengan cantidad igual o menos a 0, pero no es la mejor forma de hacerlo ya que se ejecuta en cada renderizado del componente y no es necesario, asi que lo implementamos en el store
    // if( cart.length > 0 && cart[0]?.quantity <= 0 ) {
    //     removeFromCart(cart[0]?.name)    
    // }

    return (
        <div className="container mx-auto px-6 my-2">
            <p className="text-left text-gray-600  border-b border-gray-300 pb-2 my-8">
                Inicio / Carrito de Compras
            </p>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">

                <main className="flex justify-between items-center  p-4 rounded-md col-span-2">

                    {cart.length === 0 ? (
                        <p className="text-gray-600">Tu carrito está vacío.</p>
                    ) : (

                        <div className="flex flex-col gap-4 w-full px-4 py-2">

                            {cart.map((product, index) => (
                                <div className=" rounded shadow flex px-4 py-2 " key={index}>

                                    <img 
                                        src={`/${ product.imagenUrl }.png`} 
                                        alt="CPU" 
                                        className="w-48 h-48 object-cover rounded-sm" 
                                    />

                                    <div className="p-4 flex-1 max-h-34 overflow-hidden flex flex-col gap-4">
                                        <h3 className="font-bold"> { product.nombre }</h3>
                                        <p className="text-sm text-gray-600 max-h-12">{ product.descripcion }</p>
                                    
                                        <div className="flex gap-2"> 

                                            <div className="flex items-center gap-2">

                                                {  
                                                    product.quantity == 1 ?

                                                        (
                                                            <button
                                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer"
                                                                onClick={() => removeFromCart(product.nombre)}
                                                            >
                                                                <IoTrashOutline />

                                                            </button>
                                                        )    
                                                    :
                                                        (
                                                            <button
                                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer"
                                                                onClick={() => updateQuantity(product.nombre, -1)}
                                                            >
                                                                −
                                                            </button>
                                                    
                                                        )  
                                                
                                                }

                                                <span className="px-4 bg-gray-200">{product.quantity}</span>

                                                <button
                                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 hover:cursor-pointer"
                                                    onClick={() => updateQuantity(product.nombre, +1)}
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <button 
                                                className="text-blue-600 hover:underline hover:cursor-pointer"
                                                onClick={() => removeFromCart(product.nombre)}
                                            >
                                                Eliminar
                                            </button>

                                            <button 
                                                className="text-blue-600 hover:underline"
                                            >
                                                Guardar para después
                                            </button>

                                        </div>

                                    </div>

                                    <div>
                                        <p className="text-lg font-bold">${product.precioFinal}</p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </main>


                <section className=" rounded shadow flex px-4 py-2 flex-col gap-4 h-fit p-8"> 

                    <h2 className="text-lg font-semibold">Total de Productos: {cart.length}</h2>
                    <p className="text-lg font-semibold">
                        Total a Pagar: ${cart.reduce((total, product) => total + ( product.precioFinal * product.quantity), 0).toFixed(2)}
                    </p> 

                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded hover:cursor-pointer transition">
                        Proceder al pago
                    </button>

                </section>
            

            </div>

        </div>
    )
}