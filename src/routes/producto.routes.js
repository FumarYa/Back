import { Router } from "express";
import { listaproducto } from "../controllers/indexRoutes.js";

const router = Router();

//Mostrar todos los productos
router.get('/all',listaproducto);

//Mostrar producto por nombre

//Mostrar producto por marca 

//Mostrar producto por tipo

//Mostrar producto por rango de precio 

//Muestra producto por id 

export default router