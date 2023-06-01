import { Router } from "express";
import { listaproducto, producto_nombre, marca_nombre, tipo_nombre } from "../controllers/indexRoutes.js";

const router = Router();

//Mostrar todos los productos
router.get('/all',listaproducto);

//Mostrar producto por nombre
router.get('/:nombre',producto_nombre);

//Mostrar producto por marca
router.get('/:marca',marca_nombre); 

//Mostrar producto por tipo
router.get('/:tipo',tipo_nombre); 

//Mostrar producto por rango de precio 

//Muestra producto por id 

export default router