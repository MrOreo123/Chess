/*
To select and de-select a game piece, press the left CTRL button.
Use arrow keys to move selection square/game piece.
*/

#pragma strict
var selectionSquare : GameObject;
var Spaces = 1;
static var selectionToggle = false;
static var selectionLocation = Vector3(0,0,0);

function Start () {
}

function Update () {
	//Time.captureFramerate = 5;
	selectionLocation = transform.position;

	var xMovement = Input.GetAxis("Horizontal");
	var zMovement = Input.GetAxis("Vertical");
	
	//Move selection one square to the right.
	if (Input.GetButtonUp("Horizontal"))
	if (xMovement > 0) {
		xMovement = Mathf.Ceil(xMovement);
		transform.Translate(xMovement,0,0);
	}
	
	//Move selection one square to the left.
	if (Input.GetButtonUp("Horizontal"))
	if (xMovement < 0) {
		xMovement = Mathf.Floor(xMovement);
		transform.Translate(xMovement,0,0);
	}
	
	//Move selection one square forward.
	if (Input.GetButtonUp("Vertical"))
	if (zMovement > 0) {
		zMovement = Mathf.Ceil(zMovement);
		transform.Translate(0,-zMovement,0);
	}
	
	//Move selection one square back.
	if (Input.GetButtonUp("Vertical"))
	if (zMovement < 0) {
		zMovement = Mathf.Floor(zMovement);
		transform.Translate(0,-zMovement,0);
	}
	
	if (Input.GetButtonUp("Fire1"))	{
		if (selectionToggle == false)
			selectionToggle = true;
		else
			selectionToggle = false;
	}
	
	//print("Selection Active: " + selectionToggle + "\nSelection Location: " + selectionLocation);
	//print(Mathf.Round(Input.GetAxis("Horizontal")) + "," + Mathf.Round(Input.GetAxis("Vertical")));
	
}