#pragma strict

var playerAction : boolean = true;
// playerAction = true ==> Whites Move
// playerAction = false ==> Blackes Move

function canMove(fromX : int, fromY : int, toX : int, toY : int, board : ChessBoard) {
	
	Debug.Log("[" + fromX + ", " + fromY + "] : [" + toX + ", " + toY + "] ???");
	
	var fromPiece : ChessPiece = board.getPiece(fromX, fromY);
	var fromColor : int = fromPiece.getColor();
	if (fromColor == ChessPiece.EMPTY) {
		Debug.Log("-- Cannot start with an Empty Space : " + fromX + ", " + fromY);
		return false;
	}
	else if (playerAction && fromColor != ChessPiece.WHITE) {
		Debug.Log("-- White Piece Players can only move white pieces");
		return false;
	}
	else if (!playerAction && fromColor != ChessPiece.BLACK) {
		Debug.Log("-- Black Piece Players can only move Black pieces");
		return false;
	}
	
	// need to check if from piece can move to the target position
	// -- check if the piece is blocked in the course of moving
	if (!board.canAttack(fromX, fromY, toX, toY)) {
		Debug.Log("-- Chess Board Does not allow move");
		return false;
	}
	
	// check if the player would be checked by making the move
	if (playerAction && checkedWhiteKing(board, fromX, fromY)){
		Debug.Log("-- White would be checked if move was made...");
		return false;
	}
	else if (!playerAction && checkedBlackKing(board, fromX, fromY)){
		Debug.Log("-- Black would be checked if move was made...");
		return false;
	}
	
	
	Debug.Log("-- Move passed all rules to Chess!");
	board.move(fromX, fromY, toX, toY);
	
	return true;

}


/* Check if the From Piece is Valid
 Ask if the piece can validly move to the to position
 If the current player is checked or mated, invalidate the move
 If all three conditions above return true, return true and let the move pass
 */
 
function checkedWhiteKing(board : ChessBoard, x : int, y : int) {
	// TODO implement
	return false;
}

function checkedBlackKing(board : ChessBoard, x : int, y : int) {
	return false;
}

function matedWhiteKing(board : ChessBoard){
	return false;
}

function matedBlackKing(board : ChessBoard){
	return false;
}