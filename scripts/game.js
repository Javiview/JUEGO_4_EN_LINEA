//TURNO DEL JUGADOR
let turnoRojo = false;

//PROGRAMA
document.getElementById("tablero").addEventListener("click", function (event) {
	try {
		let xY = event.target.id.split(",");
		let x = xY[0];
		let y = xY[1];
		for (let i = FILAS - 1; i >= 0; i--) {
			let dom = document.getElementById(`${x},${i}`);
			if (!comprobarSiHayFicha(dom)) {
				try {
					ponerFicha(dom);
				} catch (error) {}
				removeHover(dom);
				hover(document.getElementById(`${x},${i - 1}`));
				if (comprobarSiGana(dom)) {
					terminarJuego();
				}
				break;
			}
		}
	} catch (error) {}
});
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
function comprobarSiGana(dom) {
	let fichaID = dom.id.split(",");
	let fichaX = +fichaID[0];
	let fichaY = +fichaID[1];

	let turno = "red";
	if (turnoRojo) {
		turno = "yellow";
	}

	//COMPROBACIONES
	arrayComprobaciones = [
		comprobarFila(fichaX, fichaY, turno),
		comprobarColumna(fichaX, fichaY, turno),
		comprobarDiagonalIzquierda(fichaX, fichaY, turno),
		comprobarDiagonalDerecha(fichaX, fichaY, turno),
	];
	let resultado = false;
	arrayComprobaciones.some((element) => {
		if (element >= 4) {
			resultado = true;
		}
	});
	return resultado;
}
//METODOS COMPROBACIONES
function comprobarFila(fichaX, fichaY, turno) {
	let contFichas = 1;
	//Verificar: Fila - Derecha
	for (let i = fichaX + 1; i < COLUMNAS; i++) {
		if (!(document.getElementById(`${i},${fichaY}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
	}
	//Verificar: Fila - Izquierda
	for (let i = fichaX - 1; i >= 0; i--) {
		if (!(document.getElementById(`${i},${fichaY}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
	}
	return contFichas;
}
function comprobarColumna(fichaX, fichaY, turno) {
	let contFichas = 1;
	//Verificar: Columna - Abajo
	for (let i = fichaY + 1; i < FILAS; i++) {
		if (!(document.getElementById(`${fichaX},${i}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
	}
	return contFichas;
}
function comprobarDiagonalIzquierda(fichaX, fichaY, turno) {
	let contFichas = 1;
	//Verificar: Diagonal Izquierda \ - Arriba
	let contXAux = fichaX - 1;
	for (let i = fichaY - 1; i >= 0 && contXAux >= 0; i--) {
		if (!(document.getElementById(`${contXAux},${i}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
		contXAux--;
	}
	//Verificar: Diagonal Izquierda \ - Abajo
	contXAux = fichaX + 1;
	for (let i = fichaY + 1; i < FILAS && contXAux < COLUMNAS; i++) {
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
	let contFichas = 1;
	//Verificar: Diagonal Derecha / - Arriba
	contXAux = fichaX + 1;
	for (let i = fichaY - 1; i >= 0 && contXAux < COLUMNAS; i--) {
		if (!(document.getElementById(`${contXAux},${i}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
		contXAux--;
	}
	//Verificar: Diagonal Derecha / - Abajo
	contXAux = fichaX - 1;
	for (let i = fichaY + 1; i < FILAS && contXAux >= 0; i++) {
		if (!(document.getElementById(`${contXAux},${i}`).classList == "circle " + turno)) {
			break;
		} else {
			contFichas++;
		}
		contXAux--;
	}
	return contFichas;
}

//HOVER IN
document.getElementById("tablero").addEventListener("mouseover", function (event) {
	let xY = event.target.id.split(",");
	for (let i = FILAS - 1; i >= 0; i--) {
		let dom = document.getElementById(`${xY[0]},${i}`);
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
//HOVER OUT
document.getElementById("tablero").addEventListener("mouseout", function (event) {
	let xY = event.target.id.split(",");
	for (let i = FILAS - 1; i >= 0; i--) {
		let dom = document.getElementById(`${xY[0]},${i}`);
		removeHover(dom);
	}
});
function removeHover(dom) {
	try {
		dom.classList.remove("hover-red");
		dom.classList.remove("hover-yellow");
	} catch (error) {}
}

function terminarJuego() {
	if (turnoRojo) {
		crearMensajeFinal("yellow");
	} else {
		crearMensajeFinal("red");
	}
}
//Por Javier Agudo Fernandez
