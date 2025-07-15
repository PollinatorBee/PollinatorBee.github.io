import { db, ref, get, set, child, update, remove, onValue } from "./firebase-config.js";

/**
 * Selecciona todos los datos de todos los pedidos y llama a una función de devolución de llamada con los datos actualizados (fetchPedidoData).
 * @param {function} callback La función de devolución de llamada que se llama con los datos actualizados.
 * @throws {Error} Lanza un error si hay algún problema al recuperar los datos de la base de datos.
 */
function selectAllDataPedidos(callback) {
  const dbref = ref(db);

  onValue(child(dbref, "pedidos/"), (snapshot) => {
    const data = [];

    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const rowData = childSnapshot.val();

      // Verifica si el pedido tiene editable false
      if (rowData.editable === false) {
        // Check if rowData.detalles is defined before mapping over it
        const detalles = rowData.detalles ? rowData.detalles.map((detalle) => ({
          racion: detalle.racion,
          cantidad: detalle.cantidad,
          precio: detalle.precio,
        })) : [];

        const pedidoData = {
          key,
          usuario: rowData.usuario,
          detalles,
          fecha_entrega: rowData.fecha_entrega,
          precio_total: rowData.precio_total,
          comentarios: rowData.comentarios || "",
          editable: rowData.editable,
          estado: rowData.estado,
        };

        data.push(pedidoData);
      }
    });

    // Llama al callback con los datos actualizados
    callback(data);
  }, (errorObject) => {
    throw new Error("Unsuccessful, error en funciones -> selectAllDataPedidos" + errorObject.code);
  });
}

/**
 * Selecciona los datos de todos los pedidos.
 * @returns {Promise<Array<object>>} Una promesa que se resuelve con un array de objetos, cada uno representando un pedido con sus propiedades y valores correspondientes.
 * @throws {Error} Lanza un error si hay algún problema al recuperar los datos de la base de datos. 
 */
async function selectAllDataResults(){
  const dbref = ref(db);

  return get(child(dbref, "pedidos/")).then((snapshot) => {
    if (snapshot.exists()) {
      const data = [];

      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const rowData = childSnapshot.val();

        // Check if rowData.detalles is defined before mapping over it
        const detalles = rowData.detalles ? rowData.detalles.map((detalle) => ({
          racion: detalle.racion,
          cantidad: detalle.cantidad,
          precio: detalle.precio,
        })) : [];

        const pedidoData = {
          key,
          usuario: rowData.usuario,
          detalles,
          fecha_entrega: rowData.fecha_entrega,
          precio_total: rowData.precio_total,
          comentarios: rowData.comentarios || "",
          editable: rowData.editable,
          estado: rowData.estado,
        };

        data.push(pedidoData);
      });

      return data;
    } else {
      throw new Error("No data found");
    }
  })
  .catch((error) => {
    throw new Error("Unsuccessful, error en funciones -> selectAllDataPedidos" + error);
  });
}

/**
 * Devuelve los datos de un usuario segun el id dado.
 * @param {string} id Id del usuario.
 * @returns {object} Propiedades y sus valores para el id dado. 
 * @throws {Error} Lanza un error si hay algún problema al recuperar los datos de la base de datos.
 */
function selectDataUsuario(id) {
  const dbref = ref(db);
  return get(child(dbref, "usuarios/" + id)).then((snapshot) => {
      if (snapshot.exists()) {
        const rowData = snapshot.val();
        return {
          apellidos: rowData.apellidos,
          departamento: rowData.departamento,
          email: rowData.email,
          nombre: rowData.nombre,
          telefono: rowData.telefono,
        };
      } else {
        throw new Error("No data found");
      }
    }).catch((error) => {
      throw new Error("unsuccessful, error en funciones -> selectDataUsuario" + error);
    });
}

/**
 * Actualiza la fecha de entrega de un pedido especifico.
 * @param {string} id Id del pedido.
 * @param {string} variablefecha Fecha de entrega nueva.
 * @returns {Promise} devuelve un objeto Pomise. 
 */
function updateDataPedidosFecha(id,variablefecha){
  return new Promise((resolve, reject) =>{
    update(ref(db, "pedidos/"+ id),{
      fecha_entrega : variablefecha
    })
    .then(()=>{//si funciona correctamente...
      alert("Datos modificados");
      resolve();
    })
    .catch((error)=>{
      alert("No se han modificado los datos"+error);
      reject(error);
    });

  });
}

/**
 * Actualiza el estado de un pedido al nuevo estado dado.
 * @param {string} id Id del pedido.
 * @param {string} selectEstado Nuevo estado del pedido.
 * @returns {Promise} devuelve un objeto Pomise. 
 */
function updateDataPedidos(id, selectEstado) {
  return new Promise((resolve, reject) => { //esto sirve para decirle a raciones_edit.js si hemos terminado el update y puede cambiar de pagina
  
    update(ref(db, "pedidos/" + id),{ //usamos la funcion update, pasandole la base de datos, el nomnbre de la "tabla" y el valor que tendra el nombre del registro que editaremos
      estado: selectEstado, //le pasamos el nombre de la "columna" y el valor de su elemento
      })
      .then(()=>{ //si funciona correctamente...
        //alert("Datos modificados");
        resolve(); // Resuelve el promise cuando la actualizacion se completa correctamente
      })
      .catch((error)=>{ //si falla...
        alert("No se han modificado los datos" + error);
        reject(error); // Rechaza el promise si la actualizacion falla
      });

  });
}

/**
 * Elimina el objeto de la base de datos de pedidos para el id dado sobre la tabla dada.
 * @param {string} id Id del Pedido.
 */
