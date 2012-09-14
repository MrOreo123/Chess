/*
This script checks whether the selection square is occupying the same location 
as a game piece, then checks whether the selection is turned on. If both are 
true, then the game piece will move with the selection square.

Possible Conditions:

//	1	if the selector doesn't match any game pieces
selectedGamePiece = ""
	//turns off the attempted toggle

//	1	selector is off
selectionToggle = false
	//resets the selectedGamePiece variable to a blank string

//	2	selector on, location not a match
selectionToggle = true
selectionLocation != Location
	//does nothing

//	3	selector on, location matches, but another piece has possession
selectionToggle = true
selectionLocation == Location
selectedGamePiece != Piece
	//does nothing

//	4	selector on, location matches, another pieces doesn't already have possession
selectionToggle = true
selectionLocation == Location
selectedGamePiece == Piece
	//claims ownership and moves the game piece

*/

#pragma strict
var Piece : GameObject;
var Location = Vector3(0,0,0);
//var sameLocation = false;
var frame = 1;

function Start () {

}

function Update () {
	Location = transform.position;
	//print(SelectionMovement.selectionToggle);
	
	//	4	Moves the game piece if it occupies the same square as an active selection box and matches the selected game piece name.
	if (SelectionMovement.selectionToggle == true && SelectionMovement.selectedGamePiece == Piece) {
		SelectionMovement.selectedGamePiece = Piece;
		transform.position = SelectionMovement.selectionLocation;
		print(frame + " " + SelectionMovement.selectedGamePiece + " has control. \nSelector is at " + SelectionMovement.selectionLocation + ", while Game Piece is at " + Location);
	}
	
	//	1	If selection toggle is off, this resets the selectedGamePiece variable to a blank string.
	else if (SelectionMovement.selectionToggle == false) {
		SelectionMovement.selectedGamePiece = "";
		print(frame + "Selection off.");
	}
	
	//	2	If the toggle is on, but the location doesn't match, then does nothing.
	else if (SelectionMovement.selectionToggle == true && SelectionMovement.selectionLocation != Location) {
		print(frame + " " + Piece + " doesn't match the selector's location.");
	}
	
	//	3	Checks if toggle is on, location matches, and no other piece has possession, then claims possession
	else if (SelectionMovement.selectionToggle == true && SelectionMovement.selectionLocation == Location && SelectionMovement.selectedGamePiece == "") {
		SelectionMovement.selectedGamePiece = Piece;
		print(frame + " " + SelectionMovement.selectedGamePiece + " is not the selected piece.");
	}
	
	//	3.5	Checks if toggle is on, location matches, but another piece has possession, then does nothing
	else if (SelectionMovement.selectionToggle == true && SelectionMovement.selectionLocation == Location && SelectionMovement.selectedGamePiece != Piece) {
		//SelectionMovement.selectedGamePiece = Piece;
		print(frame + " " + SelectionMovement.selectedGamePiece + " is not the selected piece.");
	}
	
	//	0	If the selector doesn't match any piece's location, turns off the attempted toggle
	else if (SelectionMovement.selectedGamePiece == "") {
		SelectionMovement.selectionToggle = false;
		print(frame + "Selector has been turned back off.");
	}
	
	//	5	You missed something if it came to this.
	else {
	//	SelectionMovement.sameLocation = false;
	//	SelectionMovement.selectionToggle = false;
	//	SelectionMovement.selectedGamePiece = "";
		print(frame + " " + Piece + " has a condition you didn't account for.");
	}
	
	frame++;
	//print(frame);
}