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
	if (!canAttack(fromX, fromY, toX, toY, board)) {
		Debug.Log("-- Chess Board Does not allow move");
		return false;
	}	
	
	Debug.Log("-- Move passed all rules to Chess!");
	
	return true;

}


/* Check if the From Piece is Valid
 Ask if the piece can validly move to the to position
 If the current player is checked or mated, invalidate the move
 If all three conditions above return true, return true and let the move pass
 */

function matedWhiteKing(board : ChessBoard){
	return false;
}

function matedBlackKing(board : ChessBoard){
	return false;
}

function canAttack(fromX : int, fromY : int, toX : int, toY : int, board : ChessBoard) {
	
	var piece : ChessPiece = board.getPiece( fromX, fromY );
	var toPiece : ChessPiece = board.getPiece( toX, toY );

	// the piece did not kill anything during this move
	piece.setKilledSomething(false);
	
	// assumes that the piece has already passed all validations in ChessMover.js
	var difX : int = Mathf.Abs(toX - fromX);
	var difY : int = Mathf.Abs(toY - fromY);
	
	var xIndex : int = fromX;
	var yIndex : int = fromY;
	
	var xIndexOld : int = fromX;
	var yIndexOld : int = fromY;
	
	var canAttack : boolean = true;
	if (difX == 0 && difY != 0) {
		if (piece.getName() == "pawn") {
			if (difY > 1 && piece.hasMoved()) {
				Debug.Log("-- -- Pawns cannot move forward more that one piece more than once");
				canAttack = false;
			}
			else if (difY > 2 && !piece.hasMoved()) {
				Debug.Log("-- -- Pawns cannot move forward more than two pieces");
				canAttack = false;
			}
		}
		if (toY > fromY) {
			for ( ; canAttack && yIndex <= toY ; yIndex++) {
				canAttack = piece.movable(xIndexOld, yIndexOld, xIndex, yIndex, board, playerAction);
				xIndexOld = xIndex;
				yIndexOld = yIndex;
				if (piece.hasKilledSomething() && xIndex != toX && yIndex != toY){
					Debug.Log("-- -- pieces cannot move beyond opposing pieces");
					canAttack = false;
				}
			}
		} 
		else {
			for ( ; canAttack && yIndex >= toY ; yIndex--) {
				canAttack = piece.movable(xIndexOld, yIndexOld, xIndex, yIndex, board, playerAction);
				xIndexOld = xIndex;
				yIndexOld = yIndex;
				if (piece.hasKilledSomething() && xIndex != toX && yIndex != toY){
					Debug.Log("-- -- pieces cannot move beyond opposing pieces");
					canAttack = false;
				}
			}
		}
	}
	else if (difX != 0 && difY == 0) {
		if (toX > fromX) {
			for ( ; canAttack && xIndex <= toX ; xIndex++) {
				canAttack = piece.movable(xIndexOld, yIndexOld, xIndex, yIndex, board, playerAction);
				xIndexOld = xIndex;
				yIndexOld = yIndex;
				if (piece.hasKilledSomething() && xIndex != toX && yIndex != toY){
					Debug.Log("-- -- pieces cannot move beyond opposing pieces");
					canAttack = false;
				}
			}
		} 
		else {
			for ( ; canAttack && xIndex >= toX ; xIndex--) {
				canAttack = piece.movable(xIndexOld, yIndexOld, xIndex, yIndex, board, playerAction);
				xIndexOld = xIndex;
				yIndexOld = yIndex;
				if (piece.hasKilledSomething() && xIndex != toX && yIndex != toY){
					Debug.Log("-- -- pieces cannot move beyond opposing pieces");
					canAttack = false;
				}
			}
		}
	}
	else if (difX == difY) {
		
		if (piece.getName() == "pawn") {
			if (difY > 1 ) {
				Debug.Log("-- -- Pawns cannot move diagonally more than one space");
				return false;
			}
		}
		
		var dirX : int = 0;
		if (toX > fromX) {
			dirX = 1;
		} 
		else if (toX < fromX) {
			dirX = -1;
		}
		
		var dirY : int = 0;
		if (toY > fromY) {
			dirY = 1;
		} 
		else if (toY < fromY) {
			dirY = -1;
		}
		
		for (; canAttack && difX >= 0; difX--) {
			xIndex = xIndex + difX;
			yIndex = yIndex + difY;
			
			canAttack = piece.movable(xIndexOld, yIndexOld, xIndex, yIndex, board, playerAction);
			xIndexOld = xIndex;
			yIndexOld = yIndex;
			if (piece.hasKilledSomething() && xIndex != toX && yIndex != toY){
				Debug.Log("-- -- pieces cannot move beyond opposing pieces");
				canAttack = false;
			}
		}
	}
	else {
		if (piece.getName() == "knight") {
			canAttack = piece.movable(fromX, fromY, toX, toY, board, playerAction);
		} else {
			canAttack = false;
		}
	}
	
	if (!canAttack) {
		board.setPosition(fromX, fromY, piece);
		board.setPosition(toX, toY, toPiece);
	}
	else {
		piece.setHasMoved(true);
	}
	
	return canAttack;
}