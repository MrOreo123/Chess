/*
To select and de-select a game piece, press the left CTRL button.
Use arrow keys to move selection square/game piece.
*/

#pragma strict
var selectionSquare : GameObject;
var Spaces = 1;
static var selectionToggle = false;
static var sameLocation = false;
static var selectionLocation = Vector3(0,0,0);
static var chessBoard : ChessBoard;
static var selectedGamePiece;
selectedGamePiece = "";

function Start () {
	chessBoard = new ChessBoard();
}

function Update () {
	selectionLocation = transform.position;

	var xMovement = Input.GetAxis("Horizontal");
	var zMovement = Input.GetAxis("Vertical");
	
	/*	this chunk of code should be a function that is called 
	when the player tries to deactivate the selection to place 
	a piece on the board
	
	if (selectionToggle == false) {
		-script should check if selected piece is movable (not blocked)
		-call movable function to see if it's a valid move
			-if true,
				-location of piece is updated on the chessboard
				-clear fromX and fromY variables
			-if false,
				-make selectionToggle true again, because the move was not valid
	}
	*/
	
	//Move selection one square to the right.
	if (Input.GetButtonUp("Horizontal") && xMovement > 0) {
		xMovement = Mathf.Ceil(xMovement) * Spaces;
		transform.Translate(xMovement,0,0);
	}
	
	//Move selection one square to the left.
	if (Input.GetButtonUp("Horizontal") && xMovement < 0) {
		xMovement = Mathf.Floor(xMovement) * Spaces;
		transform.Translate(xMovement,0,0);
	}
	
	//Move selection one square forward.
	if (Input.GetButtonUp("Vertical") && zMovement > 0) {
		zMovement = Mathf.Ceil(zMovement) * Spaces;
		transform.Translate(0,-zMovement,0);
	}
	
	//Move selection one square back.
	if (Input.GetButtonUp("Vertical") && zMovement < 0) {
		zMovement = Mathf.Floor(zMovement) * Spaces;
		transform.Translate(0,-zMovement,0);
	}
	
	if (Input.GetButtonUp("Fire1"))	{
		selectionToggle = !selectionToggle;
		
		if (selectionToggle == true)
			transform.localScale.z *= 5;
			//save fromX and fromY location for movability calculations
			//call movable function to see if the piece is even movable (not blocked from all valid possible moves)
		else
			//call selection deactivation function above
			transform.localScale.z *= 0.2;
	}
	
	}
