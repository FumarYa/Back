import pkg from "express";
import { listausuarios, usuario_nombre, usuario_id, usuario_add, usuario_delete, usuario_update, usuario_login, contrasena_update } from "../controllers/indexRoutes.js";

const { Router } = pkg;

const router = Router();

//Mostrar todos los usuarios
router.get("/all", listausuarios) 

//Mostrar cada usuario por nombre
router.get("/nombre/:nombre", usuario_nombre) 

//Mostrar usuario por id 
router.get("/id/:id", usuario_id) 

//Comprueba usuario y contraseña correcto
router.post('/login', usuario_login);

//Añade nuevo usuario
router.post("/add", usuario_add) 

//Actualiza usuario por id
router.put("/update/:id", usuario_update)

//Borra un usuario por id
router.delete("/delete/:id", usuario_delete)

//Cambia contraseña usuario
router.put("/update/:id", contrasena_update)

export default router