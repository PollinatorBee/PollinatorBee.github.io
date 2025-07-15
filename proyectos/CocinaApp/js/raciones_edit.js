//FUNCIONES IMPORTADAS
import { sanitizeInput, isValidInteger, esPositivo, esCero, validarInput, comprobarMaximo, actualizarDatosFirebase } from "./functions-raciones.js";

//DECLARACION DE VARIABLES
let idOriginal = "";
let id = document.getElementById("nombre_raciones");
//let variableFoto = "";
let selectedFile;
let variableDescripcion = document.getElementById("descripcion_raciones");
let variableAlergenos = document.getElementById("alergenos_raciones");
let variablePrecio = document.getElementById("precio_raciones");
let variableStock = document.getElementById("stock_raciones");
let variableMaximo = document.getElementById("maximo_raciones");

const fileInput = document.getElementById("imagenInput"); //id del input tipo file
const selectedImage = document.getElementById("selectedImage"); //id del img

let editButton = document.getElementById("editButton");


//EVENTOS...

//evento al cargar la pagina
document.addEventListener("DOMContentLoaded", async function () {

    //recogemos los valores pasados por la URL
    const urlParams = new URLSearchParams(window.location.search);

    const key = urlParams.get("key");
    const foto = urlParams.get("foto"); //la url de la foto de storage en firebase
    const descripcion = urlParams.get("descripcion");
    const alergenos = urlParams.get("alergenos");
    const precio = urlParams.get("precio");
    const stock = urlParams.get("stock");
    const maximo = urlParams.get("maximo");

    // asignamos estos valores en el html
    document.getElementById('nombre_raciones').value = key;
    idOriginal = key;
    document.getElementById('selectedImage').src = foto; //le ponemos la url de firebase como source
    //variableFoto = foto;
    document.getElementById('descripcion_raciones').value = descripcion;
    document.getElementById('alergenos_raciones').value = alergenos;
    document.getElementById('precio_raciones').value = precio;
    document.getElementById('stock_raciones').value = stock;
    document.getElementById('maximo_raciones').value = maximo;

    console.log("racion: ", id.value);
    console.log("url imagen: ", selectedImage.src);
    //console.log(variableFoto);


    //creo un evento que se llama al cambiar el input file y muestra la nueva imagen
    fileInput.addEventListener("change", function (event) {
        selectedFile = event.target.files[0]; //guardamos el file

        if (selectedFile) { //si existe...
            // mostramosa imagen seleccionada
            const reader = new FileReader();

            reader.onload = function (e) {
                selectedImage.src = e.target.result; //cambiamos el source de el elemento img al file seleccionado localmente
                //variableFoto = selectedFile.name; //asignamos el nombre de imagen a la variable variableFoto
                //console.log("variable foto: ", variableFoto);
            };
            reader.readAsDataURL(selectedFile);
        }
    });
  });


//evento al editar los datos
editButton.addEventListener("click", async (event) => {

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
        actualizarDatosFirebase(selectedFile, id, idOriginal, variableDescripcion, variableAlergenos, variablePrecio, variableStock, variableMaximo)
    }

});

