var origBoard;
var id;

var aiPlayer = 'O';
var huPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
var x;
var currentPlayer = 'X';
const statusDisplay = document.querySelector('.game--status');
const score = document.querySelector('.Score');
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let player1_score = 0;
let player2_score = 0;

var dt1, dt2;
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const score_Display = () => `Score ${player1_score}-${player2_score}`;

function setoption(val, type) {
	if (type == 4) {
		if (val == 1) {
			currentPlayer = 'X';
		} else {
			currentPlayer = 'O';
		}
	} else {
		if (val == 1) {
			huPlayer = 'X';
			aiPlayer = 'O';
		} else {
			huPlayer = 'O';
			aiPlayer = 'X';
		}

	}
}
// function diff_minutes(dt2, dt1) 
//  {

//   var diff =(dt2.getTime() - dt1.getTime()) / 1000;
//   diff /= 60;
//   return Math.abs(Math.round(diff));

//  }
function startGame() {
	document.querySelector(".endgame").style.display = "none";
	statusDisplay.innerHTML = "";
	score.innerHTML = "";
	player2_score = 0;
	player1_score = 0;
	dt1 = new Date();
	origBoard = Array.from(Array(9).keys());

	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', onturnClick, false);
	}
}


function onturnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {
				index: index,
				player: player
			};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', onturnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', onturnClick, false);
		}
		dt2 = new Date();
		var res = Math.abs(dt1 - dt2) / 1000;
		// get total days between two dates
		var hours = Math.floor(res / 3600) % 24;
		// get minutes
		var minutes = Math.floor(res / 60) % 60;
		// get seconds
		var seconds = res % 60;
		var num = minutes * 60 + seconds;
		declareWinner("Tie Game! and time taken is " + num.toFixed(2) + " seconds");

		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {
			score: -10
		};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {
			score: 10
		};
	} else if (availSpots.length === 0) {
		return {
			score: 0
		};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if (player === aiPlayer) {
		var bestScore = -10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}


function handleRestartGame() {
	gameActive = true;
	gameState = ["", "", "", "", "", "", "", "", ""];
	statusDisplay.innerHTML = currentPlayerTurn();
	score.innerHTML = score_Display();
	document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
	document.querySelector('.endgame').style.display = 'none';
	origBoard = Array.from(Array(9).keys());

	// console.table(origBoard);
	// console.log(cells);
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', handleCellClick, false)
	}

}

function FinishGame() {
	score.innerHTML = score_Display();
	if (player1_score > player2_score)
		winner = "Player 1 Wins";
	else if (player2_score > player1_score)
		winner = "Player 2 Wins";
	else
		winner = "Both are having equal Score";
	declareWinner(winner);
	player1_score = 0;
	player2_score = 0;

}

function handleCellClick(clickedCellEvent) {
	const clickedCell = clickedCellEvent.target;
	const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

	if (gameState[clickedCellIndex] !== "" || !gameActive) {
		return;
	}

	handleCellPlayed(clickedCell, clickedCellIndex);
	handleResultValidation();
}


function handleCellPlayed(clickedCell, clickedCellIndex) {
	gameState[clickedCellIndex] = currentPlayer;
	clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
	currentPlayer = currentPlayer === "X" ? "O" : "X";
	statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
	let roundWon = false;
	for (let i = 0; i <= 7; i++) {
		const winCondition = winCombos[i];
		let a = gameState[winCondition[0]];
		let b = gameState[winCondition[1]];
		let c = gameState[winCondition[2]];
		if (a === '' || b === '' || c === '') {
			continue;
		}
		if (a === b && b === c) {
			roundWon = true;
			break
		}
	}

	if (roundWon) {
		if (currentPlayer == "X")
			player1_score += 1;
		else
			player2_score += 1;
		score.innerHTML = score_Display();
		declareWinner(winningMessage());
		statusDisplay.innerHTML = "";
		gameActive = false;
		return;
	}

	let roundDraw = !gameState.includes("");
	if (roundDraw) {
		declareWinner(drawMessage());
		statusDisplay.innerHTML = "";
		gameActive = false;
		return;
	}

	handlePlayerChange();
}
