import { Router } from 'express'
import { ProductsController } from '../controllers/ProductsController'

const router = Router()

    router.post('/createProduts' , ProductsController.createProduct);
    router.get("/productos", ProductsController.getAllProduct);
    router.get("/productos/:productoId", ProductsController.getOneProduct);
    router.patch("/productos/:productoId", ProductsController.updateProduct);
    router.delete("/productos/:productoId", ProductsController.deleteProduct);

export default router;