import { useQuery } from "@tanstack/react-query";
import { getAllCategorias } from "./api/categoriaAPI";
import { CategoriaCards } from "./components/CategoriaCards";
import type { CategoriasType } from "./types/index";
import { Link } from "react-router";

function App() {

  const { data : categorias  , isLoading, isError  } = useQuery<CategoriasType>({
    queryKey : ["categorias"],
    queryFn : getAllCategorias,
    staleTime : 1000 * 60 * 5,
    retry : 3 , 
    retryDelay : 1000
  })

  if( isLoading ) return
  if( isError ) return 
  if( !categorias ) return 

  return (
    
    <div className="">

      {/* <header className=" flex justify-between items-center w-full  h-20 container mx-auto px-6 my-2 bg-white border border-gray-400 rounded-md ">
        <div className=" flex items-center">
          <img
            src=" /logo2.png"
            className="h-24 w-auto"
            alt="logo Pc Compoonents"
          />

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

          <div className="text-gray-700 font-semibold hover:text-blue-600 cursor-pointer">

            Carrito

          </div>

        </div>

      </header> */}

      {/** Hero section **/}
      <main 
        className=" bg-[url(/public/hero.png)] bg-center bg-cover h-[70vh]  relative my-4"
        
      >
        <div 
          className=" absolute inset-0 bg-black/40  flex flex-col justify-center items-center gap-4 py-4"
        >

          <h1 className=" text-white text-4xl font-bold"> Componentes para tu Pc </h1>
          <p className=" text-white text-sm"> Encuentra los mejores Productos </p>

          <Link
            to={"/categorias" }
            className= "py-3 px-6 mt-6 text-black font-bold bg-white hover:bg-gray-300 transition-colors cursor-pointer rounded-lg shadow-2xs"
          > Comprar Ahora </Link>

        </div>


      </main>

      {/** Productos Destacados **/}
      <section className="container mx-auto px-6 mb-4">

        <h2 className="text-2xl text-gray-700 font-bold my-4 "> Productos Destacados </h2>

        
          <div className="grid grid-cols-4 gap-6 bg-white p-4 rounded-sm ">

            {/** Cards **/}
            <div className="border border-gray-400 rounded-lg">

              <img
                src="/rogstrix.png"
                className="object-cover rounded-t-lg h-48 w-full"
              />

              <div className="flex flex-col justify-center items-center gap-3 p-2 h-32">
                <h3 className="text-center text-sm font-bold"> ASUS ROG Strix RTX 5080   </h3>
                <p className="text-center text-sm"> $ 4'000.000 </p>
              </div>
              
            </div>

            <div className="border border-gray-400 rounded-lg">

              <img
                src="/rtx3080.png"
                className="object-cover rounded-t-lg h-48 w-full"
              />

              <div className="flex flex-col justify-center items-center gap-3 p-2  h-32">
                <h3 className="text-center text-sm font-bold"> RTX 3080 </h3>
                <p className="text-center text-sm"> $ 3'000.000 </p>
              
              </div>
              
            </div>

            <div className="border border-gray-400 rounded-lg">

              <img
                src="/intelcorei7.png"
                className="object-cover rounded-t-lg h-48 w-full"
              />

              <div className="flex flex-col justify-center items-center gap-3 p-2  h-32">
                <h3 className="text-center text-sm font-bold"> Intel Core i7   </h3>
                <p className="text-center text-sm"> $ 2'500.000 </p>
                
              </div>
              
            </div>

            <div className="border border-gray-400 rounded-lg">

              <img
                src="/ssdnvme.png"
                className="object-cover rounded-t-lg h-48 w-full"
              />

              <div className="flex flex-col justify-center items-center gap-3 p-2  h-32">
                <h3 className="text-center text-sm font-bold"> SSD NVMe   </h3>
                <p className="text-center text-sm"> $ 800.000 </p>
               
              </div>
            </div>
        </div>

      </section>

      {/* Categorias */}
      <section
        className="container mx-auto px-6 py-4 mb-4"
      >
        
        <h2 className="text-2xl text-gray-700 font-bold border-b border-gray-300 my-4 pb-2"> Categorias </h2>

        <div className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory px-6 py-2">
          
          { categorias?.map(element => (

            <Link
              to={`/categorias/${element.nombre}`}
              key={element.id}
            >
              <CategoriaCards
                nombre={element.nombre}
                imagenUrl={ element.imagenUrl }
              />
            </Link>

          ))}

          {/* <button 
            className="min-w-62.5 snap-center rounded-lg overflow-hidden shadow-md hover:shadow-lg bg-white"
            >
            <img
              src="./CPUCategoria.png"
              alt="CPUs"
              className="object-cover h-48 w-full"
            />
            <p 
              className="text-center mt-2 font-semibold"
            > CPUs</p>

          </button>

          <button 
            className="min-w-62.5 snap-center rounded-lg overflow-hidden shadow-md hover:shadow-lg bg-white "
          >
            <img
              src="./GPUcategoria.png"
              alt="GPU"
              className="object-cover h-48 w-full"
            />
            <p 
              className="text-center mt-2 font-semibold"
            > GPU </p>

          </button>

          <button 
            className="min-w-62.5 snap-center rounded-lg overflow-hidden shadow-md hover:shadow-lg bg-white "
          >
            <img
              src="./RAMcategoria.png"
              alt="RAM"
              className="object-cover h-48 w-full"
            />
            <p 
              className="text-center mt-2 font-semibold"
            > RAM </p>

          </button>

          <button 
            className="min-w-62.5 snap-center rounded-lg overflow-hidden shadow-md hover:shadow-lg bg-white "
          >
            <img
              src="./DiscoDurocategoria.png"
              alt="disco duro"
              className="object-cover h-48 w-full"
            />
            <p 
              className="text-center mt-2 font-semibold"
            > Disco Duro </p>

          </button>

          <button 
            className="min-w-62.5 snap-center rounded-lg overflow-hidden shadow-md hover:shadow-lg bg-white "
          >
            <img
              src="./PSUcategoria.png"
              alt="CPUs"
              className="object-cover h-48 w-full"
            />
            <p 
              className="text-center mt-2 font-semibold"
            > Fuente de Poder </p>

          </button>

          <button 
            className="min-w-62.5 snap-center rounded-lg overflow-hidden shadow-md hover:shadow-lg bg-white "
          >
            <img
              src="./CASEcategoria.png"
              alt="Cases"
              className="object-cover h-48 w-full"
            />
            <p 
              className="text-center mt-2 font-semibold"
            > Cases </p>

          </button> */}
        
        </div>

      </section>

      <section
        className=" bg-[url(/public/Banner.png)] h-[70hv] bg-center flex items-center justify-center container mx-auto "
      >

        <div className=" w-full bg-black/50 flex flex-col justify-center items-center py-4 ">

          <h2 className="text-4xl fonmt-bold text-white "> Banner Promocional </h2>

          <p className="mt-4 text-lg text-white"> Grandes Ofertas en Targetas Graficas </p>

          <button
            className="mt-6 px-6 py-3 bg-white rounded-lg hover:bg-gray-300 transition-colors ease-in-out hover:cursor-pointer font-medium"
          > Ver Ofertas</button>

        </div>

      </section>

     
      {/* <footer className="bg-gray-400 mt-4">

        <div className="container mx-auto grid grid-cols-3 gap-12 p-2">
          
          <div>
            <p className="font-medium text-lg mb-2 border-b border-white p-2">Enlaces</p>
            <p>Sobre nosotros</p>
            <p>Soporte</p>
            <p>Politicas</p>
          </div>
  
          <div>
            <p className="font-medium text-lg mb-2 border-b border-white p-2">Siguenos</p>
            <div className="flex items-center gap-4">
              <p><CiTwitter size={32}/></p>
              <p><FaFacebookSquare size={32}/></p>
              <p><CiInstagram size={32}/></p>
            </div>
          </div>

          
          <div>
            <p className="font-medium text-lg mb-2 border-b border-white p-2">Contacto</p>
            <p>Email : correo@correo.com</p>
            <p>Telefono : 123-456-7890</p>
          </div>

          </div>

      </footer> */}
  
    </div>
        
   
  )
}

export default App
