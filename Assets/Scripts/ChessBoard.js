#pragma strict

class ChessBoard {

var playerAction = 0;
// playerAction = 0 ==> Whites Move
// playerAction = 1 ==> Blackes Move
 
var board : ChessPiece[,];
	
public function ChessBoard() {
	Debug.Log("Initializing Chess Board");
	
	board = new ChessPiece[8, 8];
	board[0, 0] = new Rook(0);
	board[0, 1] = new Knight(0);
	board[0, 2] = new Bishop(0);
	board[0, 3] = new Queen(0);
	board[0, 4] = new King(0);
	board[0, 5] = new Bishop(0);
	board[0, 6] = new Knight(0);
	board[0, 7] = new Rook(0);
	
	board[1, 0] = new Pawn(0);
	board[1, 1] = new Pawn(0);
	board[1, 2] = new Pawn(0);
	board[1, 3] = new Pawn(0);
	board[1, 4] = new Pawn(0);
	board[1, 5] = new Pawn(0);
	board[1, 6] = new Pawn(0);
	board[1, 7] = new Pawn(0);
	
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
	
	board[6, 0] = new Pawn(1);
	board[6, 1] = new Pawn(1);
	board[6, 2] = new Pawn(1);
	board[6, 3] = new Pawn(1);
	board[6, 4] = new Pawn(1);
	board[6, 5] = new Pawn(1);
	board[6, 6] = new Pawn(1);
	board[6, 7] = new Pawn(1);
	
	board[7, 0] = new Rook(1);
	board[7, 1] = new Knight(1);
	board[7, 2] = new Bishop(1);
	board[7, 3] = new Queen(1);
	board[7, 4] = new King(1);
	board[7, 5] = new Bishop(1);
	board[7, 6] = new Knight(1);
	board[7, 7] = new Rook(1);
	
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

function validateMove(fromX : int, fromY : int, toX : int, toY : int) {
	
	if (!insideBoard(fromX, fromY)) {
		Debug.Log("From position not inside board");
		return false;
	} else if (!insideBoard(toX, toY)) {
		Debug.Log("To position is not inside board");
		return false;
	}
	
	var piece : ChessPiece = board[fromX, fromY];
	if (piece.getName() === "empty") {
		Debug.Log("From position is an empty piece");
		return false;
	} else {
		
		var targetPiece : ChessPiece = board[toX, toY];
		if (piece.getColor() == targetPiece.getColor()) {
			Debug.Log("Pieces cannot occupy the same space as another piece of the same color");
			return false;
		}
		
		if (!piece.movable(fromX, fromY, toX, toY)) {
			Debug.Log(piece.getName() + " cannot move from (" 
			+ fromX + ", " + fromY + ") to ("+ fromX + ", " + fromY + ")");
			
			return false;
		} 
		// todo deal with pieces in the way...
		
		if (targetPiece.getColor() > -1){
			targetPiece.die();
		}
		
		board[toX, toY] = piece;
		
		return true;
	}

}

/**
 * Utility method used to check if a space is inside the board
 */
function insideBoard(x : int, y : int) {
	if (x < 0 || x > 7) {
		return false;
	} else if (y < 0 || y > 7) {
		return false;
	} else {
		return true;
	}
}

function checkedKing() {
	// TODO implement
	return false;
}

}