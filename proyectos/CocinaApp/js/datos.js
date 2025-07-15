//DATOS.js
//Archivo para mostrar los datos de usuario.
import { selectDataUsuario } from "./functions-pedidos.js";

//carga los datos de la base de datos al iniciar la pagina
document.addEventListener("DOMContentLoaded", async function () {

    //recogemos los valores pasados por la URL
    const urlParams = new URLSearchParams(window.location.search);

    try {
        console.log("trayendo los datos para: ", urlParams.get("usuario"));
        const usuarioPorUrl = urlParams.get("usuario");

        //obtenemos los datos del usuario
        const usuarios = await obtenerInformacionUsuario(usuarioPorUrl);
        console.log(usuarios);

        //pasamos los valores de la consulta a los elementos del html
        document.getElementById("nombre").value = usuarios.nombre;
        document.getElementById("apellidos").value = usuarios.apellidos;
        document.getElementById("departamento").value = usuarios.departamento;
        // document.getElementById("tel").value = usuarios.telefono;
        // document.getElementById("email").value = usuarios.email;
        
        // Obtener el padre de los elementos
        const telefono = document.getElementById('telefono');

        // Crear el elemento tel:
        const tel_link = document.createElement('a');
        tel_link.href = `tel:${usuarios.telefono}`;
        tel_link.className = 'btn btn-outline-secondary mb-2';

        // Crear el elemento i
        const icono_Tel = document.createElement('i');
        icono_Tel.className = 'bi bi-telephone';
        tel_link.appendChild(icono_Tel);
        telefono.appendChild(tel_link);

        // Crear el elemento input
        const telef = document.createElement('input');
        telef.type = 'tel';
        telef.className = 'form-control';
        // telef.id = 'tel';
        telef.value = `${usuarios.telefono}`;
        telef.setAttribute('readonly', true);
        telefono.appendChild(telef);

        // Obtener el padre de email
        const mensaje = document.getElementById('mensaje');

        // Crear el elemento mailto:
        const mail_to = document.createElement('a');
        mail_to.href = `mailto:${usuarios.email}`;
        mail_to.className = 'btn btn-outline-secondary mb-2';

        // Crear el elemento i
        const icono_Mail = document.createElement('i');
        icono_Mail.className = 'bi bi-envelope';
        mail_to.appendChild(icono_Mail);
        mensaje.appendChild(mail_to);

        // Crear el elemento input
        const email = document.createElement('input');
        email.type = 'email';
        email.className = 'form-control';
        email.value = `${usuarios.email}`;
        email.setAttribute('readonly', true);

        // Agregar el elemento input al mensaje
        mensaje.appendChild(email);

    } catch (error) {
      alert(error.message);
    }
  }); 

/**
 * Obtiene la información del usuario de la base de datos.
 * @param {string} usuario El nombre de usuario del usuario cuya información se va a obtener.
 * @returns {Promise<Object>} Una promesa que se resuelve en los datos del usuario.
 */
async function obtenerInformacionUsuario(usuario) {
  // Selecciona los datos del usuario de la base de datos
  const data = await selectDataUsuario(usuario);

  // Muestra los datos del usuario en la consola
  console.log("Datos de usuario:", data);

  // Devuelve los datos del usuario
  return data;
}


