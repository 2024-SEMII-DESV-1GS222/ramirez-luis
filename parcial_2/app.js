const App = (() => {
    const htmlElements = {
        generarBtn: document.getElementById("generarBtn"), // Botón para generar número
        ascendenteBtn: document.getElementById("ascendenteBtn"), // Botón para ordenar ascendente
        descendenteBtn: document.getElementById("descendenteBtn"), // Botón para ordenar descendente
        numbersContainer: document.querySelector('.numbers-container'), // Contenedor para mostrar números
        limpiarBtn: document.getElementById("limpiarBtn") // Botón para limpiar la lista
    };

    const handlers = {
        generarNumero() {
            NumberGenerator.addNumber(); // Agrega un nuevo número usando el módulo
            App.renderNumbers(); // Renderiza los números en la interfaz
            //const numbers = NumberGenerator.getNumbers(); // Obtiene la lista de números generados
            //console.log(numbers); // Muestra la lista de números en la consola
        },

        ordenarAscendente() {
            NumberGenerator.sortAsc(); // Ordena la lista en forma ascendente
            App.renderNumbers(); // Renderiza la lista ordenada
        },

        ordenarDescendente() {
            NumberGenerator.sortDesc(); // Ordena la lista en forma descendente
            App.renderNumbers(); // Renderiza la lista ordenada
        },

        limpiarNumeros() {
            NumberGenerator.resetNumbers(); // Limpia la lista de números
            App.renderNumbers(); // Renderiza la lista vacía
            App.animateClearButton(); // Agrega animación al botón de limpiar
        }
    };

    const bindEvents = () => {
        // Vincula los eventos de clic a los botones
        htmlElements.generarBtn.addEventListener("click", handlers.generarNumero);
        htmlElements.ascendenteBtn.addEventListener("click", handlers.ordenarAscendente);
        htmlElements.descendenteBtn.addEventListener("click", handlers.ordenarDescendente);
        htmlElements.limpiarBtn.addEventListener("click", handlers.limpiarNumeros); // Vínculo del botón de limpiar
    };

    const renderNumbers = () => {
        const numbers = NumberGenerator.getNumbers(); // Obtiene la lista de números generados
        htmlElements.numbersContainer.innerHTML = ""; // Limpiar la lista previa

        // Crea un div para cada número y lo agrega al contenedor
        numbers.forEach(number => {
            const numberCard = document.createElement('div'); // Crea un div
            numberCard.classList.add('number-card'); // Clase para estilizar las tarjetas
            numberCard.textContent = number; // Asigna el número al contenido del div
            htmlElements.numbersContainer.appendChild(numberCard); // Agrega el div al contenedor
        });
    };

    const animateClearButton = () => {
        htmlElements.limpiarBtn.classList.add('rotate'); // Agrega la clase para girar el botón

        // Elimina la clase después de un tiempo para permitir que el botón vuelva a su posición original
        setTimeout(() => {
            htmlElements.limpiarBtn.classList.remove('rotate'); // Quita la clase
        }, 300); // Debe coincidir con la duración de la transición CSS
    };

    return {
        init() {
            bindEvents(); // Inicializa el vinculo de eventos
        },
        renderNumbers, // Exporta la función para renderizar números
        animateClearButton // Exporta la función para animar el botón de limpiar
    };
})();

App.init(); // Inicia la aplicación
