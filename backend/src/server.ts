import dotenv from "dotenv";
dotenv.config();    

import express from "express"; 
import cors from "cors";

import UserRoute from "./routes/userRoute";
import ProducRoute from "./routes/productsRoute"
import promocionRoute from './routes/promocionRoute'
import categoriaRoute from "./routes/categoriaRoute"

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users',  UserRoute );  
app.use('/api/product' , ProducRoute );
app.use('/api/promocion' , promocionRoute );
app.use('/api/categoria' , categoriaRoute );
app.use('/api/auth' , UserRoute );

export default app;
