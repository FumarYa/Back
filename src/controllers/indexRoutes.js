import { pool, getProducto } from '../db/db.js'

//////////////////////// Filtrados de Producto ////////////////////////

//Saca todos las productos con todos sus datos correspondientes
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

//Saca el producto por nombre
export const producto_nombre = (req, res) => { //Se realiza una consulta a la base de datos para obtener los datos del producto cuyo nombre coincide con el valor pasado en el parámetro "name"
  //Se utiliza el objeto "pool" para ejecutar la consulta
  pool.query("SELECT * FROM producto WHERE Nombre LIKE '%" + req.params.nombre + "%'") //Se ejecuta la consulta y se concatenan los valores de los parámetros para formar la cadena de consulta SQL
    .then(rows => { //Se mapea el resultado obtenido para seleccionar solo los campos que se quieren mostrar en la respuesta
      const array = rows[0].map(row => ({
        //Se asignan los valores de cada columna con las variables de la izquierda 
        id: row.Id,
        nombre:row.Nombre,
        marca: row.Marca,
        descripcion: row.Descripcion,
        precio: row.Precio,
        tipo: row.Tipo,
        imagen: row.Imagen
      }));
      res.json(array); //Se devuelve la respuesta en formato JSON con la información del producto encontrado
    })
    .catch(err => {
      console.error("Error executing the query: " + err.stack); //Se muestra un mensaje de error si no se pudo ejecutar la consulta correctamente
    });
}