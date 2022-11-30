let turnoRojo = false;

function comprobarSiGana(dom) {
	let fichaId = dom.id.split(",");
	let fichaX = +fichaId[0];
	let fichaY = +fichaId[1];
	let turno = "red";
	if (turnoRojo) {
		turno = "yellow";
	}
	let contadorFichas = 1;
	//METODOS MODIFICAR
	//Comprobar Derecha
	arrayComprobaciones = [
		comprobarFila(fichaX, fichaY, turno),
		comprobarColumnas(fichaX, fichaY, turno),
		comprobarDiagonalIzquierda(fichaX, fichaY, turno),
		comprobarDiagonalDerecha(fichaX, fichaY, turno)
	];
	let resultado = false;
	arrayComprobaciones.some(element => {
		if(element >= 4){
			resultado = true;
		}
	});
	return resultado;
	
}
function comprobarFila(fichaX, fichaY, turno) {
	let contFichas = 1;
	for (let i = fichaY + 1; i < columnas; i++) {
		if (!(document.getElementById(`${fichaX},${i}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
	}
	//Comprobar Izquierda
	for (let i = fichaY - 1; i > 0; i--) {
		if (!(document.getElementById(`${fichaX},${i}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
	}
	console.log(contFichas);
	return contFichas;
}
function comprobarColumnas(fichaX, fichaY, turno) {
	let contFichas = 1;
	for (let i = fichaX + 1; i < filas; i++) {
		if (!(document.getElementById(`${i},${fichaY}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
	}
	return contFichas;
}
function comprobarDiagonalIzquierda(fichaX, fichaY, turno) {
	let contFichas = 1;
	let contXAux = fichaX - 1;
	for (let i = fichaY - 1; i > 0 && contXAux > 0; i--) {
		if (!(document.getElementById(`${contXAux},${i}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
		contXAux--;
	}
	//Comprobar Diagonal Izq Abajo
	contXAux = fichaX + 1;
	for (let i = fichaY + 1; i < columnas && contXAux < filas; i++) {
		if (!(document.getElementById(`${contXAux},${i}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
		contXAux++;
	}
	return contFichas;
}
function comprobarDiagonalDerecha(fichaX, fichaY, turno) {
	//Comprobar Diagonal Derecha Arriba
	let contFichas = 1;
	contXAux = fichaX - 1;
	for (let i = fichaY + 1; i < columnas && contXAux > 0; i++) {
		if (!(document.getElementById(`${contXAux},${i}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
		contXAux--;
	}

	//Comprobar Diagonal Derecha Abajo
	contYAux = fichaY - 1;
	for (let i = fichaX + 1; i < filas && contYAux > 0; i++) {
		if (!(document.getElementById(`${i},${contYAux}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
		contYAux--;
	}
	return contFichas;
}
document.getElementById("tablero").addEventListener("click", function (event) {
	let y = event.target.id.split(",");
	y = y[1];
	for (let i = filas - 1; i >= 0; i--) {
		let dom = document.getElementById(`${i},${y}`);
		if (!comprobarSiHayFicha(dom)) {
			try {
				ponerFicha(dom);
			} catch (error) {}
			removeHover(dom);
			hover(document.getElementById(`${i - 1},${y}`));
			if (comprobarSiGana(dom)) {
				terminarJuego();
			}
			break;
		}
	}
});

document.getElementById("tablero").addEventListener("mouseover", function (event) {
	let y = event.target.id.split(",");
	for (let i = filas - 1; i >= 0; i--) {
		let dom = document.getElementById(`${i},${y[1]}`);
		if (!comprobarSiHayFicha(dom)) {
			hover(dom);
			break;
		}
	}
});
function hover(dom) {
	try {
		if (!comprobarSiHayFicha(dom)) {
			if (turnoRojo) {
				dom.classList.add("hover-red");
			} else {
				dom.classList.add("hover-yellow");
			}
		}
	} catch (error) {}
}
document.getElementById("tablero").addEventListener("mouseout", function (event) {
	let y = event.target.id.split(",");
	for (let i = filas - 1; i >= 0; i--) {
		let dom = document.getElementById(`${i},${y[1]}`);
		removeHover(dom);
	}
});
function removeHover(dom) {
	try {
		dom.classList.remove("hover-red");
		dom.classList.remove("hover-yellow");
	} catch (error) {}
}

function comprobarSiHayFicha(dom) {
	let hayFicha = false;
	try {
		if (dom.classList == "circle red" || dom.classList == "circle yellow") {
			hayFicha = true;
		}
		if (dom.classList == "circle hover-red red" || dom.classList == "circle hover-red yellow") {
			hayFicha = true;
		}
		if (
			dom.classList == "circle hover-yellow red" ||
			dom.classList == "circle hover-yellow yellow"
		) {
			hayFicha = true;
		}
	} catch (error) {}

	return hayFicha;
}
function ponerFicha(dom) {
	if (turnoRojo) {
		dom.className += " red";
		turnoRojo = false;
	} else {
		dom.className += " yellow";
		turnoRojo = true;
	}
}
function terminarJuego() {
	if (turnoRojo) {
		crearMensajeFinal("Amarillo");
	} else {
		crearMensajeFinal("Rojo");
	}
}
