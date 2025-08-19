//FUNCIONES IMPORTADAS
import { storage } from './firebase-config.js'; //traemos "storage" exportado desde firebase-config.js (local)
import { ref, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js'; //traemos estos metodos de un .js online
import { selectAllDataRaciones, deleteDataRaciones, searchDataRaciones } from "./functions-raciones.js"; //traemos los metodos exportados en functions.js

// Ejecutamos selectAllData para recivir los datos de la base de datos y actualizar el html con nuestras variables en main.js
document.addEventListener("DOMContentLoaded", async function () { //tiene que ser async para poder usar await selectAllDataRaciones(); (pausa el codigo hasta recibir respuesta)
  try {

    //obtenemos lo que ponemos en el search
    const query = document.getElementById('query');
    //para que siempre arranque con el search seleccionado
    if(query) query.focus();

    let data = await selectAllDataRaciones(); //llamamos a la funcion de functions.js con el prefijo await, que pausara la ejecucion del codigo hasta obtener respuesta

    await mostrarRaciones(data);

    query.addEventListener('input', async function() {
        
      try {
          
          //hacer location reload porque sino al borrar rapidamente se quedan varios item repetidos ¿?
          (query.value !=''|| query.value == null)? data = await searchDataRaciones(query.value) : location.reload();
          // console.log(data);

          //ponemos en la tabla
          await mostrarRaciones(data);

      } catch (error) {
          console.error('Error al obtener datos:', error);
      }
    });
  } catch (error) {
    alert(error.message);
  }

});

/**
 * Muestra las raciones en una tabla HTML.
 * @param {Array<Object>} data Los datos de las raciones a mostrar.
 * @returns {void}
 */
async function mostrarRaciones(data) {
  const table = document.getElementById("racionesTable");
  const tbody = table.getElementsByTagName("tbody")[0]; // Obtiene el primer elemento tbody de la tabla
  tbody.innerHTML = ""; // Limpia el tbody cada vez que se refresca la página

  // Itera sobre los datos y actualiza la tabla (debe ser asíncrono para esperar el await al código para getDownloadURL(photoRef))
  data.forEach(async (rowData) => {
    // Crea una nueva fila
    const row = tbody.insertRow();

    // Inicializa la URL de la foto como indefinida
    let urlFoto;

    // Obtiene la referencia de la foto en Firebase Storage con el mismo nombre que la ración
    const photoRef = ref(storage, rowData.key);

    try {
      // Obtiene la URL de descarga de la foto
      console.log("Buscando en Firebase la URL para la foto:", rowData.key);
      urlFoto = await getDownloadURL(photoRef);
      console.log("URL obtenida:", urlFoto);
    } catch (error) {
      console.log("La ración no tiene foto, se dejará el campo vacío");
    }

    // Crea una celda por cada columna
    const columnaKey = row.insertCell(0);
    columnaKey.style.fontWeight = "bold"; // La primera columna tendrá el texto en negrita
    const columnaFoto = row.insertCell(1);
    const columnaDescripcion = row.insertCell(2);
    const columnaAlergenos = row.insertCell(3);
    const columnaPrecio = row.insertCell(4);
    const columnaStock = row.insertCell(5);
    const columnaMaximo = row.insertCell(6);
    const columnaAcciones = row.insertCell(7);

    //responsive
    columnaKey.setAttribute("data-label", "Key");
    columnaFoto.setAttribute("data-label", "Foto");
    columnaDescripcion.setAttribute("data-label", "Descripcion");
    columnaAlergenos.setAttribute("data-label", "Alergenos");
    columnaPrecio.setAttribute("data-label", "Fecha de Precio");
    columnaStock.setAttribute("data-label", "Stock");
    columnaMaximo.setAttribute("data-label", "Maximo");
    columnaAcciones.setAttribute("data-label", "Acciones");

    // Añade el contenido a cada celda
    columnaKey.textContent = rowData.key;
    console.log("Añadiendo el src de la foto como la URL obtenida:", urlFoto);
    columnaFoto.innerHTML = `<img src="${urlFoto}" alt="" width="150" readonly>`;
    columnaDescripcion.innerHTML = rowData.descripcion;
    columnaAlergenos.innerHTML = rowData.alergenos ? rowData.alergenos.join(', ') : 'ninguno'; // Si hay datos, junta los elementos del array con una coma y un espacio entre cada elemento
    columnaPrecio.innerHTML = rowData.precio + " €" || ' ';
    columnaStock.innerHTML = rowData.stock;
    columnaMaximo.innerHTML = rowData.pedido_max;

    // Botones para editar y eliminar
    const editButton = document.createElement('a');
    editButton.href = `../pages/raciones_edit.html?key=${rowData.key}&foto=${urlFoto}&descripcion=${rowData.descripcion}&alergenos=${rowData.alergenos || 'ninguno'}&precio=${rowData.precio}&stock=${rowData.stock}&maximo=${rowData.pedido_max}`;
    editButton.className = 'btn btn-sm btn-outline-primary';
    editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';

    const deleteButton = document.createElement('a');
    deleteButton.className = 'btn btn-sm btn-outline-danger';
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>';

    // Event listener para el botón de editar
    editButton.addEventListener("click", () => handleEdit(rowData.key));

    // Event listener para el botón de eliminar
    deleteButton.addEventListener("click", () => {
      // Muestra un mensaje de confirmación
      let userResponse = confirm("¿Desea borrar esta ración?");

      if (userResponse) { // Si el usuario confirma, se borran los datos de la ración
        // Borra la ración de la tabla raciones
        deleteDataRaciones(rowData.key);

        // Borra la foto de storage
        const storageRef = ref(storage, rowData.key);
        deleteObject(storageRef)
          .then(() => {
            console.log('Foto', rowData.key, 'borrada de storage'); // Borrado completado exitosamente
          })
          .catch((error) => {
            console.error('Error al borrar la foto:', error);
            console.log('Error al borrar la foto. Por favor, inténtalo de nuevo.');
          });
      }
    });

    // Crea un div para poner los botones siempre en horizontal y no se cambien a vertical
    const buttonsAcciones = document.createElement('div');
    buttonsAcciones.className = 'd-flex justify-content-center';
    buttonsAcciones.appendChild(editButton);
    buttonsAcciones.appendChild(deleteButton);
    columnaAcciones.appendChild(buttonsAcciones);
  });
}


