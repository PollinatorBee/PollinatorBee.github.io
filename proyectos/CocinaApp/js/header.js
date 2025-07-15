// HEADER.js
//SE CREA EL HEADER PARA PODER PONERLO EN UNA SOLA LINEA EN TODAS LAS PÁGINAS

document.addEventListener('DOMContentLoaded', function () {
    const header = document.createElement('header');
    header.className = 'header';

    // Contenido de la barra de navegación
    const navbar = document.createElement('nav');
    navbar.className = 'navbar navbar-expand-lg navbar-light bg-light';
    

    //imagen logo
    const logo = document.createElement('a');
    logo.className = 'navbar-brand';
    window.location.href.split("/").pop() == 'index.html'? logo.href = './index.html' : logo.href = '../index.html';
        //la imagrn que ira dentro del logo.
        const imgLogo = document.createElement('img');
        if(window.location.href.split("/").pop() == 'index.html'){
            imgLogo.src = "./images/iconos/cocinaApp.png";
        }else{
            imgLogo.src = "../images/iconos/cocinaApp.png";
        }
        imgLogo.alt = "logo cocinApp";
        logo.appendChild(imgLogo);
    navbar.appendChild(logo);

    // Contenido del titulo
    const titulo = document.createElement('p');
    titulo.className = 'texto-titulo';
    titulo.innerText = 'CocinaApp';
    navbar.appendChild(titulo);

    //boton para mostrar en dispositivos pequeños
    const navbarTogglerButton = document.createElement('button');
    navbarTogglerButton.className = 'navbar-toggler';
    navbarTogglerButton.type = 'button';
    navbarTogglerButton.setAttribute('data-toggle', 'collapse');
    navbarTogglerButton.setAttribute('data-target', '#navbarNav');
    navbarTogglerButton.setAttribute('aria-controls', 'navbarNav');
    navbarTogglerButton.setAttribute('aria-expanded', 'false');
    navbarTogglerButton.setAttribute('aria-label', 'Toggle navigation');

        // Añade el ícono del botón
        const navbarTogglerIcon = document.createElement('span');
        navbarTogglerIcon.className = 'navbar-toggler-icon';
        navbarTogglerButton.appendChild(navbarTogglerIcon);
    navbar.appendChild(navbarTogglerButton);

    // Crea el contenido del menú
    const menuContent = document.createElement('div');
    menuContent.className = 'collapse navbar-collapse';
    menuContent.id = 'navbarNav';

        // Crea la lista de opciones del menú
        const menuList = document.createElement('ul');
        menuList.className = 'navbar-nav ml-auto';

            // Opción "Raciones"
            const racionesItem = document.createElement('li');
            racionesItem.className = 'nav-item active';
            const racionesLink = document.createElement('a');
            racionesLink.className = 'nav-link';
            racionesLink.id = 'raciones';
            window.location.href.split("/").pop() == 'index.html'? racionesLink.href = './pages/raciones.html' : racionesLink.href = '../pages/raciones.html';
            racionesItem.appendChild(racionesLink);
            menuList.appendChild(racionesItem);

            // Opción "Pedidos"
            const pedidosItem = document.createElement('li');
            pedidosItem.className = 'nav-item active';
            const pedidosLink = document.createElement('a');
            pedidosLink.className = 'nav-link';
            pedidosLink.id = 'pedidos';
            window.location.href.split("/").pop() == 'index.html'? pedidosLink.href = './pages/pedidos.html' : pedidosLink.href = '../pages/pedidos.html';
            ;
            pedidosItem.appendChild(pedidosLink);
            menuList.appendChild(pedidosItem);

            // Opcion resultados
            const resultItem = document.createElement('li');
            resultItem.className = 'nav-item active';
            const resultLink = document.createElement('a');
            resultLink.className = 'nav-link';
            resultLink.id = 'resultados';
            window.location.href.split("/").pop() == 'index.html'? resultLink.href = './pages/resultados.html' : resultLink.href = '../pages/resultados.html';
            ;
            resultItem.appendChild(resultLink);
            menuList.appendChild(resultItem);

            // Opción "lenguaje"
            const idiomaItem = document.createElement('li');
            idiomaItem.className = 'nav-item active';
            const idiomaLink = document.createElement('a');
            idiomaLink.className = 'nav-link';
            idiomaLink.id = 'idioma';
            idiomaLink.href = '';
            const idiomaIcon = document.createElement('i');
            idiomaIcon.className = 'bi bi-translate';
            idiomaLink.appendChild(idiomaIcon);
            idiomaItem.appendChild(idiomaLink);
            menuList.appendChild(idiomaItem);

            // Opción "Logout"
            const logoutItem = document.createElement('li');
            logoutItem.className = 'nav-item active';
            const logoutLink = document.createElement('a');
            logoutLink.className = 'nav-link';
            logoutLink.id = 'logout';
            logoutLink.href = '';
            const logoutIcon = document.createElement('i');
            logoutIcon.className = 'bi bi-power';
            logoutLink.appendChild(logoutIcon);
            logoutItem.appendChild(logoutLink);
            menuList.appendChild(logoutItem);

        // Agrega la lista al contenido del menú
        menuContent.appendChild(menuList);
    navbar.appendChild(menuContent)


    header.appendChild(navbar);
    
    document.body.insertBefore(header, document.body.firstChild);
});

