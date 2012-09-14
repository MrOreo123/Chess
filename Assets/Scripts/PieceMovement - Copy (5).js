/*
This script checks whether the selection square is occupying the same location 
as a game piece, then checks whether the selection is turned on. If both are 
true, then the game piece will move with the selection square.

TO DO LIST:
- For kill function, create 3 arrays: Name of each piece, location of each piece, and timestamp of when it got there.
- When selection is turned off, check whether the active piece's location matches another piece's location.
- Check the timestamps.
- The older of the two pieces gets killed.

*/

#pragma strict
var Piece : GameObject;
var Location = Vector3(0,0,0);
//var sameLocation = false;
//var frame = 1;

function Start () {

}

function Update () {
	Location = transform.position;
	
	//	0	If another game piece is dropped on top of this piece, then kill this piece.
	if (SelectionMovement.selectionToggle == false && SelectionMovement.selectedGamePiece != Piece && SelectionMovement.selectedGamePiece != "" && SelectionMovement.selectionLocation == Location) {
		transform.Translate(0,0,-2);
		print(Piece + " has been killed.");
	}
		
	//	1	If selection toggle is off, this resets the selectedGamePiece variable to a blank string.
	if (SelectionMovement.selectionToggle == false) {
		SelectionMovement.selectedGamePiece = "";
		//print(/*frame +*/ " Selection off. Active Game Piece is " + SelectionMovement.selectedGamePiece);
	}
	
	//	2	If the toggle is on, but the location doesn't match, then does nothing.
	if (SelectionMovement.selectionToggle == true && SelectionMovement.selectionLocation != Location) {
		//print(/*frame + " " +*/ Piece + " doesn't match the selector's location.");
	}
	
	//	3	Checks if toggle is on, location matches, and no other piece has possession, then claims possession
	if (SelectionMovement.selectionToggle == true && SelectionMovement.selectionLocation == Location && SelectionMovement.selectedGamePiece == "") {
		SelectionMovement.selectedGamePiece = Piece;
		//print(/*frame + " " +*/ Piece + " has just been selected.");
	}
	
	//	3.5	Checks if toggle is on, location matches, but another piece has possession, then does nothing
	if (SelectionMovement.selectionToggle == true && SelectionMovement.selectionLocation == Location && SelectionMovement.selectedGamePiece != Piece) {
		//SelectionMovement.selectedGamePiece = Piece;
		//print(/*frame + " " +*/ Piece + " is not the selected piece.");
	}
	
	//	4	Moves the game piece if it occupies the same square as an active selection box and matches the selected game piece name.
	if (SelectionMovement.selectionToggle == true && SelectionMovement.selectedGamePiece == Piece) {
		SelectionMovement.selectedGamePiece = Piece;
		transform.position = SelectionMovement.selectionLocation;
		//print(/*frame + " " +*/ SelectionMovement.selectedGamePiece + " has control.");
	}
	
}