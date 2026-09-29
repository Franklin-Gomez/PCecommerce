import { Router } from "express"
import { PromocionController } from "../controllers/PromocionController";

const router = Router()
    
    router.post("/create", PromocionController.createPromocion );
    router.get("/promociones", PromocionController.getAllPromocion);
    router.get("/promociones/:promocionId", PromocionController.getOnePromocion);
    // router.get("/promociones/activas", PromocionController.getPromocionesActivas);
    router.patch("/promociones/:promocionId", PromocionController.updatePromocion);
    router.delete("/promociones/:promocionId", PromocionController.deletePromocion);

    router.get("/activas" , PromocionController.getProductsWithPromocion)


export default router    