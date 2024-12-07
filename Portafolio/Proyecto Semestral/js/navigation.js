// **NavigationFactory**: Módulo encargado de manejar la navegación entre páginas utilizando botones con atributos `data-page`.
const NavigationFactory = (function () {
   
// **htmlElements**: Almacena las referencias a elementos del DOM.
  const htmlElements = {
     // Selecciona todos los botones con la clase `.btn` y el atributo `data-page`. 
    navLinks: () => document.querySelectorAll(".btn[data-page]"),

  };

// **handlers**: Define las funciones que manejan eventos.
  const handlers = {
// **navigate**: Función que maneja la navegación cuando se hace clic en un enlace.
    navigate(event) {
      event.preventDefault();
      const targetPage = event.target.getAttribute("data-page");
      if (targetPage) {
        window.location.href = targetPage;
      } else {
        console.error("Enlace no válido o falta el atributo data-page");
      }
    },
  };

    // **bindEvents**: Asocia los eventos a los enlaces de navegación.
  const bindEvents = () => {
    htmlElements.navLinks().forEach((link) => {
      link.addEventListener("click", handlers.navigate);
    });
  };

// **init**: Inicializa el módulo de navegación.
  const init = () => {
    console.log("Navegación inicializada...");
    bindEvents();
  };

  return {
    htmlElements,
    handlers,
    bindEvents,
    init,
  };
})();

export default NavigationFactory;
