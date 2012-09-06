#pragma strict
var Spaces = 0.05;		//This is the width of the board squares.

function Start () {
	print("hello");
}
function Update () {
/*
    // Get the ray going through the center of the screen
    var ray : Ray = camera.ViewportPointToRay (Input.mousePosition);
    // Do a raycast
    var hit : RaycastHit;
    if (Physics.Raycast (ray, hit))
        print ("I'm looking at " + hit.transform.name);
    else
        print ("I'm looking at nothing!");
*/
//    var ray : Ray = camera.ViewportPointToRay (Input.mousePosition);

//print(Input.mousePosition);
//print(ray);

	var ray = Camera.main.ScreenPointToRay (Vector3(.5,.5,0));
	var hit : RaycastHit;
	if (Physics.Raycast (ray, hit, 100)) {
		Debug.DrawLine (ray.origin, hit.point);
	}
	//print(ray);
	//Debug.DrawLine(Input.mousePosition, hit.point);
}