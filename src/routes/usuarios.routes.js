import { Router } from "express";
import { listausuarios, usuario_nombre, usuario_id, usuario_add, usuario_delete } from "../controllers/indexRoutes.js";

const router = Router();

//Mostrar todos los usuarios
router.get("/all", listausuarios) 

//Mostrar cada usuario por nombre
router.get("/nombre/:nombre", usuario_nombre) 

//Mostrar usuario por id 
router.get("/id/:id", usuario_id) 

//Comprueba usuario y contraseña correcto

//Añade nuevo usuario
router.post("/add", usuario_add) 

//Actualiza usuario por id

//Borra un usuario por id
router.delete("/delete", usuario_delete)

//Cambia contraseña usuario

export default router