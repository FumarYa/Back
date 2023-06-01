import { Router } from "express";
import { listausuarios } from "../controllers/indexRoutes.js";

const router = Router();

//Mostrar todos los usuarios
router.get("/all", listausuarios) 

//Mostrar cada usuario por nombre

//Mostrar usuario por id 

//Comprueba usuario y contraseña correcto

//Añade nuevo usuario

//Actualiza usuario por id

//Borra un usuario por id

//Cambia contraseña usuario

export default router