//Se importan los módulos necesarios.
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import productorouter from './routes/producto.routes.js';
import usuariosrouter from './routes/usuarios.routes.js';
import dotenv from 'dotenv';

//Declaro variable app para usar todos los métodos de express
const app = express();
const __dirname= dirname(fileURLToPath(import.meta.url));

//Configurar las variables de entorno
dotenv.config({path:join(__dirname,'./env/.env')})


app.use('/api/producto', productorouter);
app.use('/api/usuarios', usuariosrouter);


//Inicio del servidor y conexión a un puerto
const port=process.env.PORT;
app.listen(port);
console.log("El servidor está escuchando en el puerto:",port);