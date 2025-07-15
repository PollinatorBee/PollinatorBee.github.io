//FUNCIONES IMPORTADAS
import { selectDataUsuario, updateDataPedidosFecha } from "./functions-pedidos.js";

//Declaración de variables solo cambiar fecha.
const identificador_pedido = document.getElementById("identificador_pedido");
const pedido_usuario = document.getElementById("pedido_usuario");
let pedido_fecha = document.getElementById("pedido_fecha");
let pedido_hora = document.getElementById("pedido_hora");
const pedido_precio_total = document.getElementById("pedido_precio_total");
const pedido_estado = document.getElementById("pedido_estado");

const editButton = document.getElementById("editButton");

let fecha_guardar;

let key;
let usuario;
let correo;

//EVENTOS
document.addEventListener("DOMContentLoaded", async function () {
   
    //recoger los valores pasados por url
    const urlParams = new URLSearchParams(window.location.search);

    key = urlParams.get("key");
    usuario = urlParams.get("usuario");
    correo = urlParams.get("correo");
    
    // Asignar la fecha formateada al input de tipo date 
    let partesFechaR = urlParams.get("fecha").split('(')[0].trim(); //parto fecha de la hora y me quedo solo con ella
    pedido_fecha.value = formatFecha(partesFechaR); //la formateo
    fecha_guardar = pedido_fecha.value;

    // Asignar las opciones de hora separandolo cada una
    const regex = /\(([^)]+)\)/g; // Expresion regex que selecciona todos los caracteres dentro de cada parentesis
    let matches;
    const opcionesHoraOriginales = [];

    // Buscamos todas las coincidencias con nuestra expresion regex y guardamos cada una dentro de un array
    while ((matches = regex.exec(urlParams.get("fecha"))) !== null) {
        opcionesHoraOriginales.push(`(${matches[1]})`); // el indice [0] tiene todos los caracteres incluidos los parentesis y el [1] todos sin el parentesis
    }

   // Iteramos sobre las opciones del select y si coiniciden con nuestros parametros los dejamos como seleccionados
    for (let option of pedido_hora.options) {
        if (opcionesHoraOriginales.includes(option.value)) {
            option.selected = true;
        }
    }

    const precio_total = urlParams.get("precio");
    const estado = urlParams.get("estado");

    identificador_pedido.value = key;
    let obtener_usuario = await selectDataUsuario(usuario);
    pedido_usuario.value = obtener_usuario.nombre+' '+obtener_usuario.apellidos;
    pedido_precio_total.value = precio_total;
    pedido_estado.value = estado;

});

//evento seleccionar fin de semana no permitido
pedido_fecha.addEventListener('input', async function(){
    let fechaSeleccionada = new Date(pedido_fecha.value);
    let diaSemana = fechaSeleccionada.getDay();
    pedido_fecha.blur();
    if(diaSemana == 0 || diaSemana == 6){
        alert('No puedes seleccionar un fin de semana. Se restablecerá la fecha.');
        // Restablecer la fecha a la actual
        pedido_fecha.value = fecha_guardar;
       
    }

});

//evento al guardar los datos con el botón edit Button.
editButton.addEventListener("click", async (event)=>{
    //Creamos un array con las opciones de hora seleccionadas
    const selectedValues = Array.from(pedido_hora.selectedOptions).map(option => option.value);

    await updateDataPedidosFecha(identificador_pedido.value, formatFecha(pedido_fecha.value) + ' ' + selectedValues.join(' '));
    sendEmail(key, formatFecha(pedido_fecha.value), selectedValues.join(' '));

});

/**
 * Formatea una fecha en el formato "DD-MM-YYYY".
 * @param {string} fecha La fecha a formatear en formato "YYYY-MM-DD".
 * @returns {string} La fecha formateada en formato "DD-MM-YYYY".
 */
function formatFecha(fecha) {
    // Dividir la fecha en partes usando el carácter "-" como separador
    const partesFecha = fecha.split("-");
    
    // Reorganizar las partes de la fecha en el formato "DD-MM-YYYY"
    return partesFecha[2] + "-" + partesFecha[1] + "-" + partesFecha[0];
}


/**
 * Envía un correo electrónico con información sobre un pedido.
 * @param {string} id El código del pedido.
 * @param {string} fecha La fecha actualizada del pedido.
 * @param {string} horas Las horas de recogida actualizadas del pedido.
 */
function sendEmail(id, fecha, horas) {
    // Imprime un mensaje de registro
    console.log("Enviando correo electrónico...");
    
    // Define el asunto y el cuerpo del correo electrónico
    const subject = 'Su pedido ha cambiado de fecha u hora';
    const body = `Su pedido con el código ${id} ha cambiado a la siguiente fecha y horas de recogida: Fecha: ${fecha} Horas: ${horas} `;
    
    // Crea el URI del correo electrónico con la información proporcionada
    const mailtoURI = `mailto:${correo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Abre el cliente de correo electrónico predeterminado con el correo electrónico preconfigurado
    window.open(mailtoURI, '_self');
}


