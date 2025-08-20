
  const navIcon = document.getElementById('nav-icon');
  const overlayMenu = document.getElementById('overlay-menu');

  navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('open');
    overlayMenu.classList.toggle('show');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('#overlay-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navIcon.classList.remove('open');
      overlayMenu.classList.remove('show');
    });
  });
