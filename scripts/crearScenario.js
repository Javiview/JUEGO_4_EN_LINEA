let FILAS = 6;
let COLUMNAS = 7;

let domScene = document.getElementById("tablero");

//INICIAMOS EL TABLERO POR DEFECTO
crearTablero();

function crearTablero() {
	removeTablero();

	for (let i = 0; i < FILAS; i++) {
		let domAux = `<div class = "row ${i}">`;
		for (let j = 0; j < COLUMNAS; j++) {
			domAux += `<div id="${j},${i}" class= "circle""></div>`;
		}
		domAux += `</div>`;
		domScene.innerHTML += domAux;
	}
	domScene.innerHTML += "<div class='peana-arriba'></div>";
	domScene.innerHTML += "<div class='peana-abajo'></div>";
	domScene.innerHTML += "<div class='peana-derecha'></div>";
	domScene.innerHTML += "<div class='tablero-derecha'></div>";
	domScene.innerHTML += "<div class='tablero-arriba'></div>";
}

function removeTablero() {
	domScene.innerHTML = "";
}

function crearMensajeFinal(jugador) {
	let imgGanador;
	if (jugador == "red") {
		imgGanador = "<div class='win win-red'></div>";
	} else {
		imgGanador = "<div class='win win-yellow'></div>";
	}
	document.body.innerHTML +=
		"<div class='back'><div class='cardWinner'>" +
		imgGanador +
		"<button class='btn-revancha' onclick=refrescar()>¡Revancha!</button>" +
		"</div>";
}

function refrescar() {
	location.reload();
}
