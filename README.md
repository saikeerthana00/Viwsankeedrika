# Viwsankeedrika
#### Microsoft(The mars colonization program)

Viwsankeedrika is an online Tic-Tac-Toe game built by four IIT Kharagpur students.

 Shriee Viwek - Shrieeviwek - shrieeviwek3006@gmail.com

 Sai Keerthana - saikeerthana00 - saikeerthana00@gmail.com

 Sanjana Reddy - skr26 - sanju260201@gmail.com

 Chandrika Adireddi - AdireddiChL - chandrikalavanya2001@gmail.com

##### The url of the game is 
https://saikeerthana00.github.io/Viwsankeedrika/tictactoehtml.html


## Features and Functionalities of Viwsankeedrika:
    
There are two modes to play this game -
### 1) Human Player
In this mode, you can play with other astronauts in your crew.
It is a simple Tic-Tac-Toe game that you play with your colleague without any complex algorithms.
### 2) Finish Game
Viwsankeedrika has a Finish game option for human player. The result of the games played in human mode from top will be displayed 
on clicking this button.
Eg: In the set of 3 games if player 1 won two games and player 2 won one game then on clicking finish game "Player 1 wins" will be displayed. 
### 3) AI player
In this mode, the astronaut plays with the computer as his opponent. 
It is an unbeatable AI which makes the astronaut impossible to win the game. He might get lucky in mars rover mission but cannot win this game.
This mode uses the Minimax Algorithm to achieve the required unbeatable nature of it.
#### Minimax Algorithm in our code:
The function which uses the minimax algorithm is:

    function minimax(newBoard, player) {
    
    var availSpots = emptySquares();
	 
		if (checkWin(newBoard, huPlayer)) {
	    return {score: -10};
		} 
    else if (checkWin(newBoard, aiPlayer)) {
	    return {score: 10};
		} 
    else if (availSpots.length === 0) {
	    return {score: 0};
		}
		var moves = [];
		for (var i = 0; i < availSpots.length; i++) {
	  var move = {};
	  move.index = newBoard[availSpots[i]];
	  newBoard[availSpots[i]] = player;
	 
	 if (player == aiPlayer) {
	 var result = minimax(newBoard, huPlayer);
	 move.score = result.score;
	 } 
    else {
	  var result = minimax(newBoard, aiPlayer);
	  move.score = result.score;
	 }
	 
	 newBoard[availSpots[i]] = move.index;
	 moves.push(move);
		}
	 
		var bestMove;
		if(player === aiPlayer) {
	   var bestScore = -10000;
	   for(var i = 0; i < moves.length; i++) {
	     if (moves[i].score > bestScore) {
	      bestScore = moves[i].score;
	      bestMove = i;
	    }
	 }
		} 
    else {
	   var bestScore = 10000;
	   for(var i = 0; i < moves.length; i++) {
	   if (moves[i].score < bestScore) {
	   bestScore = moves[i].score;
	   bestMove = i;
	  }
	 }
	}
	 return moves[bestMove];
	}

In this way, this function returns the best move of the computer.

### 4) Time Display
After completion of each game with computer the time taken will also be displayed if the result is tie.
Now you can have scientific tournaments with your crew members even in the AI mode of game.
### 5) Choose your choice
The player has the flexibility to choose his representation in the game, either X or O.

##### References 
https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/

