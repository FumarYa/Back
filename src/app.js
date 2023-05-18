//Se importan los módulos necesarios.
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

//Declaro variable app para usar todos los métodos de express
const app = express();
const __dirname= dirname(fileURLToPath(import.meta.url));

const port = 3000;


//Inicio del servidor y conexión a un puerto
app.listen(port);
console.log("El servidor está escuchando en el puerto:",port);