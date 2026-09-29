type Categoriacards = {
    nombre : string , 
    imagenUrl : string
}


export const CategoriaCards = ({ nombre , imagenUrl } : Categoriacards) => { 

    return (
        
        <button 
            className="min-w-62.5 snap-center rounded-lg overflow-hidden shadow-md hover:shadow-lg bg-white hover:cursor-pointer transition transform hover:scale-105"
        >
            <img
                src={`./${imagenUrl}.png`}
                alt="disco duro"
                className="object-cover h-48 w-full"
            />
            
            <p 
                className="text-center mt-2 font-semibold"
            > {nombre} </p>

        </button>

    )

}

