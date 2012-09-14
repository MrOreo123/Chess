/*
This script checks whether the selection square is occupying the same location 
as a game piece, then checks whether the selection is turned on. If both are 
true, then the game piece will move with the selection square.
*/

#pragma strict
var Piece : GameObject;
var Location = Vector3(0,0,0);
//var sameLocation = false;

function Start () {

}

function Update () {
	Location = transform.position;
	
	//Moves the game piece if it occupies the same square as an active selection box and matches the selected game piece name.
	if (SelectionMovement.selectionToggle == true && SelectionMovement.sameLocation == true && SelectionMovement.selectedGamePiece == Piece) {
		transform.position = SelectionMovement.selectionLocation;
		print(SelectionMovement.selectedGamePiece);
	}
	
	//Checks whether the selection box is active and occupies the same space as this game piece, then sets the selected game piece.
	else if (SelectionMovement.selectionToggle == true && SelectionMovement.selectionLocation == Location) {
		SelectionMovement.sameLocation = true;
		SelectionMovement.selectedGamePiece = Piece;
		print(SelectionMovement.selectedGamePiece);
	}
	
	//Do nothing, because another game piece set the sameLocation variable to be true.
	else if (SelectionMovement.sameLocation == true) {
		print(SelectionMovement.selectedGamePiece);
	}
	
	//Otherwise, it sets the check variables to false.
	else {
		SelectionMovement.sameLocation = false;
		SelectionMovement.selectionToggle = false;
		SelectionMovement.selectedGamePiece = "";
		print(SelectionMovement.selectedGamePiece);
	}
	
	//print(sameLocation);
}