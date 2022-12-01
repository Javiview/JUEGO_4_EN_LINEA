let filas = 6;
let columnas = 7;
let domScene = document.getElementById("tablero");
function crearTablero() {
	removeTablero();
	for (let i = 0; i < filas; i++) {
		let domAux = `<div class = "row ${i}">`;
		for (let j = 0; j < columnas; j++) {
			domAux += `<div id="${i},${j}" class= "circle""></div>`;
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
crearTablero();
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
