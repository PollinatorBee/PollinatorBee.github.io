//SCRIPT.js
//ARCHIVO DONDE SE CARGAN TODOS LOS SCRIPTS

function cargarScripts() {
    const body = document.body;

    // Script de jQuery
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.5.1.slim.min.js';
    body.appendChild(jqueryScript);

    // Script de Popper.js
    const popperScript = document.createElement('script');
    popperScript.src = 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js';
    body.appendChild(popperScript);

    // Script de Bootstrap
    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js';
    body.appendChild(bootstrapScript);

      // Script de firebase-config.js
      const firebaseConfigScript = document.createElement('script');
      firebaseConfigScript.type = 'module';
      //si el documento esta dentro de pages (no es el index)
      window.location.href.split("/").pop() == 'index.html'? firebaseConfigScript.src = './js/firebase-config.js' : firebaseConfigScript.src = '../js/firebase-config.js';
      body.appendChild(firebaseConfigScript);

      //si la página es login.html se cargará el script auth.js
      if(window.location.href.split("/").pop() != 'login.html'){
        
        // Script de log.js
        const logScript = document.createElement('script');
        logScript.type = 'module';
        //si el documento esta dentro de pages (no es el index)
        window.location.href.split("/").pop() == 'index.html'? logScript.src = './js/log.js' : logScript.src = '../js/log.js';
        body.appendChild(logScript);
      }

      // Script de firebase-config.js
      const langScript = document.createElement('script');
      langScript.type = 'module';
      //si el documento esta dentro de pages (no es el index)
      window.location.href.split("/").pop() == 'index.html'? langScript.src = './js/lang.js' : langScript.src = '../js/lang.js';
      body.appendChild(langScript);

      // Script de firebase-config.js
      const idiomaScript = document.createElement('script');
      idiomaScript.type = 'module';
      //si el documento esta dentro de pages (no es el index)
      window.location.href.split("/").pop() == 'index.html'? idiomaScript.src = './js/idioma.js' : idiomaScript.src = '../js/idioma.js';
      body.appendChild(idiomaScript);
}

// Llama a la función para cargar los scripts después de que el DOM se haya cargado
document.addEventListener('DOMContentLoaded', cargarScripts);
