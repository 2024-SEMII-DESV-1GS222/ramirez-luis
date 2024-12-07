const App = ((Utils) => {
    let candidatos = [];
    let pieChartInstance; // Variable para almacenar la instancia del gráfico circular

    const htmlElements = {
        agregarBtn: document.getElementById("agregarBtn"),
        nombre: document.getElementById("nombre"),
        color: document.getElementById("color"),
        candidatosBody: document.getElementById("candidatosBody"),
        barChart: document.getElementById("barChart"),
        pieChartCanvas: document.getElementById("pieChart")
    };

    const handlers = {
        agregarCandidato() {
            const nombre = htmlElements.nombre.value;
            const color = htmlElements.color.value === "random" ? Utils.generarColorAleatorio() : htmlElements.color.value;

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
            renderTable();
            renderCharts(); // Actualizar ambos gráficos
        },

        eliminarCandidato(index) {
            candidatos.splice(index, 1);
            renderTable();
            renderCharts(); // Actualizar ambos gráficos
        },

        votar(index) {
            candidatos[index].votos += 1;
            renderTable();
            renderCharts(); // Actualizar ambos gráficos
        }
    };

    const bindEvents = () => {
        htmlElements.agregarBtn.addEventListener("click", handlers.agregarCandidato);
    };

    const renderTable = () => {
        htmlElements.candidatosBody.innerHTML = "";

        candidatos.forEach((candidato, index) => {
            const fila = `
                <tr>
                    <td>${candidato.nombre}</td>
                    <td>${candidato.votos}</td>
                    <td style="background-color: ${candidato.color};"></td>
                    <td>
                        <button onclick="App.votar(${index})">Votar</button>
                        <button onclick="App.eliminarCandidato(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
            htmlElements.candidatosBody.innerHTML += fila;
        });
    };

    const renderBarChart = () => {
        const barChart = htmlElements.barChart;
        barChart.innerHTML = ""; // Limpiar el contenido previo
    
        const totalVotos = candidatos.reduce((sum, candidato) => sum + candidato.votos, 0);
        const maxBarHeight = 120; // Altura máxima para las barras
    
        candidatos.forEach(candidato => {
            const porcentaje = totalVotos === 0 ? 0 : (candidato.votos / totalVotos) * 100;
            const barraAltura = (porcentaje * maxBarHeight) / 100; // Calcula la altura de la barra en píxeles
            const barra = `
                <div class="bar" style="height: ${barraAltura}px; background-color: ${candidato.color};">
                    <span class="percentage">${candidato.nombre}: ${porcentaje.toFixed(2)}%</span>
                </div>
            `;
            barChart.innerHTML += barra;
        });
    
        if (totalVotos === 0) {
            barChart.innerHTML = "<p>No hay votos para mostrar.</p>";
        }
    };


    const renderPieChart = () => {
        if (pieChartInstance) {
            pieChartInstance.destroy(); // Destruir gráfico previo para evitar superposiciones
        }

        const labels = candidatos.map(candidato => candidato.nombre);
        const data = candidatos.map(candidato => candidato.votos);
        const backgroundColors = candidatos.map(candidato => candidato.color);

        pieChartInstance = new Chart(htmlElements.pieChartCanvas, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: backgroundColors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Distribución de votos'
                    }
                }
            }
        });
    };

    const renderCharts = () => {
        renderBarChart();
        renderPieChart();
    };

    return {
        init() {
            bindEvents();
        },
        votar: handlers.votar,
        eliminarCandidato: handlers.eliminarCandidato
    };
})(Utils);

App.init();
