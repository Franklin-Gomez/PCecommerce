import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

    router.post('/login', UserController.loginUser);
    router.post('/create', UserController.createUser);
    router.get('/usuarios/:userId' , UserController.getUser)
    

export default router;
