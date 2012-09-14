#pragma strict

class ChessBoard {

// White Pieces
var wRook = "WR";
var wKnig = "WN";
var wBish = "WB";
var wQuee = "WQ";
var wKing = "WK";
var wPawn = "WP";

// Black Pieces
var bRook = "BR";
var bKnig = "BN";
var bBish = "BB";
var bQuee = "BQ";
var bKing = "BK";
var bPawn = "BP";

// Empty Space
var empty = "E";

var playerAction = 0;
// playerAction = 0 ==> Whites Move
// playerAction = 1 ==> Blackes Move
 
var board : String[,];
	
public function ChessBoard() {
	Debug.Log("Initializing Chess Board");
	
	board = new String[8, 8];
	board[0, 0] = wRook;
	board[0, 1] = wKnig;
	board[0, 2] = wBish;
	board[0, 3] = wQuee;
	board[0, 4] = wKing;
	board[0, 5] = wBish;
	board[0, 6] = wKnig;
	board[0, 7] = wRook;
	
	board[1, 0] = wPawn;
	board[1, 1] = wPawn;
	board[1, 2] = wPawn;
	board[1, 3] = wPawn;
	board[1, 4] = wPawn;
	board[1, 5] = wPawn;
	board[1, 6] = wPawn;
	board[1, 7] = wPawn;
	
	board[2, 0] = empty;
	board[2, 1] = empty;
	board[2, 2] = empty;
	board[2, 3] = empty;
	board[2, 4] = empty;
	board[2, 5] = empty;
	board[2, 6] = empty;
	board[2, 7] = empty;
	
	board[3, 0] = empty;
	board[3, 1] = empty;
	board[3, 2] = empty;
	board[3, 3] = empty;
	board[3, 4] = empty;
	board[3, 5] = empty;
	board[3, 6] = empty;
	board[3, 7] = empty;
	
	board[4, 0] = empty;
	board[4, 1] = empty;
	board[4, 2] = empty;
	board[4, 3] = empty;
	board[4, 4] = empty;
	board[4, 5] = empty;
	board[4, 6] = empty;
	board[4, 7] = empty;
	
	board[5, 0] = empty;
	board[5, 1] = empty;
	board[5, 2] = empty;
	board[5, 3] = empty;
	board[5, 4] = empty;
	board[5, 5] = empty;
	board[5, 6] = empty;
	board[5, 7] = empty;
	
	board[6, 0] = bPawn;
	board[6, 1] = bPawn;
	board[6, 2] = bPawn;
	board[6, 3] = bPawn;
	board[6, 4] = bPawn;
	board[6, 5] = bPawn;
	board[6, 6] = bPawn;
	board[6, 7] = bPawn;
	
	board[7, 0] = bRook;
	board[7, 1] = bKnig;
	board[7, 2] = bBish;
	board[7, 3] = bQuee;
	board[7, 4] = bKing;
	board[7, 5] = bBish;
	board[7, 6] = bKnig;
	board[7, 7] = bRook;
	
	/*board = [
		[wRook, wKnig, wBish, wQuee, wKing, wBish, wKnig, wRook],
		[wPawn, wPawn, wPawn, wPawn, wPawn, wPawn, wPawn, wPawn],
		[empty, empty, empty, empty, empty, empty, empty, empty],
		[empty, empty, empty, empty, empty, empty, empty, empty],
		[empty, empty, empty, empty, empty, empty, empty, empty],
		[empty, empty, empty, empty, empty, empty, empty, empty],
		[bPawn, bPawn, bPawn, bPawn, bPawn, bPawn, bPawn, bPawn],
		[bRook, bKnig, bBish, bQuee, bKing, bBish, bKnig, bRook] 
	];
	*/
	Debug.Log(board);
	playerAction = 0;
}

function validateMove(fromX, fromY, toX, toY) {
	
	
		// todo Implement Move Set
	
}

function checkedKing() {
	// TODO implement
	return false;
}

}