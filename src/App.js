import './App.css'
import React, { useEffect, useState } from 'react'
import { TABLERO_VACIO } from 'src/constants'
import { someoneWin, putFicha, printTablero, deepCopy } from './utils_pablo'
import { move } from './utils_fede'

function App() {
	const [tablero, setTablero] = useState(deepCopy(TABLERO_VACIO)) // Tablero, empieza vacio
	const [turno, setTurno] = useState('T') // Turno, empieza Tian
	const [winner, setWinner] = useState(null) // Ganador, al principio no hay

	const tirar = (columna) => {
		if (winner) return
		const updateTablero = putFicha(tablero, columna, turno)
		if (updateTablero) {
			setTablero(updateTablero)
			setTurno(turno === 'T' ? 'P' : 'T')
		}
	}

	useEffect(() => {
		if (turno === 'P' && !winner) {
			console.log('pensando...')
			tirar(move(tablero, turno))
			console.log('tirada!')
		}
	}, [turno])

	const reset = () => {
		setTablero(deepCopy(TABLERO_VACIO))
		setTurno('T')
		setWinner(null)
	}

	/* ---- REACT ---- */

	useEffect(() => {
		printTablero(tablero)
		setWinner(someoneWin(tablero))
	}, [tablero])

	const tableroStyle = {
		backgroundColor: '#0054ab',
		display: 'flex',
		flexDirection: 'column',
		padding: 10,
		width: 'min-content',
		marginLeft: '30%',
		boxShadow: '4px 6px 5px 1px rgba(0,0,0,0.42)',
	}

	const filaStyle = {
		display: 'flex',
	}

	const inputStyle = {
		padding: 10,
		width: 'min-content',
		marginLeft: '30%',
		display: 'flex',
	}
	const resultStyle = {
		backgroundColor:
			winner === 'T' ? '#ffd425' : winner === 'P' ? '#ff3d3d' : '#11e200',
		borderRadius: 25,
		width: 200,
		height: 50,
		margin: '25px 25px 25px 40%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: '4px 6px 5px 1px rgba(0,0,0,0.42)',
		cursor: 'pointer',
	}

	const fichaStyle = (ficha) => ({
		backgroundColor:
			ficha === 'T' ? '#ffd425' : ficha === 'P' ? '#ff3d3d' : '#FFFFFF',
		borderRadius: '100%',
		width: 50,
		height: 50,
		margin: 5,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	})

	return (
		<>
			<div style={inputStyle}>
				{[...Array(7).keys()].map((col) => (
					<div
						key={col}
						style={fichaStyle(winner ? '' : turno)}
						onClick={() => tirar(col)}
					/>
				))}
			</div>
			<div style={tableroStyle}>
				{tablero.map((fila) => (
					<div style={filaStyle}>
						{fila.map((ficha, i) => (
							<div key={i} style={fichaStyle(ficha)}>
								{ficha}
							</div>
						))}
						<br />
					</div>
				))}
			</div>
			<div
				style={resultStyle}
				onClick={() => {
					if (winner) {
						reset()
					}
				}}
			>
				{'Winner: '}
				{winner || 'No one.'}
				{winner && (
					<>
						<br />
						{'Press to re-start'}
					</>
				)}
			</div>
		</>
	)
}

export default App
