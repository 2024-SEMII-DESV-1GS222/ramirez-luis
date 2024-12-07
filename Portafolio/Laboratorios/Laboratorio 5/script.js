document.addEventListener("DOMContentLoaded", function() {
    const inputTexto = document.getElementById("texto");
    const selectColor = document.getElementById("color");
    const respuesta = document.getElementById("respuesta");

    // Función para actualizar el texto invertido en el 'span' dinámicamente
    inputTexto.addEventListener("input", function() {
        reverseText(inputTexto.value);
    });

    // Función para actualizar la clase del 'span' según el 'select'
    selectColor.addEventListener("change", function() {
        // Eliminar las clases de color existentes
        respuesta.classList.remove('black', 'red', 'green', 'blue');
        
        // Añadir la clase correspondiente al color seleccionado
        respuesta.classList.add(selectColor.value);
    });
});

// Función para invertir el texto ingresado
function reverseText(text) {
    let reversedText = text.split('').reverse().join('');

    // Mostrar el texto invertido
    document.getElementById('respuesta').textContent = reversedText;
}
