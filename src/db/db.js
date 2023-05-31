//Importar módulos necesario para la conexión
import{createPool} from 'mysql2/promise'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
const __dirname= dirname(fileURLToPath(import.meta.url));

//Configurar variables de entorno
dotenv.config({path:join(__dirname,'../env/.env')});

export const pool= createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

async function connection() {
    try {
      const connection = await pool.getConnection();
      console.log(`Conectado a la base de datos con ID de conexión ${connection.threadId}`);
      connection.release();
    } catch (error) {
      console.error(`Error al conectarse a la base de datos: ${error.stack}`);
    }
  }

  export async function getProducto(id_producto){
    try {
      const result = await pool.query("SELECT * FROM producto WHERE Id = " + id_producto + ";");
      const producto = result[0].map(row => ({
        id: row.Id,
        nombre:row.Nombre,
        marca: row.Marca,
        descripcion: row.Descripcion,
        precio: row.Precio,
        tipo: row.Tipo,
        imagen: row.Imagen
      }));
      return producto;
    } catch (err) {
      console.error("Error executing the query: " + err.stack);
      throw new Error("Unable to retrieve productos");
    }
  }

  try {
    connection();
  } catch (error) {
    console.error(`Error al ejecutar la función connection: ${error.stack}`);
  }