function esPalindromo(num) {
    // Verifica si el número es palíndromo en base 10
    function esPalindromoDecimal(num) {
        const strNum = num.toString();
        return strNum === strNum.split('').reverse().join('');
    }

    // Verifica si el número es palíndromo en base 2
    function esPalindromoBinario(num) {
        const binario = num.toString(2);
        return binario === binario.split('').reverse().join('');
    }

    // Comprueba ambas condiciones
    return esPalindromoDecimal(num) && esPalindromoBinario(num);
}

function verificarPalindromo() {
    const numero = parseInt(document.getElementById('numero').value);
    const resultado = document.getElementById('resultado');

    if (esPalindromo(numero)) {
        resultado.textContent = `El número ${numero} es un palíndromo en base 10 y base 2.`;
    } else {
        resultado.textContent = `El número ${numero} no es un palíndromo en ambas bases.`;
    }
}
