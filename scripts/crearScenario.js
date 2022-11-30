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
}
function removeTablero(){
    domScene.innerHTML = "<div class='cara1'></div> <div class='cara2'></div>"
}
crearTablero();
function crearMensajeFinal(jugador){
    document.body.innerHTML += "<div class='back'><div class='cardWinner'>"
    +"<p class='"+ jugador + "'>Gana el Jugador " + jugador + "</p>"
    +"<button class='btn' onclick=refrescar()>Revancha</button>"
    +"</div></div>"
}
function refrescar(){
    location.reload();
}