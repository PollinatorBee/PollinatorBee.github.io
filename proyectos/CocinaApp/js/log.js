//FUNCIONES IMPORTADAS
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { app } from "./firebase-config.js";

// Iniciando la Authentication de Firebase y obteniendo referencia al servicio
const auth = getAuth(app);

// Si le damos al boton de salir 'logout'
document.getElementById("logout").addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    // cierre de sesion
  }).catch((error) => {
    // error
  });
});

//Para que en todas las páginas vamos a ver que esta logeado, sino lo sacamos fuera
onAuthStateChanged(auth, (user) => {
  if (user) {
    // El usuario ha iniciado sesion, lista de propiedades para el usuario
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
  } else {
    //obtenemos la ruta de la página actual
    let paginaActual = window.location.pathname;
    // Verifica si está en la página index.html
    if (paginaActual === "/" || paginaActual === "/index.html") {
        //window.location.href = "/pages/login.html";
        window.location.href = './pages/login.html';

    }
    // Verifica si está en la página datos.html
    else{
        window.location.href = "./pages/login.html";
    }
    // console.log("usuario NO logeado");
  }
});