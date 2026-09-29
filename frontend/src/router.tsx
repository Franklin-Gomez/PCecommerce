import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import { Categorias } from './pages/Categorias';
import { Ofertas } from './pages/Ofertas';
import { Contacto } from './pages/Contacto';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ListCategorias } from './pages/ListCategorias';
import { ClientDashboard } from './layout/ClientDashboard';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoutes';
import { CheckoutPage } from './pages/CheckoutPage';

const queryClient = new QueryClient()

export default function Router() { 

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>

                    <Route element={ <ClientDashboard/>}>

                        <Route index path="/" element={<App />} />
                        <Route path="/categorias" element={<Categorias />} />
                        <Route path="/ofertas" element={<Ofertas />} />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path='/login' element={<Login/>}/>

                        <Route path='/categorias/:componente' element={<ListCategorias/>}/>   


                        <Route path='/checkout' element={<PrivateRoute> <CheckoutPage/> </PrivateRoute>}/>

                    </Route>                    
                    
                </Routes>

            </BrowserRouter>
        </QueryClientProvider>
    )
}