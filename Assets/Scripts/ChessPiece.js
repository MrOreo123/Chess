#pragma strict

class ChessPiece {
	
	// color : 0 ==> White
	// color : 1 ==> Black
	// color : -1 ==> Empty
	private var color : int;
	
	private var name : String;
	
	public function ChessPiece(chessColor : int, chessPieceName : String) {
		Debug.Log("Creating " + ((chessColor == 0) ? "White " : "Black ") + chessPieceName);
		color = chessColor;
		name = chessPieceName;
	}
	
	/**
	 * Function to check if a piece is movable from one position to another
	 */
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessPiece[,]) {
		Debug.Log(name + " Moving...");
		return true;
	}
	
	/**
	 * Utility function leveraged by movable to determine if a piece is blocked on its way to
	 * a Target Destination
	 */
	protected function isBlocked(fromX : int, fromY : int, toX : int, toY : int, board : ChessPiece[,]) {
		Debug.Log(name + " Block Check...");
		return false;
	}
	
	public function getColor() {
		return color;
	}
	
	public function getName() {
		return name;
	}
	
	public function die() {
	
	}
}

class Pawn extends ChessPiece {
	
	private var moved : boolean = false;
	
	public function Pawn(chessColor : int) {
		super(chessColor, "pawn");
		moved = false;
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessPiece[,]) {
		super(fromX, fromY, toX, toY, board);
		
		var difY : int = toY - fromY;
		var difX : int = toX - fromX;
		
		var targetPiece : ChessPiece = board[toX, toY];
		
		var color : int = super.getColor();
		
		if ((color == 0) || (difY < 0)) {
			Debug.Log("White pawns cannot move back to the white side!");
			return false;
		} else if ((color == 1) || (difY > 0)) {
			Debug.Log("Black pawns cannot move back to the black side!");
			return false;
		}
		
		if (difX > 1 || difX < -1) {
			Debug.Log("Pawns cannot move left or right more than one space");
			return false;
		}
		
		
		if (moved) {
			if (difY > 1 || difY < -1) {
				Debug.Log("Pawns cannot move more than one space forward after their initial move");
				return false;
			}
		} else {
		
			if ((difY == 2 || difY == -2) && (difX != 0)) {
				Debug.Log("Pawns cannot move two spaces and left or right");
				return false;
			}
			if (difY > 2 || difY < -2) {
				Debug.Log("Pawns cannot move more than two spaces forward during their initial move");
				return false;
			}
		}
		
		if (isBlocked(fromX, fromY, toX, toY, board)) {
				Debug.Log(getName() + " is blocked!");
				return false;
		}
		
		moved = true;
		Debug.Log(getName() + " move passed all validations");
		return true;
	}

}

class Bishop extends ChessPiece {
	
	public function Bishop(chessColor : int) {
		super(chessColor, "bishop");
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessPiece[,]) {
		super(fromX, fromY, toX, toY, board);
		
		var difY : int = Mathf.Abs(toY - fromY);
		var difX : int = Mathf.Abs(toX - fromX);
		
		if (difX != difY) {
			Debug.Log("Bishop didn't move the same amount in the 'x' and 'y' directions");
			return false;
		}
		
		if (isBlocked(fromX, fromY, toX, toY, board)) {
			Debug.Log(getName() + " is blocked!");
			return false;
		}		
		Debug.Log(getName() + " move passed all validations");
		return true;
	}

}

class Rook extends ChessPiece {
	
	private var moved : boolean = false;
	
	public function Rook(chessColor : int) {
		super(chessColor, "rook");
		moved = false;
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessPiece[,]) {
		super(fromX, fromY, toX, toY, board);
		
		var difY : int = Mathf.Abs(toY - fromY);
		var difX : int = Mathf.Abs(toX - fromX);
		
		if (difX != 0 && difY != 0) {
			Debug.Log("Rook cannot move in two directions");
			return false;
		}
				
		if (isBlocked(fromX, fromY, toX, toY, board)) {
			Debug.Log(getName() + " is blocked!");
			return false;
		}	
		moved = true;
		Debug.Log(getName() + " move passed all validations");
		return true;
	}

}

class Queen extends ChessPiece {
	
	public function Queen(chessColor : int) {
		super(chessColor, "queen");
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessPiece[,]) {
		super(fromX, fromY, toX, toY, board);
		
		var difY : int = Mathf.Abs(toY - fromY);
		var difX : int = Mathf.Abs(toX - fromX);
		
		if (difX != difY) {
			Debug.Log("Queen did not move in the diagonal");
			
			if (difX != 0 && difY != 0) {
				Debug.Log("Queen cannot move in two directions");
				return false;
			}
		} 
		
		if (isBlocked(fromX, fromY, toX, toY, board)) {
			Debug.Log(getName() + " is blocked!");
			return false;
		}	
		
		Debug.Log(getName() + " move passed all validations");
		return true;
	}

}

class King extends ChessPiece {
	
	private var moved : boolean = false;
	
	public function King(chessColor : int) {
		super(chessColor, "king");
		moved = false;
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessPiece[,]) {
		super(fromX, fromY, toX, toY, board);
		
		var difY : int = Mathf.Abs(toY - fromY);
		var difX : int = Mathf.Abs(toX - fromX);
		
		if (difY > 1) {
			Debug.Log(getName() + " cannot move more than one space forward");
			return false;
		} else if (difX > 1) {
			// todo Deal with Castleing
			Debug.Log(getName() + " cannot move more than one space left or right");
			return false;
		} 
		
		
		if (isBlocked(fromX, fromY, toX, toY, board)) {
			Debug.Log(getName() + " is blocked!");
			return false;
		}	
		
		moved = true;
		Debug.Log(getName() + " move passed all validations");
		return true;
	}

}

class Knight extends ChessPiece {
	
	public function Knight(chessColor : int) {
		super(chessColor, "knight");
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessPiece[,]) {
		super(fromX, fromY, toX, toY, board);
		
		var difY : int = Mathf.Abs(toY - fromY);
		var difX : int = Mathf.Abs(toX - fromX);
		
		if ((difY == 3 && difX == 1) || (difY == 1 && difX == 3)) {
			Debug.Log(getName() + " move passed all validations");
			return true;
		} else {
			Debug.Log(getName() + " did not move like a knight");
			return false;
		}
	}

}

class Empty extends ChessPiece {
	
	public function Empty() {
		super(-1, "empty");
	}
	
	public function movable(fromX : int, fromY : int, toX : int, toY : int, board : ChessPiece[,]) {
		super(fromX, fromY, toX, toY, board);
		
		Debug.Log("Empty pieces cannot move");
		return false;
	}

}