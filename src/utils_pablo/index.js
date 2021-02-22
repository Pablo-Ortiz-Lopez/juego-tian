import { FILAS, COLUMNAS } from 'src/constants'

export const someoneWin = (tablero) => {
	let player
	let count

	const checkFicha = (tablero, x, y) => {
		const ficha = tablero[x][y]
		if (ficha !== player) {
			count = 1
			player = ficha
		} else {
			count += 1
		}
		if (count === 4 && player !== '') {
			return player // Player -> Winner
		}
		return null
	}

	// Check FILAS
	for (let x = 0; x < FILAS; x++) {
		// Every FILA
		player = ''
		count = 0
		for (let y = 0; y < COLUMNAS; y++) {
			const winner = checkFicha(tablero, x, y)
			if (winner) return winner
		}
	}

	// Check COLUMNAS
	for (let y = 0; y < COLUMNAS; y++) {
		player = ''
		count = 0
		for (let x = 0; x < FILAS; x++) {
			const winner = checkFicha(tablero, x, y)
			if (winner) return winner
		}
	}

	// Diagonal /
	for (let i = 3; i < 9; i++) {
		let x = Math.min(i, 5) // FILAS -1
		let y = i - x
		player = ''
		count = 0
		while (x >= 0 && y <= 6) {
			// COLUMNAS -1
			const winner = checkFicha(tablero, x, y)
			if (winner) return winner
			// Update counters
			x -= 1
			y += 1
		}
	}

	// Diagonal \
	for (let i = 3; i < 9; i++) {
		let x = Math.max(5 - i, 0)
		let y = Math.max(i - 5, 0)
		player = ''
		count = 0
		while (x <= 5 && y <= 6) {
			const winner = checkFicha(tablero, x, y)
			if (winner) return winner
			// Update counters
			x += 1
			y += 1
		}
	}
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
