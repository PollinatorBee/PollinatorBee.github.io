//FUNCIONES IMPORTADAS
import { selectDataUsuario, selectAllDataPedidos, updateDataPedidos, deleteDataPedidos, searchDataPedidos, sendEmailRecoger, sendEmailRecogido } from "./functions-pedidos.js";

// DECLARACIÓN DE VARIABLES
let mostrarHistorico = document.getElementById("mostrarHistorico");
let noMostrarHistorico = document.getElementById("noMostrarHistorico");

let tableHistorico = document.getElementById("pedidosTableHistorico");
let table = document.getElementById("pedidosTable");

let from = "cocinaApp.admin@gmail.com";


// Carga los datos de la base de datos al iniciar la página
document.addEventListener("DOMContentLoaded", async function () {
  let data; //variable para guardar los datos a mostrar
  
    try {
    // Obtenemos lo que ponemos en el search
    const query = document.getElementById('query');
    // Para que siempre arranque con el search seleccionado
    if(query) query.focus();

    // Función de devolución de llamada para actualizar la interfaz de usuario
    const updateUI = async (newData) => {
      data = newData; // Actualiza la variable data con los nuevos datos
      await pintarDatos(data);
    };

    // Cada vez que haya cambios en la base de datos, se actualizará la interfaz de usuario
    selectAllDataPedidos(updateUI);

      // Aquí cada vez que se vaya escribiendo en el campo de búsqueda
      query.addEventListener('input', async function() {
        try {
          let newData; // Declara la variable newData en el ámbito de la función de devolución de llamada del evento input
            // Hacer location reload porque sino al borrar rápidamente se quedan varios ítems repetidos
          if (query.value !== '' || query.value === null) {
            newData = await searchDataPedidos(query.value);
          } else {
            location.reload();
          } 
          // Poner en la tabla
          await pintarDatos(newData || data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
      });
    } catch (error) {
      alert(error.message);
    }

    
    if (mostrarHistorico) {
      mostrarHistorico.addEventListener("click", mostrarHistoricoFunction);
    }

    if (noMostrarHistorico){
      noMostrarHistorico.addEventListener("click", ocultarHistoricoFunction);
    }

  });


/**
 * Obtiene información del usuario desde la base de datos.
 * @param {string} usuario El nombre de usuario del usuario del cual se obtendrá la información.
 * @returns {Promise<Object>} Una promesa que se resuelve en los datos del usuario.
 */
async function obtenerInformacionUsuario(usuario) {
  // Obtiene los datos del usuario de la base de datos
  const data = await selectDataUsuario(usuario);
  
  // Devuelve los datos del usuario
  return data;
}


/**
 * Muestra u oculta el historial de pedidos al hacer clic en el botón correspondiente.
 */
function mostrarHistoricoFunction() {
  console.log("Mostrando/ocultando historial de pedidos");
  
  // Cambia la visibilidad del historial de pedidos
  if (tableHistorico.style.display === "none") { 
    tableHistorico.style.display = ""; // Establece el estilo a "" para mostrar la tabla
    console.log(tableHistorico.style.display);
    cambiarEstiloBoton(true); // Cambia el estilo del botón para indicar que está activo
  } else {
    tableHistorico.style.display = "none"; // Oculta la tabla de historial de pedidos
    console.log(tableHistorico.style.display);
    cambiarEstiloBoton(false); // Cambia el estilo del botón para indicar que está inactivo
  }

  // Oculta la tabla de pedidos activos si está visible, y viceversa
  if (table.style.display === "" || table.style.display === "table") {
    table.style.display = "none"; // Oculta la tabla si está visible
  } else {
    table.style.display = ""; // Muestra la tabla si está oculta
  }
}
 

/**
 * Oculta el historial de pedidos cuando se hace clic en el botón "X" junto a él.
 */
function ocultarHistoricoFunction() {
  // Muestra un mensaje en la consola indicando que se está ocultando el historial
  console.log("Ocultando historial");

  // Si la tabla del historial está visible, la oculta y cambia el estilo del botón asociado
  if (tableHistorico.style.display === "") {
    tableHistorico.style.display = "none";
    console.log(tableHistorico.style.display); // Muestra el nuevo estado de visualización en la consola
    cambiarEstiloBoton(false); // Cambia el estilo del botón asociado para reflejar el cambio en la visualización
  }

  // Si la tabla principal está oculta, la muestra
  if (table.style.display === "none") {
    table.style.display = "";
  }
}


/**
 * Cambia el estilo de los botones de mostrar y ocultar histórico.
 * @param {boolean} bool Booleano que indica si se debe mostrar o no el histórico.
 */
function cambiarEstiloBoton(bool) {
  // Si bool es true, oculta el botón de mostrar histórico y muestra el botón de no mostrar histórico
  if (bool === true) {
    mostrarHistorico.style.display = "none";
    noMostrarHistorico.style.display = "inline-block";
  }
  // Si bool es false, oculta el botón de no mostrar histórico y muestra el botón de mostrar histórico
  else if (bool === false) {
    noMostrarHistorico.style.display = "none";
    mostrarHistorico.style.display = "inline-block";
  }
}


/**
 * Ordena los pedidos en función de su estado.
 * @param {Array<Object>} data El array de objetos que contiene los pedidos a ordenar.
 * @returns {Array<Object>} El array de objetos de pedidos ordenados.
 */
function ordenarPedidos(data) {
  // Ordena el array de pedidos
  data.sort((a, b) => {
    // Si el primer pedido está en estado "preparar" y el segundo no, el primero se coloca antes en el orden
    if (a.estado === 'preparar' && b.estado !== 'preparar') {
      return -1;
    // Si el segundo pedido está en estado "preparar" y el primero no, el segundo se coloca antes en el orden
    } else if (a.estado !== 'preparar' && b.estado === 'preparar') {
      return 1;
    }
    // Si ambos pedidos están en estado "preparar", el orden se mantiene
    return 0;
  });

  // Devuelve el array de pedidos ordenados
  return data;
}


/**
 * Prepara los datos para mostrarlos en las tablas de pedidos y pedidos históricos.
 * @param {Array<Object>} data Los datos de los pedidos.
 */
async function pintarDatos(data) {
  // Ordena los datos para mostrar primero los pedidos por preparar y luego los pedidos recogidos
  data = ordenarPedidos(data);

  // Filtra los datos para obtener solo los pedidos recogidos y crear un array separado para el historial
  const historicoData = data.filter(obj => obj.estado === 'recogido');
  data = data.filter(obj => obj.estado !== 'recogido');

  // Rellena la tabla de pedidos con los datos preparados
  rellenarTablas("pedidosTable", data, true);

  // Rellena la tabla de pedidos históricos con los datos preparados
  rellenarTablas("pedidosTableHistorico", historicoData, false);
}

/**
 * Aplica estilos a una fila en función del valor de estado proporcionado.
 * @param {HTMLElement} row El elemento de fila al que se aplicarán los estilos.
 * @param {string} estadoValue El valor del estado que determina los estilos a aplicar.
 */
function setRowStyles(row, estadoValue) {
  // Elimina las clases de estilo actuales del elemento de fila
  row.classList.remove('custom-opacity-bg-preparar-pedido', 'custom-opacity-bg-recoger-pedido', 'custom-opacity-bg-pedido-recogido');

  // Agrega la clase de estilo correspondiente según el valor de estado
  if (estadoValue === 'preparar') {
    row.classList.add('custom-opacity-bg-preparar-pedido');
  } else if (estadoValue === 'recoger') {
    row.classList.add('custom-opacity-bg-recoger-pedido');
  } else if (estadoValue === 'recogido') {
    row.classList.add('custom-opacity-bg-pedido-recogido');
  }
}



/**
 * Rellena la tabla con los datos proporcionados.
 * @param {string} tablaId El ID de la tabla donde se van a rellenar los datos.
 * @param {Array<Object>} data Los datos a insertar en la tabla.
 * @param {boolean} mostrarBotonEditable Indica si se debe mostrar el botón de edición.
 */
async function rellenarTablas(tablaId, data, mostrarBotonEditable) {
  // Obtiene la referencia a la tabla
  const table = document.getElementById(tablaId);
  const tbody = table.getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; // Limpia el cuerpo de la tabla

  // Itera sobre los datos y actualiza la tabla con cada registro
  for (const [index, rowData] of data.entries()) {
    // Crea una fila si el pedido no es editable
    if (rowData.editable === false) {
      // Crea una fila
      const row = tbody.insertRow();

      // Inserta celdas
      const columnaNumero = row.insertCell(0);
      columnaNumero.style.borderTop = "1px solid #333333";
      columnaNumero.style.fontWeight = "bold"; // La primera columna tiene el texto en negrita
      const columnaUsuario = row.insertCell(1);
      columnaUsuario.style.borderTop = "1px solid #333333";
      const columnaDetalles = row.insertCell(2);
      columnaDetalles.style.borderTop = "1px solid #333333";
      const columnaComentarios = row.insertCell(3);
      columnaComentarios.style.borderTop = "1px solid #333333";
      const columnaFechaR = row.insertCell(4);
      columnaFechaR.style.borderTop = "1px solid #333333";
      const columnaPrecioTotal = row.insertCell(5);
      columnaPrecioTotal.style.borderTop = "1px solid #333333";
      const columnaEstado = row.insertCell(6);
      columnaEstado.style.borderTop = "1px solid #333333";
      const columnaAcciones = row.insertCell(7);
      columnaAcciones.style.borderTop = "1px solid #333333";

      // Inserta contenido en las celdas
      columnaNumero.textContent = rowData.key;

      // Obtiene la información del usuario
      const usuarios = await obtenerInformacionUsuario(rowData.usuario);

      // Crea un enlace para el usuario
      const link = document.createElement("a");
      link.href = `../pages/datos.html?usuario=${rowData.usuario}`;
      link.className = "btn btn-link";
      link.textContent = usuarios.nombre + " " + usuarios.apellidos;
      columnaUsuario.appendChild(link);

      // Inserta detalles de la orden
      columnaDetalles.innerHTML = rowData.detalles.map(detalle => `<b>${detalle.racion}</b> </br>&emsp;cantidad: <b>${detalle.cantidad}</b> </br>&emsp;precio: <b>${detalle.precio.toFixed(2)} €</b>`).join('<br>');
      columnaComentarios.textContent = rowData.comentarios || '';
      columnaFechaR.textContent = rowData.fecha_entrega;
      columnaPrecioTotal.textContent = `${rowData.precio_total.toFixed(2)}€`;

      // Centra el contenido de las celdas
      columnaUsuario.style.textAlign = 'center';
      columnaComentarios.style.textAlign = 'center';
      columnaFechaR.style.textAlign = 'center';

      // Crea un elemento select para el estado
      const selectEstado = document.createElement('select');
      selectEstado.className = 'custom-select fixed-width-select';

      // Crea un option para ocultar el valor del email del usuario
      const hiddenOption = document.createElement('option');
      hiddenOption.value = usuarios.email;
      hiddenOption.style.display = 'none';
      hiddenOption.disabled = true;
      hiddenOption.hidden = true;
      selectEstado.appendChild(hiddenOption);

      // Define las opciones del select
      let options = [];
      if (rowData.estado == 'preparar') {
        options = ['preparar', 'recoger'];
      } else if (rowData.estado == 'recogido') {
        options = ['recoger', 'recogido'];
      } else {
        options = ['preparar', 'recoger', 'recogido'];
      }

      // Crea un option por cada elemento en options
      options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option.charAt(0).toUpperCase() + option.slice(1);
        optionElement.selected = option === rowData.estado;
        selectEstado.appendChild(optionElement);
      });

      // Añade un evento al cambiar el selectEstado
      selectEstado.addEventListener('change', async function () {
        setRowStyles(row, selectEstado.value);

        // Muestra un mensaje de confirmación antes de editar los datos en Firebase
        let userResponse;
        if (selectEstado.value == 'recoger') {
          userResponse = confirm("¿Cambiar el estado de este pedido? Se enviará un correo notificando al cliente");
        } else {
          userResponse = confirm("¿Cambiar el estado de este pedido?");
        }

        // Si el usuario confirma, edita los datos en Firebase
        if (userResponse) {
          try {
            await updateDataPedidos(rowData.key, selectEstado.value);
            if (selectEstado.value == 'recoger') {
              sendEmailRecoger(from, selectEstado.options[0].value, rowData.key, rowData.fecha_entrega);
            } else if (selectEstado.value == 'recogido') {
              sendEmailRecogido(from, selectEstado.options[0].value, rowData.key);
            }
            location.reload();
          } catch (error) {
            console.error('Error updating data:', error);
          }
        } else {
          location.reload(); // Recarga la página para deshacer los cambios
        }
      });

      // Aplica estilos a la fila
      setRowStyles(row, selectEstado.value);

      // Añade el selectEstado a la columnaEstado
      columnaEstado.appendChild(selectEstado);

      // Crea botones para editar y borrar
      const editButton = document.createElement('a');
      editButton.href = `../pages/pedidos_edit.html?key=${rowData.key}&usuario=${rowData.usuario}&detalles=${JSON.stringify(rowData.detalles)}&comentarios=${rowData.comentarios || 'ninguno'}&fecha=${rowData.fecha_entrega}&precio=${rowData.precio_total}&estado=${rowData.estado}&correo=${usuarios.email}`;
      editButton.className = 'btn btn-sm btn-outline-primary';
      editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';

      const deleteButton = document.createElement('a');
      deleteButton.className = 'btn btn-sm btn-outline-danger';
      deleteButton.innerHTML = '<i class="bi bi-trash"></i>';

      // Añade eventos para editar y borrar
      editButton.addEventListener("click", () => handleEdit(rowData.key));
      deleteButton.addEventListener("click", () => {
        let userResponse = confirm("¿Desea borrar este pedido?");
        if (userResponse) {
          deleteDataPedidos(rowData.key);
        }
      });

      // Crea un contenedor para los botones y los añade
      const buttonsAcciones = document.createElement('div');
      buttonsAcciones.className = 'd-flex justify-content-center';
      if (mostrarBotonEditable) {
        buttonsAcciones.appendChild(editButton);
      }
      buttonsAcciones.appendChild(deleteButton);
      columnaAcciones.appendChild(buttonsAcciones);
    }
  }
}