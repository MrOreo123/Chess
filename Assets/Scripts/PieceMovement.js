/*
This script checks whether the selection square is occupying the same location 
as a game piece, then checks whether the selection is turned on. If both are 
true, then the game piece will move with the selection square.
*/

#pragma strict
var Piece : GameObject;
var Location = Vector3(0,0,0);
var sameLocation = false;

function Start () {

}

function Update () {
	Location = transform.position;
	
	if (sameLocation == true && SelectionMovement.selectionToggle == true) {
		transform.position = SelectionMovement.selectionLocation;
	}
	
	else if (SelectionMovement.selectionToggle == true && SelectionMovement.selectionLocation == Location) {
		//transform.position = SelectionMovement.selectionLocation;
		//print("Selection is on the same space as this piece!");
		
		sameLocation = true;
	}
	
	else {
		sameLocation = false;
		SelectionMovement.selectionToggle = false;
	}
	
	print(sameLocation);
}