function deleteDataPedidos(id) {
    remove(ref(db, "pedidos/" + id)) //usamos la funcion remove, pasandole la base de datos, el nomnbre de la "tabla" y el valor que tendra el nombre del registro que borraremos
    .then(()=>{ //si funciona correctamente...
      //alert("Datos eliminados");

      // recargamos la pagina para regenerar la tabla
      location.reload(); 

    })
    .catch((error)=>{ //si falla...
      alert("No se han eliminado los datos" + error);
    });
}

/**
 * Busca asincrónicamente en Firebase Realtime Database segun el texo dado.
 * @param {string} query Texto a buscar.
 * @returns {Promise} Devuelve un objeto Promise. 
 */
async function searchDataPedidos(query) {
  return new Promise((resolve, reject) => {
      const callback = async (snapshot) => {
          try {
            query = sanitizeInput(query.toLowerCase());
              const results = [];
              const pedidos = snapshot.val();

              for (const pedidoKey in pedidos) {
                  if (pedidos.hasOwnProperty(pedidoKey)) {
                      const pedido = pedidos[pedidoKey];
                      //si el pedido editable es false no se añade.
                      if(pedido.editable == false){
                        pedido.key = pedidoKey;
                        console.log(pedido.usuario);
                        const usuarioInfo = await selectDataUsuario(pedido.usuario);
                        // pedido.usuario = `${usuarioInfo.nombre} ${usuarioInfo.apellidos}`;
                        //se guarda en nombre para que el pedido.usuario no se pise pues en la segunda búsqueda
                        //al poner pedido.usuario por nombre no va por la key del usuario (UxVm...) y va por nombre
                        //por lo que luego no lo puede buscar por key y lo busca por nombre y da fallo.
                        pedido.nombre = `${usuarioInfo.nombre} ${usuarioInfo.apellidos}`;
                        console.log(pedido.usuario);
                        if (
                            pedido.key.toLocaleLowerCase().includes(query) ||
                            pedido.nombre.toLowerCase().includes(query) ||
                            pedido.estado.toLowerCase().includes(query) ||
                            pedido.fecha_entrega.toLowerCase().includes(query) ||
                            pedido.comentarios.toLowerCase().includes(query) ||
                            pedido.precio_total.toString().includes(query) ||
                            buscarEnDetalles(pedido.detalles, query)
                        ) {
                            results.push(pedido);
                            console.log(results);
                        }
                      }
                  }
              }
              // console.log(results);
              resolve(results);  // Resuelve la promesa con los resultados
          } catch (error) {
              console.log('Error obtain pedido info: ' + error);
              reject(error);  // Rechaza la promesa en caso de error
          }
      };

      // Usar onValue con la devolución de llamada y opciones
      onValue(ref(db, '/pedidos'), callback, { onlyOnce: true });
  });
}

/**
 * Busca en los detalles del pedido segun el texto dado.
 * @param {Array.<string>} detalles Detalles del pedido.
 * @param {string} query Texto a buscar.
 * @returns {boolean} Devuelve true si se encuentra al menos un detalle que coincida con el texto dado, de lo contrario, devuelve false. 
 */
function buscarEnDetalles(detalles, query) {
  return detalles.some(detalle => {
      return (
      detalle.racion.toLowerCase().includes(query) ||
      detalle.cantidad.toString().includes(query) ||
      detalle.precio.toString().includes(query)
      );
  });
}

/**
 * Sanitiza el texto de entrada para su uso en cuadros de búsqueda.
 * @param {string} text El texto a sanitizar.
 * @returns {string} El texto sanitizado para su uso seguro en cuadros de búsqueda.
 */
function sanitizeInput(text){
   // Escapar caracteres especiales
   text = text.replace(/&/g, '&amp;')
   .replace(/</g, '&lt;')
   .replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;')
   .replace(/'/g, '&#x27;')
   .replace(/\//g, '&#x2F;');
 return text;
}

/**
 * Envía un correo electrónico al cliente cuando el estado del pedido cambia a "Recoger".
 * @param {string} senderEmail El correo electrónico del remitente.
 * @param {string} recipientEmail El correo electrónico del destinatario.
 * @param {string} idPedido El ID del pedido.
 * @param {string} fecha_entrega La fecha de entrega del pedido.
 */
function sendEmailRecoger(senderEmail, recipientEmail, idPedido, fecha_entrega) {
  console.log("enviando correo");
  console.log(recipientEmail);
  
  // Asunto y cuerpo del email
  const subject = 'Su pedido esta listo';
  const body = `Su pedido con el codigo ${idPedido} esta listo. Ya puede pasar a recogerlo. 
  Pase a recogerlo a las ${fecha_entrega}`;

  // Creando el mailto URI
  const mailtoURI = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&from=${senderEmail}`;

  // Abre el cliente email por defecto con el email pre-hecho
  window.open(mailtoURI, '_self');
}

/**
 * Función para enviar un correo electrónico cuando un pedido cambia a estado "Recogido".
 * @param {string} senderEmail El correo electrónico del remitente.
 * @param {string} recipientEmail El correo electrónico del destinatario.
 * @param {string} idPedido El ID del pedido.
 */
function sendEmailRecogido(senderEmail, recipientEmail, idPedido) {
  console.log("enviando correo");
  
  // Asunto y cuerpo del email
  const subject = 'Su ha sido recogido';
  const body = `Su pedido con el codigo ${idPedido} ha sido recogido.`;

  // Creando el mailto URI
  const mailtoURI = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&from=${senderEmail}`;

  // Abre el cliente email por defecto con el email pre-hecho
  window.open(mailtoURI, '_self');
}

export { selectDataUsuario, selectAllDataPedidos, updateDataPedidos, deleteDataPedidos, searchDataPedidos, updateDataPedidosFecha, selectAllDataResults, sendEmailRecoger, sendEmailRecogido};


