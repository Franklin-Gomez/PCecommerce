import { toast } from "react-toastify";
import { create } from "zustand"
import { persist } from "zustand/middleware"

type Product = { 
    nombre : string;
    precioFinal : number;
    descripcion : string;
    imagenUrl : string;
    modelo : string;
}

type CartItem = Product & { quantity : number };

type CartState = {
    cart : CartItem[];
    addToCart : ( product : Product  ) => void;
    removeFromCart : ( modelo : string ) => void;
    // clearCart : () => void;
    updateQuantity : ( name : string, quantity : number ) => void;
}


export const useCartStore = create(
        
    persist<CartState>(
    
        (set) => ({
    
    
            cart: [],

            addToCart: ( product ) => 
                set((state) => { 

                    // revizamos si ya esta agregado anteriormente 
                    const existing = state.cart.find((item) => item.nombre === product.nombre );

                    // si existe añadimos la cantidad
                    if ( existing ) {
                        return {
                            // recorremos el array y si hay un elemento que ya tenemos anteriormente le añadimos la cantidad
                            cart : state.cart.map((item) => item.nombre == product.nombre 
                                // si ya existe en el cart le agregamos la cantidad 
                                ? {...item, quantity: item.quantity + 1 }
                                : 
                                // no se encuentra no le agregamos la cantidad si no que agregamos el nuevo elemento 
                                item
                            ) 
                        }
                    }

                    toast.success(`${product.nombre} agregado al carrito`)

                    //  sino existe en el cart entonces lo agregamos en el cart  
                    return { cart : [...state.cart , { ...product, quantity: 1 }] }
                    
                }
            ), 

            removeFromCart: ( name ) =>
                set((state) => {
                    toast.error(`${name} eliminado del carrito`)
                    // devolvemos todos los elementos que no sean el que vamos a eliminar , creando un nuevo array sin el elemento que queremos eliminar
                    return { cart : state.cart.filter((item) => item.nombre !== name ) }
                }),

            updateQuantity: ( name, quantity ) =>
                set((state) => ({
                    cart : state.cart.map((item) => item.nombre === name // encontramos el elemento que queremos actualizar la cantidad
                        ? { ...item, quantity: quantity + item.quantity }  // si encontramos el elemento le agregamos la cantidad y actualizamos la cantidad
                        : item // si no encontramos el elemento lo dejamos igual
                    )
                    .filter((item) => item.quantity > 0 ) // eliminamos los elementos que tengan cantidad igual o menor a 0++
                })),
        }),
        
        {
            name: "cart-storage", // clave en localStorage
        }
    )
)