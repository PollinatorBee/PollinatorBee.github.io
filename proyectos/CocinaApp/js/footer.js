//FOOTER.JS
//SE CREA EL FOOTER PARA PODER PONERLO EN UNA SOLA LINEA EN TODAS LAS PÁGINAS

// Crea el contenido del pie de página
const footerContent = document.createElement('footer');
footerContent.className = 'card-footer mt-4 bg-light';

const containerDiv = document.createElement('div');
containerDiv.className = 'container';

const rowDiv = document.createElement('div');
rowDiv.className = 'row';

// Columna izquierda
const leftColDiv = document.createElement('div');
leftColDiv.className = 'col-md-6';
const reservadosText = document.createElement('p');
reservadosText.className = 'text-muted';
reservadosText.id = 'reservados';
leftColDiv.appendChild(reservadosText);

// Columna derecha
const rightColDiv = document.createElement('div');
rightColDiv.className = 'col-md-6';
const listInline = document.createElement('ul');
listInline.className = 'list-inline text-right';

// Acerca
const acercaItem = document.createElement('li');
acercaItem.className = 'list-inline-item';
const acercaLink = document.createElement('a');
window.location.href.split("/").pop() == 'index.html'? acercaLink.href = './pages/acerca_de.html' : acercaLink.href = '../pages/acerca_de.html';
acercaLink.id = 'acerca';
acercaItem.appendChild(acercaLink);
listInline.appendChild(acercaItem);

// Contacto
const contactoItem = document.createElement('li');
contactoItem.className = 'list-inline-item';
const contactoLink = document.createElement('a');
window.location.href.split("/").pop() == 'index.html'? contactoLink.href = './pages/contacto.html' : contactoLink.href = '../pages/contacto.html';
contactoLink.id = 'contacto';
contactoItem.appendChild(contactoLink);
listInline.appendChild(contactoItem);

// Política
const politicaItem = document.createElement('li');
politicaItem.className = 'list-inline-item';
const politicaLink = document.createElement('a');
window.location.href.split("/").pop() == 'index.html'? politicaLink.href = './pages/politica.html' : politicaLink.href = '../pages/politica.html';
politicaLink.id = 'politica';
politicaItem.appendChild(politicaLink);
listInline.appendChild(politicaItem);

rightColDiv.appendChild(listInline);

// Agrega las columnas al row
rowDiv.appendChild(leftColDiv);
rowDiv.appendChild(rightColDiv);

// Agrega el row al container
containerDiv.appendChild(rowDiv);

// Agrega el container al pie de página
footerContent.appendChild(containerDiv);

// Agrega el pie de página al documento
document.addEventListener('DOMContentLoaded', function () {
    // Encuentra el elemento donde deseas agregar el pie de página
    const body = document.body;

    // Añade el pie de página al final del cuerpo
    body.appendChild(footerContent);
});
