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
        id:row.Id,
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

//Saca el producto por id
export const producto_id = (req, res) => { 
  pool.query("SELECT * FROM producto WHERE Id = '" + req.params.id + "'") 
    .then(rows => { //Se mapea el resultado obtenido para seleccionar solo los campos que se quieren mostrar en la respuesta
      const array = rows[0].map(row => ({
        //Se asignan los valores de cada columna con las variables de la izquierda 
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

//Añade un nuevo Producto
export const producto_add = (req, res) => { 
  const map = new Map();
  for (let property in req.body) {
    if (property === 'nombre') { // Verifica si el producto ya existe basándose en su nombre
      map.set(property, req.body[property]);
    };
  }

  selectFrom('producto', map)
    .then(resultado => {
      if (!resultado) { 
        pool.execute(`INSERT INTO producto (Nombre, Marca, Descripcion, Precio, Tipo, Imagen) VALUES ('${req.body.nombre}', '${req.body.marca}', '${req.body.descripcion}', ${req.body.precio}, '${req.body.tipo}', '${req.body.imagen}')`)
          .then(rows => {
            res.json("Producto añadido correctamente"); 
          })
          .catch(err => {
            console.error("Error executing the query: " + err.stack); 
          });
      } else {
        res.json("Ya existe un producto con ese nombre"); 
      }
    })
    .catch(error => {
      console.error(error); 
    });
}

//Borra un producto por su id.
export const producto_delete = (req, res) => { 
  const map = new Map();
  map.set('Id', req.params.id); 

  selectFrom('producto', map)
    .then(resultado => {
      if (resultado) { 
        pool.execute("DELETE FROM producto WHERE Id = ?", [req.params.id])
          .then(rows => {
            res.json("Producto borrado correctamente"); 
          })
          .catch(err => {
            console.error("Error executing the query: " + err.stack);
            res.status(500).json({error: 'Error executing the delete query'});
          });
      } else {
        res.json("No existe un producto con ese ID");
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({error: 'Error executing the select query'});
    });
}

// Actualiza el precio de un producto por su id.
export const producto_update = async (req, res) => { 
  const map = new Map();
  const id = Number(req.params.id);

  // Verifica si el Id es un número válido
  if (isNaN(id)) {
    return res.json("El Id proporcionado no es un número válido");
  }

  map.set('Id', id);

  try {
    const productoExiste = await selectFrom('producto', map)

    if (!productoExiste) {
      return res.json("No existe un producto con ese ID");
    }

    // Verifica que todos los campos requeridos estén presentes
    const camposRequeridos = ['nombre', 'marca', 'descripcion', 'precio', 'tipo', 'imagen'];
    for (const campo of camposRequeridos) {
      if (!(campo in req.body)) {
        return res.json(`Falta el campo ${campo} en la petición`);
      }
    }

    await pool.execute(`UPDATE producto SET Nombre = ?, Marca = ?, Descripcion = ?, Precio = ?, Tipo = ?, Imagen = ? WHERE Id = ?`, 
    [req.body.nombre, req.body.marca, req.body.descripcion, req.body.precio, req.body.tipo, req.body.imagen, id])

    res.json("Producto actualizado correctamente");

  } catch (error) {
    console.error("Error executing the query: " + error.stack);
    res.status(500).json("Error interno del servidor.");
  }
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
        rol: row.Rol
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

export const usuario_add = (req, res) => { 
  const map = new Map();
  for (let property in req.body) { // Itera a través de las propiedades del cuerpo de la solicitud y agrega la propiedad 'nombre' al mapa
    if (property === 'nombre') {
      map.set(property, req.body[property]);
    };
  }

  

  selectFrom('usuarios', map) // Llama a la función "selectFrom" que devuelve un booleano con el resultado de la consulta SQL(true / false)
    .then(resultado => {
      if (!resultado) { // Verifica la devolución del metodo
        // Ejecuta una consulta SQL INSERT para agregar un nuevo usuario a la base de datos
        const fechaNacimiento = req.body.fechaNacimiento; // 'YYYY-MM-DD'

        // Convertir la cadena de fecha en partes
        const partes = fechaNacimiento.split("-");

        // Crear un nuevo objeto de fecha a partir de las partes
        // Nota: los meses en JavaScript son de 0 a 11, así que restamos 1 al mes
        const fecha = new Date(partes[0], partes[1] - 1, partes[2]);
          pool.execute(`
          INSERT INTO usuarios (Nombre, Contrasena, Telefono, Correo, FechaNacimiento, Rol) 
          VALUES (?, ?, ?, ?, ?, ?)
          `, [req.body.nombre, req.body.contrasena, req.body.telefono, req.body.correo, fecha, req.body.rol])
          .then(rows => {
            res.json("Usuario añadido correctamente"); // Envía una respuesta JSON con un mensaje de éxito si la consulta INSERT se ejecuta correctamente
          })
          .catch(err => {
            console.error("Error executing the query: " + err.stack); // Si hay un error en la consulta INSERT, registra el error en la consola
          });
      } else {
        res.json("Ya existe un usuario con ese nombre"); // Envía una respuesta JSON con un mensaje de error si ya existe un usuario con el nombre proporcionado
      }
    })
    .catch(error => {
      console.error(error); // Si hay un error en la consulta SELECT, registra el error en la consola
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

//Borra un usuario por su id.
export const usuario_delete = (req, res) => { 
  const map = new Map();

  selectFrom('usuarios', map) // Llama a la función "selectFrom" que devuelve un booleano con el resultado de la consulta SQL(true / false)
    .then(resultado => {
      if (resultado) { // Verifica la devolución del metodo
        // Ejecuta una consulta SQL DELETE para eliminar un usuario de la base de datos
        pool.execute("DELETE FROM usuarios WHERE Id = " +req.params.id)
          .then(rows => {
            res.json("Usuario borrado correctamente"); // Envía una respuesta JSON con un mensaje de éxito si la consulta DELETE se ejecuta correctamente
          })
          .catch(err => {
            console.error("Error executing the query: " + err.stack); // Si hay un error en la consulta DELETE, registra el error en la consola
          });
      } else {
        res.json("No existe un usuario con ese ID"); // Envía una respuesta JSON si no hay usuario con el ID proporcionado
      }
    })
    .catch(error => {
      console.error(error); // Si hay un error en la consulta SELECT, registra el error en la consola
    });
}

// Actualiza un usuario por su id.
export const usuario_update = (req, res) => { 
  const map = new Map();
  map.set('Id', req.params.id); // Obtén el ID desde los parámetros de la solicitud

  selectFrom('usuarios', map) // Llama a la función "selectFrom" que devuelve un booleano con el resultado de la consulta SQL(true / false)
    .then(resultado => {
      if (resultado) { // Verifica la devolución del metodo
        // Ejecuta una consulta SQL UPDATE para actualizar un usuario en la base de datos
        pool.execute("UPDATE usuarios SET Nombre = ? WHERE Id = ?",[req.body.nombre, req.params.id])
          .then(rows => {
            res.json("Usuario actualizado correctamente"); // Envía una respuesta JSON con un mensaje de éxito si la consulta UPDATE se ejecuta correctamente
          })
          .catch(err => {
            console.error("Error executing the query: " + err.stack); // Si hay un error en la consulta UPDATE, registra el error en la consola
          });
      } else {
        res.json("No existe un usuario con ese ID"); // Envía una respuesta JSON si no hay usuario con el ID proporcionado
      }
    })
    .catch(error => {
      console.error(error); // Si hay un error en la consulta SELECT, registra el error en la consola
    });
}

//Metodo para ver si el usuario y contraseña es correcto
export const usuario_login = (req, res) => {
  //Si nos viene el email comprobamos que no exista
  if (req.body.nombre && req.body.contrasena) {
    const map = new Map(); // Crear un nuevo objeto Map vacío
    for (let property in req.body) { // Recorrer las propiedades del cuerpo de la solicitud
      if (property === 'nombre') { // Si la propiedad es 'nombre'
        map.set(property, req.body[property]); // Almacenar el valor de la propiedad en el objeto Map
      }
      if (property === 'contrasena') { // Si la propiedad es 'contrasena'
        map.set(property, req.body[property]); // Almacenar el valor de la propiedad en el objeto Map
      }
    }

    selectFrom('usuarios', map) // Verificar si las credenciales están bien
      .then(resultado => {
        if (resultado) { // Si son correctas las credenciales
          res.json("El Usuario con su contraseña es correcta"); // Enviar una respuesta de éxito al usuario
        } else {
          res.json("El Usuario con su contraseña NO es correcta"); // Enviar una respuesta de error al usuario
        }
      })
      .catch(error => {
        console.error(error); // Imprimir en la consola el error ocurrido al ejecutar la consulta
      });
  } else {
    res.json(`Introduce en los Headers los parámetros email y contraseña`); // Enviar una respuesta de éxito al usuario
  }
};

// Actualiza una contraseña por su id.
export const contrasena_update = (req, res) => { 
  const map = new Map();
  map.set('Id', req.params.id);

  selectFrom('usuarios', map)
    .then(resultado => {
      if (resultado) {
        // Ejecuta una consulta SQL UPDATE para actualizar una contrasena en la base de datos
        pool.execute("UPDATE usuarios SET Contrasena = ? WHERE Id = ?",[req.body.contrasena, req.params.id])
          .then(rows => {
            res.json("Usuario actualizado correctamente"); 
          })
          .catch(err => {
            console.error("Error executing the query: " + err.stack);
          });
      } else {
        res.json("No existe un usuario con ese ID"); // Envía una respuesta JSON si no hay usuario con el ID proporcionado
      }
    })
    .catch(error => {
      console.error(error); 
    });
}

//////////////////////// Filtrados de Ventas ////////////////////////
//Saca todos las ventas con todos sus datos correspondientes
export const listaventas = async (req, res) => {
  try {
    const listaventas = await pool.query(
      "SELECT * from ventas"
    );

    const array = listaventas[0].map(async row => {
      return {
        idusuario: row.Idusuario,
        direccion: row.Direccion,
        municipio: row.Municipio,
        codigopostal: row.Codigopostal,
        fecha: row.Fecha,
        estado: row.Estado,
        total: row.Total
      };
    });

    const resolvedArray = await Promise.all(array);
    res.json(resolvedArray);
  } catch (err) {
    console.error("Error executing the query: " + err.stack);
  }
}

//Sacas las ventas de un usuario filtrado por el nombre.
export const ventas_usuario = async (req, res) => {
  try {
    const nombreusuario = req.params.nombre;  // Asume que el nombre de usuario viene en los parámetros de la solicitud
    const ventas_usuario = await pool.query(
      "SELECT ventas.* FROM ventas INNER JOIN usuarios ON ventas.IdUsuario = usuarios.Id WHERE usuarios.Nombre = ?", [nombreusuario]
    );

    const array = ventas_usuario[0].map(async row => {
      return {
        idusuario: row.IdUsuario,
        direccion: row.Direccion,
        municipio: row.Municipio,
        codigopostal: row.CodigoPostal,
        fecha: row.Fecha,
        estado: row.Estado,
        total: row.Total
      };
    });

    const resolvedArray = await Promise.all(array);
    res.json(resolvedArray);
  } catch (err) {
    console.error("Error executing the query: " + err.stack);
  }
}

//Sacas las ventas de un usuario filtrado por el id.
export const ventas_id = async (req, res) => {
  try {
      // Asume que el nombre de usuario viene en los parámetros de la solicitud
    const ventas_id = await pool.query(
      "SELECT * FROM ventas WHERE IdUsuario ="+req.params.id);

    const array = ventas_id[0].map(async row => {
      return {
        idusuario: row.IdUsuario,
        direccion: row.Direccion,
        municipio: row.Municipio,
        codigopostal: row.CodigoPostal,
        fecha: row.Fecha,
        estado: row.Estado,
        total: row.Total
      };
    });
    const resolvedArray = await Promise.all(array);
    res.json(resolvedArray);
  } catch (err) {
    console.error("Error executing the query: " + err.stack);
  }
}

//Saca las ventas de un mismo dia.
export const ventas_dia = async (req, res) => {
  try {
    let dia = req.params.dia;  // Asume que la fecha viene en los parámetros de la solicitud en el formato 'DD/MM/AAAA'
    dia = dia.split("-").reverse().join("-");   // Convierte la fecha al formato 'AAAA-MM-DD'
    const ventas_dia = await pool.query(
      "SELECT * FROM ventas WHERE DATE(Fecha) = ?", [dia]
    );

    const array = ventas_dia[0].map(async row => {
      return {
        idusuario: row.IdUsuario,
        direccion: row.Direccion,
        municipio: row.Municipio,
        codigopostal: row.CodigoPostal,
        fecha: row.Fecha,
        estado: row.Estado,
        total: row.Total
      };
    });

    const resolvedArray = await Promise.all(array);
    res.json(resolvedArray);
  } catch (err) {
    console.error("Error executing the query: " + err.stack);
  }
}

export const venta_add = async (req, res) => {
  try {
    const { idUsuario, direccion, municipio, codigoPostal, fecha, estado, total, productos } = req.body;
    
    const fechaFormat = fecha.split("-").reverse().join("-");

    const ventaResult = await pool.query(
      "INSERT INTO ventas (IdUsuario, Direccion, Municipio, CodigoPostal, Fecha, Estado, Total) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [idUsuario, direccion, municipio, codigoPostal, fechaFormat, estado, total]
    );
    
    const idVenta = ventaResult[0].insertId; 

    // Para cada producto en el array de productos, inserta un nuevo registro en la tabla detalleventa.
    for (const producto of productos) {
      const productoResult = await pool.query(
        "SELECT Precio FROM producto WHERE Id = ?",
        [producto.idProducto]
      );
       
      if (productoResult.length > 0 && productoResult[0][0].Precio !== null) {
        const precioUnitario = productoResult[0][0].Precio;
        await pool.query(
          "INSERT INTO detalleventa (IdVenta, IdProducto, Cantidad, PrecioUnitario) VALUES (?, ?, ?, ?)",
          [idVenta, producto.idProducto, producto.cantidad, precioUnitario]
        );
      } else {
        console.error("Error: No se pudo obtener el precio del producto");
      }
    }

    res.json({
      message: 'Venta añadida',
      body: {
        venta: {idUsuario, direccion, municipio, codigoPostal, fecha, estado, total},
        productos
      }
    });
  } catch (err) {
    console.error("Error executing the query: " + err.stack);
  }
}

//Actualiza el estado de una venta para cuando haga la compra.
export const venta_update = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const result = await pool.query(
      "UPDATE ventas SET Estado = ? WHERE Id = ?", 
      [estado, id]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Venta con id ${id} ha sido actualizada correctamente.` });
    } else {
      res.status(404).json({ message: `Venta con id ${id} no se encontró.` });
    }
  } catch (err) {
    console.error("Error executing the query: " + err.stack);
    res.status(500).json({ message: "Error al actualizar la venta." });
  }
};

export const venta_delete = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM ventas WHERE Id = ?", 
      [id]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Venta con id ${id} ha sido eliminada correctamente.` });
    } else {
      res.status(404).json({ message: `Venta con id ${id} no se encontró.` });
    }
  } catch (err) {
    console.error("Error executing the query: " + err.stack);
    res.status(500).json({ message: "Error al eliminar la venta." });
  }
};

// Función que permite realizar una consulta SELECT dinámicamente
function selectFrom(tabla, map) { 
  var query = "SELECT * FROM " + tabla + " WHERE ";
  var index = map.size; 
  map.forEach(function (value, key) {
    query += key + " = " + "'" + value + "' ";
    if (index > 1) {
      query += 'AND ';
    };
    index--;
  });
  query = query.trim();  // Elimina el espacio en blanco final
  if (query.slice(-3).toLowerCase() === 'and') {  // Si la consulta termina con 'AND'
    query = query.slice(0, -3);  // Elimina el 'AND' final
  }
  return pool.query(query)
      .then(rows => {
        if (rows[0][0] == null) {// Si la consulta no encontró resultados, se retorna false
          return false;
        } else {// Si la consulta encontró resultados, se retorna true
          return true;
      }
      })
      .catch(err => {
        console.error("Error executing the query: " + err.stack);
      });
}