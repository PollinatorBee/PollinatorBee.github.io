
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { app } from "./firebase-config.js";

//Aquí poner usuarios Administradores que esten reguistrados en la base de datos auth de firebase para hacer una doble comprobacion (primero en local antes de ir a firebase)
const admin_email = ["pruebaadmin@cocinapp.com", "pruebaadmin@gmail.com"];

// Iniciando la autenticación de Firebase y obteniendo la referencia
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", async function () {
  const btn = document.getElementById("login");
  
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //sanitizar las entradas
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email

    if (emailPattern.test(email)) {
      // El correo electrónico es válido
      // alert("Correo electrónico válido: " + email);
      // Aquí se envía el email y el password
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
          //solo si el usuario es el administrador de cocina accede
        if(admin_email.includes(email)){
          alert("Acceso Correcto");
          //envio a la pagina principal
          window.location.href = '../index.html';
      }else{
        alert("Acceso Incorrecto, no esta en la lista de administradores");
        window.location.reload();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("¡¡¡ Acceso Incorrecto !!!");
      });
    } else {
      // El correo electrónico no es válido
      alert("Por favor, introduce un correo electrónico válido");
    }
     
  });

});
