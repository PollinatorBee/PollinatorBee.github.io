import { db, ref as firestoreRef, get, set, child, update, remove, onValue } from "./firebase-config.js";
import { ref as storageRef, uploadBytes, deleteObject } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js';
import { storage } from './firebase-config.js'; //La instancia de Firebase Storage.

/**
 * Convierte el string alergenos en un array (funcion de utilidad).
 * @param {string} variableAlergenos String con los alergenos.
 * @returns {Array.<string>} Array de strings. 
 */
function parseAlergenos(variableAlergenos) {
  return variableAlergenos.value.split(',').map(item => item.trim());
}

/**
 * Inserta una racion en la base de datos.
 * @param {string} id Id de la racion.
 * @param {string} variableDescripcion Descripcion de la racion.
 * @param {string} variableAlergenos Alergenos de la racion.
 * @param {string} variableMaximo Maximo de unidades por pedido de la racion.
 * @param {string} variablePrecio Precio de la racion.
 * @param {string} variableStock Stock de la racion.
 * @returns {boolean} True o False para saber si se ha insertado con exito. 
 */
async function insertDataRaciones(id, variableDescripcion, variableAlergenos, variablePrecio, variableStock, variableMaximo) {
  try {
      // Transformamos el string con los nombres de los alergenos en un array usando nuestra funcion de utilidad
      const alergenosArray = parseAlergenos(variableAlergenos);
      // Guardamos el resultado booleano de la funcion de utilidad que comprueba que no se repite el id de la racion con otro de la bd
      const doesNotCoincide = await noCoincide(id);

      if (doesNotCoincide) {
          await set(firestoreRef(db, "raciones/" + id.value), {
              descripcion: variableDescripcion.value,
              foto: id.value,
              alergenos: alergenosArray,
              precio: variablePrecio.value,
              stock: variableStock.value,
              pedido_max: variableMaximo.value
          });
          //alert("Datos añadidos");
          return true; // Devuelve true indicando la correcta insercion
      } else {
          return false; // Devuelve false si el row ya existe
      }
  } catch (error) {
      alert("No se han añadido los datos" + error);
      console.error("Error inserting data:", error);
      return false; // Devuelve false en caso de error
  }
}

/**
 * Actualiza todos los datos de una racion a los valores de los parametros dados.
 * @param {File} selectedFile El archivo de imagen seleccionado para la ración (puede ser undefined si no se cambia la imagen).
 * @param {string} id Id de la racion.
 * @param {string} idOriginal Id anterior de la racion (para manejar un posible cambio de id).
 * @param {string} variableDescripcion Descripcion de la racion.
 * @param {string} variableAlergenos Alergenos de la racion.
 * @param {string} variableMaximo Maximo de unidades por pedido de la racion.
 * @param {string} variablePrecio Precio de la racion.
 * @param {string} variableStock Stock de la racion.
 * @returns {Promise} devuelve un objeto Pomise. 
 */
