const NumberGenerator = (() => {
    let numbers = []; // Array para almacenar los números generados

    const generateRandomNumber = () => {
        const num = Math.floor(Math.random() * 98) + 1; // Genera un número entre 1 y 98
        return num < 10 ? '0' + num : num.toString(); // Asegura que el número tenga dos dígitos
    };

    const addNumber = () => {
        let newNumber;
        do {
            newNumber = generateRandomNumber(); // Genera un nuevo número
        } while (numbers.includes(newNumber)); // Repite mientras el número ya esté en la lista
        
        numbers.push(newNumber); // Agrega el nuevo número a la lista
    };

    const getNumbers = () => numbers; // Retorna la lista de números generados

    const sortAsc = () => {
        numbers.sort((a, b) => a - b); // Ordena la lista en orden ascendente
    };

    const sortDesc = () => {
        numbers.sort((a, b) => b - a); // Ordena la lista en orden descendente
    };

    const resetNumbers = () => {
        numbers = []; // Reinicia la lista de números
    };

    return {
        addNumber,
        getNumbers,
        sortAsc,
        sortDesc,
        resetNumbers
    };
})();
