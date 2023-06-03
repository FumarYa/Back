import { Router } from "express";
import { listaventas, ventas_usuario, ventas_id, ventas_dia, venta_add, venta_update, venta_delete } from "../controllers/indexRoutes.js";

const router = Router();

//Mostrar todas las ventas completadas
router.get("/all", listaventas)

//Mostrar las ventas usuario por nombre
router.get("/nombre/:nombre", ventas_usuario)

//Mostrar ventas usuario por id
router.get("/id/:id", ventas_id)

//Mostrar ventas de un dia
router.get("/dia/:dia", ventas_dia)

//Añade una venta
router.post("/add", venta_add)

//Borra una venta
router.delete("/delete/:id", venta_delete)

//Actuliza estado venta
router.put("/update/:id", venta_update)

export default router