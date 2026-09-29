import { CiTwitter  } from "react-icons/ci";
import { FaFacebookSquare } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci"

export const Footer = () => {
    return (
        <footer className="bg-gray-400 mt-4">
        
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
        
        </footer>
    )
}