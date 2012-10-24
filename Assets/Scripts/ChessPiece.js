#pragma strict

class ChessPiece {
	
	public final static var WHITE : int = 0;
	public final static var BLACK : int = 1;
	public final static var EMPTY : int = -1;
	// color : 0 ==> White
	// color : 1 ==> Black
	// color : -1 ==> Empty
	private var color : int;
	
	private var name : String;
	
	private var alreadyMoved : boolean = false;
	
	public function ChessPiece(chessColor : int, chessPieceName : String) {
		Debug.Log("Creating " + ((chessColor == 0) ? "White " : "Black ") + chessPieceName);
		color = chessColor;
		name = chessPieceName;
	}
	
	/**
	 * Function to check if a piece is movable from one position to another
	 */
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessBoard, playerAction : boolean) {
		Debug.Log(name + " Moving...");
		return insideBoard(fromX, fromY) && insideBoard(toX, toY);
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
	
	public function getColor() {
		return color;
	}
	
	public function getName() {
		return name;
	}
	
	public function hasMoved() {
		return alreadyMoved;
	}
	
	public function setHasMoved(moved : boolean) {
		alreadyMoved = moved;
	}
	
	function checkedWhiteKing(board : ChessBoard) {
		// TODO implement
		return false;
	}
	
	function checkedBlackKing(board : ChessBoard) {
		return false;
	}
	
	/**
	 * Utility Method to get the color and name of the piece as a String value
	 */
	public function toString() {
		var colorString : String = "EMPTY";
		if (color == WHITE) {
			colorString = "WHITE";
		} 
		else if (color == BLACK) {
			colorString = "BLACK";
		}
		return "[" + colorString + " " + getName() + "]";
	}
	
}

class Pawn extends ChessPiece {
	
	public function Pawn(chessColor : int) {
		super(chessColor, "pawn");
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessBoard, playerAction : boolean) {
		if (!(super.movable(fromX, fromY, toX, toY, board, playerAction))) {
			return false;
		}
		
		var yDirection : int = toY - fromY;
		var xDirection : int = toX - fromX;
		
		 // white
		if (playerAction && yDirection < 0) {
			Debug.Log(toString() + " can not move backwards");
			return false;
		}
		// black pieces
		else if (!playerAction && yDirection > 0) {
			Debug.Log(toString() + " can not move backwards");
			return false;
		}
		
		if (Mathf.Abs(yDirection) < 1){
			Debug.Log(toString() + " must always move forward by atleast one square");
			return false;
		}
		
		var target : ChessPiece = board.getPiece(toX, toY);
		if (playerAction && target.getColor() == ChessPiece.WHITE) {
			Debug.Log(toString() + " can not move over a piece of the same color");
			return false;
		}
		else if (!playerAction && target.getColor() == ChessPiece.BLACK) {
			Debug.Log(toString() + " can not move over a piece of the same color");
			return false;
		}
		
		if (xDirection > 1 || xDirection < -1) {
			Debug.Log(toString() + " can not move left or right more than one space");
			return false;
		}
		else if (Mathf.Abs(xDirection) == 1) {
			if (playerAction && target.getColor() != ChessPiece.BLACK) {
				Debug.Log(toString() + " can not move left or right without killing something");
				return false;	
			}
			else if (!playerAction && target.getColor() != ChessPiece.WHITE) {
				Debug.Log(toString() + " can not move left or right without killing something");
				return false;
			}
		}
		else if (xDirection == 0 && Mathf.Abs(yDirection) > 0) {
			if (target.getColor() != ChessPiece.EMPTY) {
				Debug.Log(toString() + " can not move forward into a space that is already occupied");
				return false;	
			}
		}
		
		// update the state of the board
		board.move(fromX, fromY, toX, toY);
		
		if (playerAction && checkedWhiteKing(board)) {
			Debug.Log(toString() + " can not move so that board would be in check");
			return false;	
		}
		else if (!playerAction && checkedBlackKing(board)) {
			Debug.Log(toString() + " can not move so that board would be in check");
			return false;	
		}
		
		Debug.Log(getName() + " move passed all validations");
		return true;
	}

}

class Bishop extends ChessPiece {
	
	public function Bishop(chessColor : int) {
		super(chessColor, "bishop");
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessBoard, playerAction : boolean) {
		
		return true;
	}

}

class Rook extends ChessPiece {
	public function Rook(chessColor : int) {
		super(chessColor, "rook");
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessBoard, playerAction : boolean) {
		if (!super.movable(fromX, fromY, toX, toY, board, playerAction)) {
			return false;
		}
		
		Debug.Log(getName() + " move passed all validations");
		return true;
	}
}

class Queen extends ChessPiece {
	
	public function Queen(chessColor : int) {
		super(chessColor, "queen");
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessBoard, playerAction : boolean) {
		if (!super.movable(fromX, fromY, toX, toY, board, playerAction)) {
			return false;
		}
		
		
		Debug.Log(getName() + " move passed all validations");
		return true;
	}

}

class King extends ChessPiece {
	
	public function King(chessColor : int) {
		super(chessColor, "king");
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessBoard, playerAction : boolean) {
		if (!super.movable(fromX, fromY, toX, toY, board, playerAction)) {
			return false;
		}
		
		Debug.Log(getName() + " move passed all validations");
		return true;
	}

}

/**
 * Class representing a Knight Piece.
 */
class Knight extends ChessPiece {
	
	public function Knight(chessColor : int) {
		super(chessColor, "knight");
	}
	
	/**
	 * Function to determine if the knight piece can move the specific location
	 */
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessBoard, playerAction : boolean) {
		if (!super.movable(fromX, fromY, toX, toY, board, playerAction)) {
			return false;
		}
		
		return true;
	}

}

class Empty extends ChessPiece {
	
	public function Empty() {
		super(-1, "empty");
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessBoard, playerAction : boolean) {
		super(fromX, fromY, toX, toY, board, playerAction);
		
		Debug.Log("Empty pieces cannot move");
		return false;
	}

}