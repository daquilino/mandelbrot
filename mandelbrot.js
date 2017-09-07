
//================== global variables =====================
var canvasX = window.innerWidth - 20;
var canvasY = window.innerHeight - 20;

var originx = canvasX/2;
var originy = canvasY/2;
var radius = canvasY/2 -20 ;
var numPoints= 200;
var multiple = 2;

var dots = [];//array to store dot(s)

//dot object constructor
function dot(x,y){this.x = x; this.y = y};

//================== functions ============================

function setup() 
{
  createCanvas(canvasX, canvasY);
  background(0);
  frameRate(10);
}

// resize window test code
// function windowResized() {
// 	canvasX = window.innerWidth - 20;
// 	canvasY = window.innerHeight - 20;

// 	resizeCanvas(canvasX, window.canvasY);
//   	originx = canvasX/2;
//  	originy = canvasY/2;
// 	if(radius*2 >= canvasX || radius*2 >= canvasY)
// 	{	
// 		radius = canvasX/2 -20 ;
// 	}
// 	else
// 	{
// 		radius = canvasX/2 -20;
// 	}
// }


//=============================================
function draw()
{
	background(0);
	numPoints = Math.floor(mouseX);//gets number of points from mouse position
	if(numPoints < 0)
	{
		numPoints = 0;
	}	

	//console.log("number of points: " + numPoints)//TEST CODE
	makepoints();
	drawpoints();
	drawlines();	
}


//=============================================
function makepoints()
{	
	var inc = (2*Math.PI)/numPoints;
	var angle = 0;
	dots = [];

	while(angle < 2 * Math.PI)
	{	
		dots.push(new dot(Math.round(originx + radius*sin(angle)),Math.round( originy + radius*cos(angle))));
	 	angle += inc;
 	}	
}

//=============================================
function drawpoints()
{
	for(var key in dots)
	{
		strokeWeight(2);
		stroke(255,255,0);	
		point(dots[key].x, dots[key].y);
	}	
}

//=============================================

function drawlines()
{
	for(var i = 0; i < numPoints; i++)
	{
		var j = i * multiple;
		
		if(i >= Math.floor(numPoints/multiple))
		{
			while (j >= numPoints)
			{
				j -= numPoints;
			}
			//j = getj(j);	dosen't work; recursive attempt
		}
		
		//console.log("i: " + i +"  j: " + j);//TEST CODE
		strokeWeight(1);
		stroke(0,0,255);
		//rainbow lines
		//stroke(random(255), random(255), random(255));
		line(dots[i].x, dots[i].y, dots[j].x, dots[j].y)
	}	
}
//=============================================

function mousePressed()
{
	if(mouseButton == LEFT)
	{	
		multiple++;
	}
	if (mouseButton == CENTER && multiple != 2)
	{
		multiple--;
	}

	console.log("multiple: " + multiple);

}


//=============================================
// dosen't work; recursive attempt

function getj(i)
{
	var j = i-numPoints;

	if(j > numPoints)
	{
		getj(j);
		return j;
	}
	
	return j;
}

//=====================================
function mouseWheel(event)
{
	multiple -= event.delta/100;
	if(multiple < 0)
	{
		multiple = 1 ;
	}	
	//console.log("multiple: " + multiple);
}

