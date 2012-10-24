#pragma strict

class ChessBoard {
 
var board : ChessPiece[,];

var winner : int = 0;

private static final var DIMENSION : int = 8;

// Maintain the positions of the Kings specifically.
// to be used when checking for checked or check mated. 
var whiteKingX : int;
var whiteKingY : int;

var blackKingX : int;
var blackKingY : int;
	
public function ChessBoard() {
	
	var WHITE : int = ChessPiece.WHITE;
	var BLACK : int = ChessPiece.BLACK;

	Debug.Log("Initializing Chess Board");
	
	board = new ChessPiece[DIMENSION, DIMENSION];
	board[0, 0] = new Rook(WHITE);
	board[0, 1] = new Knight(WHITE);
	board[0, 2] = new Bishop(WHITE);
	board[0, 3] = new Queen(WHITE);
	board[0, 4] = new King(WHITE);
	board[0, 5] = new Bishop(WHITE);
	board[0, 6] = new Knight(WHITE);
	board[0, 7] = new Rook(WHITE);
	
	whiteKingX = 0;
	whiteKingY = 4;
	
	board[1, 0] = new Pawn(WHITE);
	board[1, 1] = new Pawn(WHITE);
	board[1, 2] = new Pawn(WHITE);
	board[1, 3] = new Pawn(WHITE);
	board[1, 4] = new Pawn(WHITE);
	board[1, 5] = new Pawn(WHITE);
	board[1, 6] = new Pawn(WHITE);
	board[1, 7] = new Pawn(WHITE);
	
	board[2, 0] = new Empty();
	board[2, 1] = new Empty();
	board[2, 2] = new Empty();
	board[2, 3] = new Empty();
	board[2, 4] = new Empty();
	board[2, 5] = new Empty();
	board[2, 6] = new Empty();
	board[2, 7] = new Empty();
	
	board[3, 0] = new Empty();
	board[3, 1] = new Empty();
	board[3, 2] = new Empty();
	board[3, 3] = new Empty();
	board[3, 4] = new Empty();
	board[3, 5] = new Empty();
	board[3, 6] = new Empty();
	board[3, 7] = new Empty();
	
	board[4, 0] = new Empty();
	board[4, 1] = new Empty();
	board[4, 2] = new Empty();
	board[4, 3] = new Empty();
	board[4, 4] = new Empty();
	board[4, 5] = new Empty();
	board[4, 6] = new Empty();
	board[4, 7] = new Empty();
	
	board[5, 0] = new Empty();
	board[5, 1] = new Empty();
	board[5, 2] = new Empty();
	board[5, 3] = new Empty();
	board[5, 4] = new Empty();
	board[5, 5] = new Empty();
	board[5, 6] = new Empty();
	board[5, 7] = new Empty();
	
	board[6, 0] = new Pawn(BLACK);
	board[6, 1] = new Pawn(BLACK);
	board[6, 2] = new Pawn(BLACK);
	board[6, 3] = new Pawn(BLACK);
	board[6, 4] = new Pawn(BLACK);
	board[6, 5] = new Pawn(BLACK);
	board[6, 6] = new Pawn(BLACK);
	board[6, 7] = new Pawn(BLACK);
	
	board[7, 0] = new Rook(BLACK);
	board[7, 1] = new Knight(BLACK);
	board[7, 2] = new Bishop(BLACK);
	board[7, 3] = new Queen(BLACK);
	board[7, 4] = new King(BLACK);
	board[7, 5] = new Bishop(BLACK);
	board[7, 6] = new Knight(BLACK);
	board[7, 7] = new Rook(BLACK);
	
	blackKingX = 7;
	blackKingY = 4;
	
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
}

/**
 * Function that will actually move a piece on the board
 * It puts an Empty object in the from position after moving the from piece to the target position
 */
function move(fromX : int, fromY : int, toX : int, toY : int) {
	var from : ChessPiece = board[fromX, fromY];
	var to : ChessPiece = board[toX, toY];
	
	// the chessboard is only concerned with the position of pieces
	// the validity of the move is handled by the Chess Mover
	// and the individual pieces
	
	Debug.Log("Moving " + from.toString() + " to the space that is ocuppied by " + to.toString());
	Debug.Log("-- (" + fromX + ", " + fromY + ") --> (" + toX + ", " + toY + ")");
	board[fromX, fromY] = new Empty();
	board[toX, toY] = from;
	
}

function setPosition(x : int, y : int, piece : ChessPiece) {
	board[x, y] = piece;
}

function setWhiteKingPosition(x : int, y : int) {
	whiteKingX = x;
	whiteKingY = y;
}

function setBlackKingPosition(x : int, y : int) {
	blackKingX = x;
	blackKingY = y;
}

/**
 * Utility method to get a piece at a specific position on the board
 */
function getPiece(x : int, y : int) {
	return board[x, y];
}

function setWinner(color : int) {
	winner = color;
}

function getWinner() {
	return winner;
}

}