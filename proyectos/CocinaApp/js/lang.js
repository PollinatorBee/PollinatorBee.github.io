//FUNCIONES IMPORTADAS
// Importar los datos de idioma desde el archivo idioma.js
import { castellano, euskera, castellanoClass, euskeraClass } from "./idioma.js";

// Obtener el idioma seleccionado
let idioma = obtenerCookie("idioma");

// Si no hay idioma seleccionado, establecer el predeterminado como castellano
if (!idioma) {
    idioma = 'castellano';
    establecerCookie("idioma", idioma, 7);
}

/**
 * Establece una cookie en el navegador del usuario.
 * @param {string} nombre El nombre de la cookie.
 * @param {string} valor El valor de la cookie.
 * @param {number} diasExpiracion El número de días hasta que la cookie expire.
 */
function establecerCookie(nombre, valor, diasExpiracion) {
    // Obtener la fecha de expiración
    let fechaExpiracion = new Date();
    fechaExpiracion.setDate(fechaExpiracion.getDate() + diasExpiracion);

    // Crear la cadena de la cookie con el nombre, valor y fecha de expiración
    let cookie = nombre + "=" + valor + ";expires=" + fechaExpiracion.toUTCString() + ";path=/";

    // Establecer la cookie en el navegador
    document.cookie = cookie;
}


/**
 * Obtiene el valor de una cookie del navegador.
 * @param {string} nombre El nombre de la cookie cuyo valor se va a obtener.
 * @returns {string|null} El valor de la cookie si se encuentra, o null si no se encuentra.
 */
function obtenerCookie(nombre) {
    // Prepara el texto a buscar para identificar la cookie
    let nombreCookie = nombre + "=";

    // Divide la cadena de cookies en un arreglo separado por punto y coma
    let cookies = document.cookie.split(';');

    // Recorre cada cookie en el arreglo
    for (let i = 0; i < cookies.length; i++) {
        // Elimina los espacios en blanco al inicio y al final de la cookie
        let cookie = cookies[i].trim();
        
        // Verifica si la cookie actual comienza con el nombre de la cookie deseada
        if (cookie.indexOf(nombreCookie) === 0) {
            // Si se encuentra la cookie, devuelve el valor de la cookie
            return cookie.substring(nombreCookie.length, cookie.length);
        }
    }
    
    // Si no se encuentra la cookie, devuelve null
    return null;
}


/**
 * Cambia el texto de los elementos HTML identificados por sus ID según el idioma proporcionado.
 * @param {Object} idiomaData Un objeto que mapea los ID de los elementos HTML a los textos en el idioma correspondiente.
 */
function ponerIdioma(idiomaData) {
    // Itera sobre todas las claves (IDs de elementos) en el objeto de datos del idioma
    Object.keys(idiomaData).forEach(function(clave) {
        // Obtiene una referencia al elemento HTML con el ID correspondiente
        let elemento = document.getElementById(clave);
        // Verifica si el elemento existe en el DOM
        if (elemento) {
            // Asigna el texto del elemento al texto proporcionado en el objeto de datos del idioma
            elemento.textContent = idiomaData[clave];
        }
    });
}


/**
 * Cambia el contenido de los elementos con la clase especificada al idioma proporcionado.
 * @param {Object} idiomaData Un objeto que contiene las traducciones para cada clase de elemento.
 */
function ponerIdiomaClass(idiomaData) {
    // Itera sobre las claves del objeto de idiomaData
    Object.keys(idiomaData).forEach(function(clave) {
        // Obtiene todos los elementos con la clase correspondiente
        let elementos = document.querySelectorAll('.' + clave);
        // Itera sobre cada elemento y cambia su contenido al texto del idioma proporcionado
        elementos.forEach(function(elemento) {
            elemento.textContent = idiomaData[clave];
        });
    });
}


// Seleccionar el idioma adecuado al cargar la página
seleccionarIdioma(idioma);
seleccionarIdiomaClass(idioma);

/**
 * Selecciona el idioma del sitio web y aplica los cambios correspondientes.
 * @param {string} idioma El idioma seleccionado ('euskera' o 'castellano').
 */
function seleccionarIdioma(idioma) {
    // Verifica si el idioma seleccionado es euskera y aplica ese idioma
    if (idioma === 'euskera') {
        ponerIdioma(euskera);
    } else { // Si no es euskera, se aplica el idioma castellano por defecto
        ponerIdioma(castellano);
    }
}


/**
 * Selecciona el idioma en elementos con una clase específica y lo aplica.
 * @param {string} idioma El idioma que se va a seleccionar ('euskera' o 'castellano').
 */
function seleccionarIdiomaClass(idioma) {
    // Comprueba el idioma seleccionado y llama a la función correspondiente para aplicarlo a los elementos con clase
    idioma === 'euskera' ? ponerIdiomaClass(euskeraClass) : ponerIdiomaClass(castellanoClass);
}


// Manejar el evento de clic en el botón de idioma
let botonIdioma = document.getElementById('idioma');
if (botonIdioma) {
    botonIdioma.addEventListener('click', function() {
        idioma = idioma === 'castellano' ? 'euskera' : 'castellano';
        establecerCookie("idioma", idioma, 7);
        seleccionarIdioma(idioma);
        seleccionarIdiomaClass(idioma);
    });
}

// Manejar el evento de clic en el botón de volver
let botonVolver = document.getElementById('dVolver');
if (botonVolver) {
    botonVolver.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('volver');
        window.history.back();
    });
}
