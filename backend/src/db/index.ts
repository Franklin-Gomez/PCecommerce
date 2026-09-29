// Forma de hacer la conexión a la base de datos usando pg y TypeScript

import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ecommerce",
    password: "eren0430",
    port: 5433,
});

export default pool;