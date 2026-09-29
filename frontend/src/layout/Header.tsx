import { Link } from "react-router"
import { BsCart4 } from "react-icons/bs";
import { useCartStore } from "../store/cartStore";
import { CiLogin , CiLogout } from "react-icons/ci";
import { useAuthStore } from "../store/authStore";



export const Header = () => {

    const cart = useCartStore((state) => state.cart )

    const numberOfProduct : number = cart.length

    const token = useAuthStore((state) => state.token)
    const clearToken = useAuthStore((state) => state.clearToken)


    return (
        <header className=" flex justify-between items-center w-full  h-20 container mx-auto px-6 my-2 bg-white border border-gray-400 rounded-md ">
            <div className=" flex items-center">

                <Link
                    to={"/"}
                >
                
                    <img
                        src=" /logo2.png"
                        className="h-24 w-auto"
                        alt="logo Pc Compoonents"
                    />
                </Link>

                </div>

                <nav className="flex justify-evenly items-center gap-8 text-gray-700 font-medium ">

                    <Link to="/"> Inicio </Link>
                    <Link to="/categorias"> Categorias </Link>
                    <Link to="/ofertas"> Ofertas </Link>
                    <Link to="/contacto"> Contacto</Link>
                
                </nav>

                <div className="flex items-center gap-4">

                <div>
                    <input
                    type="text"
                    placeholder="Buscar"
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                <div className="relative text-gray-700 font-semibold hover:text-blue-600 cursor-pointer">

                    <Link to="/cart">

                        <span className="absolute -top-2 -right-2  bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            { numberOfProduct }
                        </span> 

                        <BsCart4 
                            size={24}
                        />

                    </Link>

                </div>

                
                { token ?  
                
                    <button  
                        className="flex text-gray-700 font-semibold hover:text-blue-600 cursor-pointer"
                        onClick={() => clearToken() }
                    >
                        <p className=""> Cerrar Sesion </p>
                        <CiLogout   size={24} className=""/> 
                    </button>
            
                    :

                    <Link to="/login" className="flex text-gray-700 font-semibold hover:text-blue-600 cursor-pointer">
                        <p className=""> Iniciar Sesion </p>
                        <CiLogin size={24} className=""/> 
                    </Link>

                }

                
            </div>

        </header>
    )
}