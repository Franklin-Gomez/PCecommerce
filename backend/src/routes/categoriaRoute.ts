import { Router } from "express"
import { CategoriaController } from "../controllers/CategoriaController"

const router = Router()

    router.post("/create", CategoriaController.createCategoria);
    router.get("/categorias", CategoriaController.getCategorias);
    router.get("/categorias/:categoriaId", CategoriaController.getOneCategoria);
    router.patch("/categorias/:categoriaId", CategoriaController.updateCategoria);

export default router;