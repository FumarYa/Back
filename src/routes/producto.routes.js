import { Router } from "express";
import { listaproducto, producto_nombre, marca_nombre, tipo_nombre, rango_precio, producto_id, producto_add, producto_delete, producto_update} from "../controllers/indexRoutes.js";

const router = Router();

//Mostrar todos los productos
router.get('/all',listaproducto);

//Mostrar producto por nombre
router.get('/nombre/:nombre',producto_nombre);

//Mostrar producto por marca
router.get('/marca/:marca',marca_nombre); 

//Mostrar producto por tipo
router.get('/tipo/:tipo',tipo_nombre); 

//Mostrar producto por rango de precio 
router.get('/rango/:rango',rango_precio);

//Muestra producto por id 
router.get('/id/:id',producto_id);

//Añade un producto nuevo (para el admin)
router.post('/add',producto_add);

//Elimina un producto (para el admin)
router.delete("/delete/:id", producto_delete)

//Actualiza el producto(para el admin)
router.put("/update/:id", producto_update)

export default router