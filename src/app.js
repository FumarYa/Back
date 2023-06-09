//Se importan los módulos necesarios.
import express from 'express';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs'; // Importa fs para leer archivos
import productorouter from './routes/producto.routes.js';
import usuariosrouter from './routes/usuarios.routes.js';
import ventasrouter from './routes/ventas.routes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

const __dirname= dirname(fileURLToPath(import.meta.url));
const swaggerPath = join(__dirname, 'swagger', 'swagger.json');
const swaggerDocument = JSON.parse(readFileSync(swaggerPath));

//Declaro variable app para usar todos los métodos de express
const app = express();


//Configurar las variables de entorno
dotenv.config({path:join(__dirname,'./env/.env')})
app.use(bodyParser.json());



//Metodo para la configuracion de la autorizacion con token
const authMiddleware = (req, res, next) => {
    // aquí va la lógica de autorización, por ejemplo:
    const token = req.headers.token;
    if (token === process.env.TOKEN) {
      next();
    } else {
      res.status(401).json({ message: 'La peticion requiere autorización. Revisa si tu aplicación concuerda con la API_KEY' });
    }
  };

  const corsOptions = {
    origin: 'http://localhost:3000', // Reemplaza con el origen de tu aplicación React
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  };
  
  app.use(cors(corsOptions));

app.use('/api/producto',productorouter);
app.use('/api/usuarios',usuariosrouter);
app.use('/api/ventas',ventasrouter);


// Configurar la carpeta Public para contenido estático
app.use(express.static(join(__dirname,'public')));

// Configurar la información de autorización en Swagger
swaggerDocument.securityDefinitions = {
    api_key: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  };

//Llamada a Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Inicio del servidor y conexión a un puerto
const port=process.env.PORT;
app.listen(port);
console.log("El servidor está escuchando en el puerto:",port);