function updateData(selectedFile, id, idOriginal, variableDescripcion, variableAlergenos, variablePrecio, variableStock, variableMaximo) {
  return new Promise((resolve, reject) => { //esto sirve para decirle a raciones_edit.js si hemos terminado el update y puede cambiar de pagina
    // Transformamos el string con los nombres de los alergenos en un array usando nuestra funcion de utilidad
    const alergenosArray = parseAlergenos(variableAlergenos);

    update(firestoreRef(db, "raciones/" + id.value),{ //usamos la funcion update, pasandole la base de datos, el nomnbre de la "tabla" y el valor que tendra el nombre del registro que editaremos
      descripcion: variableDescripcion.value, //le pasamos el nombre de la "columna" y el valor de su elemento
      foto: id.value,
      alergenos: alergenosArray,
      precio: variablePrecio.value,
      stock: variableStock.value,
      pedido_max: variableMaximo.value
      })
      .then(()=>{ //si funciona correctamente...
        //alert("Datos modificados");
        resolve(); // resolvemos la promise cuando la actualizacion se completa con exito
      })
      .catch((error)=>{ //si falla...
        alert("No se han modificado los datos" + error);
        reject(error); // rechazamos el promise si hay un error
      });

      //si hemos cambiado el Id, firebase crea automaticamente un objeto nuevo, asi que eliminamos el viejo
      if (id.value !== idOriginal) {
        deleteDataRaciones(idOriginal);
      }

      if (selectedFile !== undefined) { //si hay foto actualizamos en storage
        //INSERCION DE LA FOTO DE LA RACION EN STORAGE
        // Obtener referencia a la raíz del almacenamiento
        const storageReference = storageRef(storage, id.value); //base de datos de almacenamiento, nombre de la foto (en lugar de selectedFile.name, el nombre propio de la foto, vamos a hacer que el nombre sea la key)
    
        //primero borramos la foto actual en base de datos para añadir la nueva que tendra el mismo nombre (si no existia no pasa nada, el codigo sigue y añade la foto, por eso el upload esta fuera)
        deleteObject(storageReference)
        .then(() => {
            // Borrado completado exitosamente
            console.log('¡Foto borrada exitosamente!');
        }) //no ponemos el catch porque puede no existir la foto y no nos afecta, asi nos evitamos que tire error en consola
    
        //segundo, añadimos la foto del elemento img a la base de datos con el nombre de la racion
        console.log("guardamos la foto ",selectedFile.name, " como ", id.value);
    
        uploadBytes(storageReference, selectedFile) //subimos el archivo de imagen con la referencia creada (database y nombre)
            .then( () =>{
                console.log('Foto subida correctamente: ', id.value);
            })
            .catch( (error) =>{
                console.log('Error al subir la foto');
            }); 
      }
  });
}

/**
 * Comprueba si el id de la racion a insertar coincide con otro en la base de datos independientemente de si es mayuscula o minuscula (funcion de utilidad).
 * @param {string} id Id de la racion.
 * @returns {boolean} True si no coincide, false si coincide. 
 */
//selectAllDataRaciones usa la API de firebase que devuelve un Promise, por eso tenemos que esperar al await 
async function noCoincide(id) {
  try {
      const data = await selectAllDataRaciones();
      // Uso Array.some para comprobar si algun elemento coincide con la condicion
      return !data.some((rowData) => id.value.toLowerCase() === rowData.key.toLowerCase()); //nos aseguramos de que no sea case sensitive
  } catch (error) {
      console.error('Error checking existence:', error);
      return false;
  }
}

/**
 * Selecciona los datos de una racion especifica en la base de datos.
 * @param {string} id Id de la racion.
 * @returns {object} Propiedades y sus valores para el id dado.
 * @throws {Error} Lanza un error si hay algún problema al recuperar los datos de la base de datos. 
 */
function selectData(id) { 
    const dbref = firestoreRef(db);
    return get(child(dbref, "raciones/" + id)).then((snapshot) => {
        if (snapshot.exists()) {
          const rowData = snapshot.val();   
          return {
            descripcion: rowData.descripcion,
            foto: rowData.foto,
            precio: rowData.precio,
            stock: rowData.stock,
          };
        } else {
          throw new Error("No data found");
        }
      }).catch((error) => {
        throw new Error("unsuccessful, error" + error);
      });
}

/**
 * Selecciona todos los datos de todas las raciones.
 * @returns {Array.<object>} Array con todas las raciones, cada una con sus propiedades y valores. 
 * @throws {Error} Lanza un error si hay algún problema al recuperar los datos de la base de datos.
*/
async function selectAllDataRaciones() {
  const dbRef = firestoreRef(db, "raciones/");
  try {
    const snapshot = await get(dbRef); // Uso await para esperar a la operacion asincrona
    const data = [];

    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const rowData = childSnapshot.val();
      data.push({
        key,
        alergenos: rowData.alergenos || "", // Usa un string vacio si rowData.alergenos es undefined
        descripcion: rowData.descripcion || "", // Usa un string vacio si rowData.descripcion es undefined
        foto: rowData.foto || "", // Usa un string vacio si rowData.foto es undefined
        precio: rowData.precio,
        stock: rowData.stock || 0, // Usa 0 si rowData.stock es undefined
        pedido_max: rowData.pedido_max || 0, // Usa 0 si rowData.stock es undefined
      });
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Unsuccessful, error: " + error);
  }
}

