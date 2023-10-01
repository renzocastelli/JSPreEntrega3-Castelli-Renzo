const body = document.getElementById("results");
const historyDiv = document.getElementById("history");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const placas = [
    { nombre: "rtx3070", precio: 500, descripcion: "placa potente" },
    { nombre: "radeon7600", precio: 450, descripcion: "placa media" },
    { nombre: "intelceleron", precio: 200, descripcion: "placa mala" }
];


let busquedasAnteriores = JSON.parse(localStorage.getItem("busquedas")) || [];
mostrarHistorial();

function mostrarHistorial() {
    historyDiv.innerHTML = "Historial de Búsquedas:";
    if (busquedasAnteriores.length > 0) {
        const historialLista = document.createElement("ul");
        busquedasAnteriores.forEach(busqueda => {
            const listItem = document.createElement("li");
            listItem.textContent = busqueda;
            historialLista.appendChild(listItem);
        });
        historyDiv.appendChild(historialLista);
    } else {
        historyDiv.innerHTML += " No hay búsquedas anteriores.";
    }
}

searchButton.addEventListener("click", function() {
    const criterioBusqueda = searchInput.value;
    buscar(criterioBusqueda);
});

searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        const criterioBusqueda = searchInput.value;
        buscar(criterioBusqueda);
    } else {
        mostrarHistorial();
    }
});

function buscar(input) {
    let inputMinusculas = input.toLowerCase();
    let resultados = placas.filter(placa => placa.nombre.toLowerCase().includes(inputMinusculas));

    if (resultados.length === 0) {
        console.log("No se encontraron resultados.");
        body.innerHTML = "No se encontraron resultados.";
    } else {
        console.log("Resultados encontrados:");
        resultados.forEach(placa => {
            console.log(`Nombre: ${placa.nombre}, Precio: $${placa.precio}, Descripción: ${placa.descripcion}`);
        });
        body.innerHTML = resultados.map(placa => `Nombre: ${placa.nombre}, Precio: $${placa.precio}, Descripción: ${placa.descripcion}`).join('<br>');
    }

    if (input.trim() !== "") {
        busquedasAnteriores.unshift(input);
        localStorage.setItem("busquedas", JSON.stringify(busquedasAnteriores));
    }
    mostrarHistorial();
}
