#pragma strict

class ChessBoard {

var playerAction : boolean = true;
// playerAction = true ==> Whites Move
// playerAction = false ==> Blackes Move
 
var board : ChessPiece[,];

private static var WHITE : int = 0;
private static var BLACK : int = 1;
private static var EMPTY : int = -1;
	
public function ChessBoard() {
	Debug.Log("Initializing Chess Board");
	
	board = new ChessPiece[8, 8];
	board[0, 0] = new Rook(WHITE);
	board[0, 1] = new Knight(WHITE);
	board[0, 2] = new Bishop(WHITE);
	board[0, 3] = new Queen(WHITE);
	board[0, 4] = new King(WHITE);
	board[0, 5] = new Bishop(WHITE);
	board[0, 6] = new Knight(WHITE);
	board[0, 7] = new Rook(WHITE);
	
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
	playerAction = true;
}

/**
 * Function used to validate a move from selection movement. If it returns
 * false, then the move was invalid, and selection movement should reset the turn.
 */
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
		if (playerAction && piece.getColor() != 0) {
			Debug.Log("White Piece Players can only move white pieces");
			return false;
		}
		if (!playerAction && piece.getColor() != 1) {
			Debug.Log("Black Piece Players can only move black pieces");
			return false;
		}
		
		var targetPiece : ChessPiece = board[toX, toY];
		if (piece.getColor() == targetPiece.getColor()) {
			Debug.Log("Pieces cannot occupy the same space as another piece of the same color");
			return false;
		} else {
			// special rules for pawns
			
			if (piece.getName() === "pawn") {
				var difX : int = Mathf.Abs(toX - fromX);
			  	if (difX == 1 && targetPiece.getName() === "empty") {
			  		Debug.Log("Pawns cannot move left or right unless they are killing something");
					return false;
			  	}
			}
		}
		
		if (!piece.movable(fromX, fromY, toX, toY, board)) {
			Debug.Log(piece.getName() + " cannot move from (" 
			+ fromX + ", " + fromY + ") to ("+ fromX + ", " + fromY + ")");
			
			return false;
		} 
		// todo deal with pieces in the way...
		
		if (targetPiece.getColor() > -1){
			targetPiece.die();
		}
		board[fromX, fromY] = new Empty();
		board[toX, toY] = piece;
		
		playerAction = !playerAction;
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