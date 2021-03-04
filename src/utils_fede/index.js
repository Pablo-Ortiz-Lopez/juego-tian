import { COLUMNAS, FILAS } from 'src/constants'
import { deepCopy, putFicha, someoneWin } from '../utils_pablo'
let childsVisited = 0
const evaluationTable = [
	[3, 4, 5, 7, 5, 4, 3],
	[4, 6, 8, 10, 8, 6, 4],
	[5, 8, 11, 13, 11, 8, 5],
	[5, 8, 11, 13, 11, 8, 5],
	[4, 6, 8, 10, 8, 6, 4],
	[3, 4, 5, 7, 5, 4, 3],
]

const evaluate = (tablero, player) => {
	const winner = someoneWin(tablero)
	if (winner) return winner === player ? 10000 : -10000
	let base = 138
	let sum = 0
	for (let i = 0; i < FILAS; i++) {
		for (let j = 0; j < COLUMNAS; j++) {
			if (tablero[i][j] === 'P') {
				sum += evaluationTable[i][j]
			} else if (tablero[i][j] === 'T') {
				sum -= evaluationTable[i][j]
			}
		}
	}
	return player === 'T' ? -(base + sum) : base + sum
}

const minMax_alpha_beta = (tablero, player, maximize, alpha, beta, depth) => {
	if (someoneWin(tablero) || depth === 0)
		return [null, evaluate(tablero, player)]
	let nextPlayer = maximize ? 'P' : 'T'
	let newTab = deepCopy(tablero)
	let move = null
	let bestScore = maximize ? -10000000 : 10000000
	let a = alpha
	let b = beta
	if (maximize) {
		for (const col in newTab[0]) {
			if (newTab[0][col] === '') {
				childsVisited += 1
				let child = putFicha(newTab, col, nextPlayer)
				let [, score] = minMax_alpha_beta(
					child,
					player,
					!maximize,
					a,
					b,
					depth - 1
				)
				if (score > bestScore) {
					bestScore = score
					move = col
				}
				a = Math.max(a, bestScore)
				if (a >= b) break
			}
		}
	} else {
		for (const col in newTab[0]) {
			if (newTab[0][col] === '') {
				childsVisited += 1
				let child = putFicha(newTab, col, nextPlayer)
				let [, score] = minMax_alpha_beta(
					child,
					player,
					!maximize,
					a,
					b,
					depth - 1
				)
				if (score < bestScore) {
					bestScore = score
					move = col
				}
				b = Math.min(b, bestScore)
				if (b <= a) break
			}
		}
	}
	return [move, bestScore / 2]
}

const minMax = (tablero, player, maximize, depth) => {
	if (someoneWin(tablero) || depth === 0)
		return [null, evaluate(tablero, player)]
	let nextPlayer = maximize ? 'P' : 'T'
	let newTab = deepCopy(tablero)
	let move = null
	let bestScore = maximize ? -10000000 : 10000000
	if (maximize) {
		for (const col in newTab[0]) {
			if (newTab[0][col] === '') {
				childsVisited += 1
				let child = putFicha(newTab, col, nextPlayer)
				let [, score] = minMax(child, player, !maximize, depth - 1)
				if (score > bestScore) {
					bestScore = score
					move = col
				}
			}
		}
	} else {
		for (const col in newTab[0]) {
			if (newTab[0][col] === '') {
				childsVisited += 1
				let child = putFicha(newTab, col, nextPlayer)
				let [, score] = minMax(child, player, !maximize, depth - 1)
				if (score < bestScore) {
					bestScore = score
					move = col
				}
			}
		}
	}
	return [move, bestScore / 2]
}

export const move = (tablero, player) => {
	let t_ini = Date.now()
	childsVisited = 0
	const [move, score] = minMax_alpha_beta(
		tablero,
		player,
		true,
		-10000000,
		10000000,
		9
	)
	console.log('Time: ', Date.now() - t_ini, ' move: ', move, ' score ', score)
	console.log('childs visited: ', childsVisited)
	return move
}
