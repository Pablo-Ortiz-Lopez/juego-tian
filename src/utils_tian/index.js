import { FILAS, COLUMNAS } from 'src/constants'

export const someoneWin = (tablero) => {
	return null
}

export const putFicha = (currentTablero, columna, player) => {
	const tablero = deepCopy(currentTablero)
	for (let x = 0; x < FILAS; x++) {
		// Every FICHA in COLUMNA
		const ficha = tablero[x][columna]

		if (x === FILAS - 1 && ficha === '') {
			tablero[x][columna] = player
			return tablero
		}
		if (ficha !== '') {
			if (x === 0) {
				return null
			}
			tablero[x - 1][columna] = player
			return tablero
		}
	}
}

export const printTablero = (tablero) => {
	let printStr = 'Tablero: \n'
	for (const fila of tablero) {
		let filaStr = '| '
		for (const ficha of fila) {
			filaStr += `${ficha || ' '} | `
		}
		printStr += `${filaStr}\n`
		printStr += '-----------------------------\n'
	}
	console.log(printStr)
}

export const deepCopy = (obj) => {
	return JSON.parse(JSON.stringify(obj))
}
