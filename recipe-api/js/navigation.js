document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar todos los enlaces del menú de navegación
  const navLinks = document.querySelectorAll("nav a");

  // Agregar un evento de clic a cada enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Evitar el comportamiento predeterminado del enlace

      // Obtener el valor del atributo data-page del enlace
      const page = link.getAttribute("data-page");

      if (page) {
        // Abrir la página en una nueva pestaña
        window.open(page, "_blank");
      }
    });
  });
});
