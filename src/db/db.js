//Importar módulos necesario para la conexión
import pkg from 'mysql2/promise.js'; // Utiliza la extensión completa del archivo
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createRequire } from 'module'; // Agrega esta importación

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url); // Agrega esta línea

//Configurar variables de entorno
dotenv.config({ path: join(__dirname, '../env/.env') });

export const pool = pkg.createPool({ // Utiliza `pkg.createPool` en lugar de solo `createPool`
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

async function connection() {
  try {
    const connection = await pool.getConnection();
    console.log(`Conectado a la base de datos con ID de conexión ${connection.threadId}`);
    connection.release();
  } catch (error) {
    console.error(`Error al conectarse a la base de datos: ${error.stack}`);
  }
}

try {
  connection();
} catch (error) {
  console.error(`Error al ejecutar la función connection: ${error.stack}`);
}