/**
 * Elimina el objeto de la base de datos de raciones para el id dado.
 * @param {string} id Id de la Racion.
 */
function deleteDataRaciones(id) {
    remove(firestoreRef(db, "raciones/" + id)) //usamos la funcion remove, pasandole la base de datos, el nomnbre de la "tabla" y el valor que tendra el nombre del registro que borraremos
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
 * Busca asincrónicamente en Firebase Realtime Database.
 * @param {string} query Texto a buscar.
 * @returns {Array.<object>} Un array de objetos que representan las raciones que coinciden con el criterio de búsqueda.
 * @throws {Error} Lanza un error si ocurre un problema durante la búsqueda.
 */
async function searchDataRaciones(query) {
  try {
      query = sanitizeInput(query.toLowerCase());
      const snapshot = await get(firestoreRef(db, '/raciones'));
      const results = [];
      snapshot.forEach((childSnapshot) => {
          const racion = childSnapshot.val();
          racion.key = childSnapshot.key;
          if (
              racion.key.toLocaleLowerCase().includes(query) ||
              racion.descripcion.toLowerCase().includes(query) ||
              racion.precio.toString().includes(query) ||
              racion.stock.toString().includes(query) ||
              racion.pedido_max.toString().includes(query) ||
              buscarEnAlergenos(racion.alergenos, query)
          ) {
              results.push(racion);
          }
      });
      return results;
  } catch (error) {
      console.error('Error searching raciones:', error);
      throw new Error("Unsuccessful, error: " + error);
  }
}

/**
 * Busca en los alergenos del pedido.
 * @param {Array.<string>} alergenos Los alérgenos en los que buscar.
 * @param {string} query Texto a buscar.
 * @returns {boolean} Devuelve true si se encuentra el texto de búsqueda en alguno de los alérgenos, de lo contrario, devuelve false.
 */
function buscarEnAlergenos(alergenos, query) {
  return alergenos.some(alergeno => {
      return (
      alergeno.toLowerCase().includes(query)
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
 * Comprueba que el valor es intiger y no decimal.
 * @param {string} value numero a comparar.
 * @returns {boolean} Devuelve true si es un integer, y false si es un decimal.
 */
function isValidInteger(value) {
  // Expresion regular para comprobar intigers
  const integerPattern = /^\d+$/;
  
  // comprobamos que el valor dado coincide con el patron
  return integerPattern.test(value);
}

/**
 * Comprueba que el valor sea positivo o cero.
 * @param {string} value numero a comparar.
 * @returns {boolean} Devuelve true si es positivo o cero, y false si es negativo.
 */
function esPositivo(value){
  return parseInt(value, 10) >= 0;
}

/**
 * Comprueba que el valor no sea funcionalmente cero, sea decimal o integer.
 * @param {string} value numero a comparar.
 * @returns {boolean} Devuelve true si es cero, y false si no es cero.
 */
function esCero(value){
  return Math.abs(value) < Number.EPSILON;
}

/**
 * Comprueba que el elemento de entrada HTML no tenga un valor vacío.
 * @param {HTMLInputElement} inputElement Elemento de entrada HTML a comparar.
 * @returns {boolean} Devuelve true si tiene valor, y false si es vacío.
 */
function validarInput(inputElement) {
  return inputElement.value.trim() !== "";
}

/**
 * Comprueba que el elemento de entrada HTML variableMaximo no tenga un valor mayor que el del elemento variableStock.
 * @param {HTMLInputElement} variableStock Elemento de entrada HTML del stock.
 * @param {HTMLInputElement} variableMaximo Elemento de entrada HTML del maximo.
 * @returns {boolean} Devuelve true si el maximo no supera a stock, y false si lo supera.
 */
function comprobarMaximo(variableStock, variableMaximo){
  // Tenemos que convertir estos parametros a numero para calcularlos porque javascript toma todo como string aunque el input sea type number
  const stock = Number(variableStock.value);
  const pedidoMax = Number(variableMaximo.value);
  if(pedidoMax > stock){
      console.log("false");
      return false;
  } 
  console.log("true");
  return true;
}

/**
 * Sube una foto seleccionada a Firebase Storage y luego introduce los datos de la nueva ración en la base de datos de Firebase.
 * @param {File} selectedFile El archivo de imagen seleccionado para la ración.
 * @param {HTMLInputElement} id El campo de entrada HTML que contiene el ID de la nueva ración.
 * @param {HTMLInputElement} variableDescripcion El campo de entrada HTML que contiene la descripción de la nueva ración.
 * @param {HTMLInputElement} variableAlergenos El campo de entrada HTML que contiene los alérgenos de la nueva ración.
 * @param {HTMLInputElement} variablePrecio El campo de entrada HTML que contiene el precio de la nueva ración.
 * @param {HTMLInputElement} variableStock El campo de entrada HTML que contiene el stock de la nueva ración.
 * @param {HTMLInputElement} variableMaximo El campo de entrada HTML que contiene el máximo de la nueva ración.
 */
async function introducirDatosFirebase(selectedFile, id, variableDescripcion, variableAlergenos, variablePrecio, variableStock, variableMaximo){ //introducimos la foto si la hay a storage y metemos la nueva racion en firebase

  if (selectedFile !== undefined) { //si hay foto se sube a storage
      //INSERCION DE LA FOTO DE LA RACION EN STORAGE
      // Obtener referencia a la raíz del almacenamiento
      const storageReference = storageRef(storage, id.value); //base de datos de almacenamiento, nombre de la foto (en lugar de selectedFile.name, el nombre propio de la foto, vamos a hacer que el nombre sea la key)

      uploadBytes(storageReference, selectedFile) //subimos el archivo de imagen con la referencia creada (database y nombre)
      .then( () =>{
      })
      .catch( (error) =>{
      }); 
  }

  //INSERCION DE LA RACION EN TABLA RACIONES (independientemente de si hay foto o no)
  try {
      const insertionSuccessful = await insertDataRaciones(id, variableDescripcion, variableAlergenos, variablePrecio, variableStock, variableMaximo);
      if (insertionSuccessful) {
          window.location.href = 'raciones.html'; // cambia de pagina
      } else {
          alert("La fila: " + id.value + " ya existe");
      }
  } catch (error) {
      console.error('Error updating data:', error);
  }
}

/**
 * Actualiza los datos de una ración en Firebase llamando a updateData() y recarga la pagina si es exitoso.
 * @param {File} selectedFile El archivo de imagen seleccionado para la ración (puede ser undefined si no se cambia la imagen).
 * @param {HTMLInputElement} id El campo de entrada HTML que contiene el ID de la ración actualizada.
 * @param {HTMLInputElement} idOriginal El campo de entrada HTML que contiene el ID original de la ración.
 * @param {HTMLInputElement} variableDescripcion El campo de entrada HTML que contiene la descripción actualizada de la ración.
 * @param {HTMLInputElement} variableAlergenos El campo de entrada HTML que contiene los alérgenos actualizados de la ración.
 * @param {HTMLInputElement} variablePrecio El campo de entrada HTML que contiene el precio actualizado de la ración.
 * @param {HTMLInputElement} variableStock El campo de entrada HTML que contiene el stock actualizado de la ración.
 * @param {HTMLInputElement} variableMaximo El campo de entrada HTML que contiene el máximo actualizado de la ración.
 */
async function actualizarDatosFirebase(selectedFile, id, idOriginal, variableDescripcion, variableAlergenos, variablePrecio, variableStock, variableMaximo){

  //EDICION DE LOS DATOS DE LA FILA EN LA TABLA RACIONES
  try {
      console.log(id.value, idOriginal.value, variableDescripcion.value, variableAlergenos.value, variablePrecio.value, variableStock.value, variableMaximo.value);
      await updateData(selectedFile, id, idOriginal, variableDescripcion, variableAlergenos, variablePrecio, variableStock, variableMaximo);

      window.location.href = 'raciones.html'; // cambia de pagina

  } catch (error) {
      console.error('Error updating data:', error);
  }

}

export { insertDataRaciones, selectData, selectAllDataRaciones, updateData, deleteDataRaciones, searchDataRaciones, sanitizeInput, isValidInteger, esPositivo, esCero, validarInput, comprobarMaximo, introducirDatosFirebase, actualizarDatosFirebase };