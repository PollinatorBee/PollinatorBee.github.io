//FUNCIONES IMPORTADAS
import { sanitizeInput, isValidInteger, esPositivo, esCero, validarInput, comprobarMaximo, introducirDatosFirebase } from "./functions-raciones.js";

//DECLARACION DE VARIABLES
let id = document.getElementById("nombre_raciones");
let selectedFile; //aqui se va a guardar la foto para subirla a firebase storage
let variableDescripcion = document.getElementById("descripcion_raciones");
let variableAlergenos = document.getElementById("alergenos_raciones");
let variablePrecio = document.getElementById("precio_raciones");
let variableStock = document.getElementById("stock_raciones");
let variableMaximo = document.getElementById("maximo_raciones");

let insertButton = document.getElementById("InsertButton");

//evento al cargar la pagina
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("imagenInput"); //id del input tipo file
    const selectedImage = document.getElementById("selectedImage"); //id del img

    //creo un evento que se ejecuta al cambiar el archivo del input file para mostrar la nueva imagen
    fileInput.addEventListener("change", function (event) {
        selectedFile = event.target.files[0]; //guardamos el file

        if (selectedFile) { //si existe...
            // mostramos imagen seleccionada
            const reader = new FileReader();

            reader.onload = function (e) {
                selectedImage.src = e.target.result; //cambiamos el src del elemento img al del archivo local seleccionado
            };
            reader.readAsDataURL(selectedFile);
        }
    });
});

//evento al insertar los datos
insertButton.addEventListener("click", async (event) => {

    //formateamos precio a decimal de 2 digitos
    if (variablePrecio.value){
        variablePrecio.value = Number(variablePrecio.value).toFixed(2);
    }
    console.log(variablePrecio.value);

    console.log(id.value);
    //sanitizamos los input que nos permiten introducir texto (evita la inyeccion de codigo)
    id.value = sanitizeInput(id.value); // sanitizamos el id
    if(variableDescripcion.value){
        variableDescripcion.value = sanitizeInput(variableDescripcion.value); // la descripcion
    }
    if(variableAlergenos.value){
        variableAlergenos.value = sanitizeInput(variableAlergenos.value); // y los alergenos
    } 

    //validamos los campos antes de insertar

    let userResponse = true; //para controlar si introducimos datos o no

    // ID
    if (!validarInput(id)) { //si no tiene nombre la racion no se introduce en base de datos
        userResponse = false;
        alert("Debe introducir el nombre de la racion.");
    }else if(!validarInput(variablePrecio)){ // PRECIO
        userResponse = false;
        alert("Debe introducir el precio de la racion.");
    }else if(!esPositivo(variablePrecio.value)){
        userResponse = false;
        alert("No puede introducir un numero negativo en el precio");
    }else if(!isValidInteger(variableStock.value)){ // STOCK
        userResponse = false;
        alert("El formato de stock es incorrecto");
    }else if(!esPositivo(variableStock.value)){
        userResponse = false;
        alert("No puede introducir un numero negativo en el stock");
    }else if(!validarInput(variableMaximo)){ // MAXIMO
        userResponse = false;
        alert("Debe introducir el maximo de raciones permitido por pedido.");
    }else if (!comprobarMaximo(variableStock, variableMaximo)){
        userResponse = false;
        alert("El maximo de raciones por pedido no puede superar el stock");
    }else if(!isValidInteger(variableMaximo.value)){
        userResponse = false;
        alert("El formato de pedido maximo es incorrecto");
    }else if(!esPositivo(variableMaximo.value)){
        userResponse = false;
        alert("No puede introducir un numero negativo en el pedido maximo");
    }else if(esCero(variablePrecio.value)){ // precio = cero
        userResponse = confirm("¿Seguro que desea dejar el precio a 0?"); //si este codigo se ejecuta y se cancela el confirm, nos quedamos en false
        console.log(userResponse);
    }

    if(userResponse){ //si es true, tanto como porque nunca se puso a cero como si se acepto poner a 0...
        introducirDatosFirebase(selectedFile, id, variableDescripcion, variableAlergenos, variablePrecio, variableStock, variableMaximo)
    }
});
