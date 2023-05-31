import { pool, getProducto } from '../db/db.js'

//Muestra todas las productos con todos sus datos correspondientes
export const listaproducto = async (req, res) => {
  try {
    const listaproducto = await pool.query(
      "SELECT * from producto"
    );

    const array = listaproducto[0].map(async row => {
      return {
        id: row.Id,
        nombre:row.Nombre,
        marca: row.Marca,
        descripcion: row.Descripcion,
        precio: row.Precio,
        tipo: row.Tipo,
        imagen: row.Imagen
      };
    });

    const resolvedArray = await Promise.all(array);
    res.json(resolvedArray);
  } catch (err) {
    console.error("Error executing the query: " + err.stack);
  }
}