import {pool} from '../db/db.js'

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
export const producto_nombre = (req, res) => { //Se realiza una consulta a la base de datos para obtener los datos del producto cuyo nombre coincide con el valor pasado en el parámetro "nombre"
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

//Saca todos los datos del producto por nombre de la marca
export const marca_nombre = (req, res) => {
  pool.query("SELECT * FROM producto WHERE marca = '" + req.params.marca + "'")
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

//Saca todos los datos del producto por tipo.
export const tipo_nombre = (req, res) => {
  pool.query("SELECT * FROM producto WHERE tipo = '" + req.params.tipo + "'")
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

//Saca todos los datos de los productos por rango de precio.
export const rango_precio = (req, res) => {
  pool.query("SELECT * FROM producto WHERE precio <= '" + req.params.rango + "'")
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

//Saca el producto por nombre
export const producto_id = (req, res) => { 
  pool.query("SELECT * FROM producto WHERE Id = '" + req.params.id + "'") 
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

//////////////////////// Filtrados de Usuarios ////////////////////////
//Saca todos los usuarios con todos sus datos correspondientes
export const listausuarios = async (req, res) => {
  try {
    const listausuarios = await pool.query(
      "SELECT * from usuarios"
    );
    const array = listausuarios[0].map(async row => {
      return {
        id: row.Id,
        nombre:row.Nombre,
        contrasena: row.Contrasena,
        telefono: row.Telefono,
        correo: row.Correo,
        fechanacimiento: row.FechaNacimiento,
        rol: row.rol
      };
    });

    const resolvedArray = await Promise.all(array);
    res.json(resolvedArray);
  } catch (err) {
    console.error("Error executing the query: " + err.stack);
  }
}

//Saca el usuario por nombre
export const usuario_nombre = (req, res) => { //Se realiza una consulta a la base de datos para obtener los datos del producto cuyo nombre coincide con el valor pasado en el parámetro "nombre"
  //Se utiliza el objeto "pool" para ejecutar la consulta
  pool.query("SELECT * FROM usuarios WHERE Nombre = '" + req.params.nombre + "'") //Se ejecuta la consulta y se concatenan los valores de los parámetros para formar la cadena de consulta SQL
    .then(rows => { //Se mapea el resultado obtenido para seleccionar solo los campos que se quieren mostrar en la respuesta
      const array = rows[0].map(row => ({
        //Se asignan los valores de cada columna con las variables de la izquierda 
        id: row.Id,
        nombre:row.Nombre,
        contrasena: row.Contrasena,
        telefono: row.Telefono,
        correo: row.Correo,
        fechanacimiento: row.FechaNacimiento,
        rol: row.rol
      }));
      res.json(array); //Se devuelve la respuesta en formato JSON con la información del producto encontrado
    })
    .catch(err => {
      console.error("Error executing the query: " + err.stack); //Se muestra un mensaje de error si no se pudo ejecutar la consulta correctamente
    });
}

//Saca el ususario por id
export const usuario_id = (req, res) => { //Se realiza una consulta a la base de datos para obtener los datos del producto cuyo nombre coincide con el valor pasado en el parámetro "nombre"
  //Se utiliza el objeto "pool" para ejecutar la consulta
  pool.query("SELECT * FROM usuarios WHERE Id = '" + req.params.id + "'") //Se ejecuta la consulta y se concatenan los valores de los parámetros para formar la cadena de consulta SQL
    .then(rows => { //Se mapea el resultado obtenido para seleccionar solo los campos que se quieren mostrar en la respuesta
      const array = rows[0].map(row => ({
        //Se asignan los valores de cada columna con las variables de la izquierda 
        id: row.Id,
        nombre:row.Nombre,
        contrasena: row.Contrasena,
        telefono: row.Telefono,
        correo: row.Correo,
        fechanacimiento: row.FechaNacimiento,
        rol: row.rol
      }));
      res.json(array); //Se devuelve la respuesta en formato JSON con la información del producto encontrado
    })
    .catch(err => {
      console.error("Error executing the query: " + err.stack); //Se muestra un mensaje de error si no se pudo ejecutar la consulta correctamente
    });
}


// Función que permite realizar una consulta SELECT dinámicamente
function selectFrom(tabla, map) { 
    var query = "SELECT * FROM " + tabla + " WHERE ";
    var index = map.size; 
    map.forEach(function (value, key) {
      query += key + " = " + "'" + value + "' "
      if (index > 1) {
        query += 'AND '
      };
      index--;
    });
    return pool.query(query)
      .then(rows => {
        if (rows[0][0] == null) {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        console.error("Error executing the query: " + err.stack);
      });
}