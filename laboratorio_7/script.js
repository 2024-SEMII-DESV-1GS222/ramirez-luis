let candidatos = [];

document.getElementById("agregarBtn").addEventListener("click", agregarCandidato);

function agregarCandidato() {
    const nombre = document.getElementById("nombre").value;
    const color = document.getElementById("color").value === "random" ? generarColorAleatorio() : document.getElementById("color").value;

    if (nombre === "") {
        alert("El nombre no puede estar vacío");
        return;
    }

    const candidato = {
        nombre,
        votos: 0,
        color
    };

    candidatos.push(candidato);
    actualizarTabla();
    actualizarGrafico();
}

function eliminarCandidato(index) {
    candidatos.splice(index, 1);
    actualizarTabla();
    actualizarGrafico();
}

function votar(index) {
    candidatos[index].votos += 1;
    actualizarTabla();
    actualizarGrafico();
}

function generarColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

function actualizarTabla() {
    const tbody = document.getElementById("candidatosBody");
    tbody.innerHTML = "";

    candidatos.forEach((candidato, index) => {
        const fila = `
            <tr>
                <td>${candidato.nombre}</td>
                <td>${candidato.votos}</td>
                <td style="background-color: ${candidato.color};"></td> <!-- Solo se muestra el color de fondo -->
                <td>
                    <button onclick="votar(${index})">Votar</button>
                    <button onclick="eliminarCandidato(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
}

function actualizarGrafico() {
    const barChart = document.getElementById("barChart");
    barChart.innerHTML = ""; // Limpiar el contenido previo

    const totalVotos = candidatos.reduce((sum, candidato) => sum + candidato.votos, 0);

    candidatos.forEach(candidato => {
        const porcentaje = totalVotos === 0 ? 0 : (candidato.votos / totalVotos) * 100;
        const barra = `
            <div class="bar" style="height: ${porcentaje}%; background-color: ${candidato.color};">
                <span class="percentage">${candidato.nombre}: ${porcentaje.toFixed(2)}%</span>
            </div>
        `;
        barChart.innerHTML += barra;
    });

    if (totalVotos === 0) {
        barChart.innerHTML = "<p>No hay votos para mostrar.</p>";
    }
}
