import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { ToastContainer } from "react-toastify"

export const ClientDashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">

            <Header />

                <main className="flex-1">
                    <Outlet/>
                </main>

            <Footer/>

            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
                theme="light" 
            />

        </div>
    )
}