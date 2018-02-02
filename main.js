
var Person1 = new Person("Andrew","Walker",25);

function Person(Fname,Lname,Age){

	this.fullname = Fname + " " + Lname;

}


var pp = document.querySelector("#pp");
var i = 0;

function draw(){


pp.innerHTML = i;

i++;
}


//setInterval(draw,800);

pp.onclick = function(){
draw();
}


var items = [];


for (i = 0; i < 1; i++) { 
    items[i] = [];
    for (j = 0; j < 1; j++) { 

	}
}

function newItems(item,f,j){

	items[items.length] = [];
	items[items.length - 1][0] = item;
	items[items.length - 1][1] = f;
	items[items.length - 1][2] = j;

}


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;

var arrowcanvas = document.getElementById("arrowcanvas");
var arrowctx = arrowcanvas.getContext("2d");

arrowcanvas.width = 60;
arrowcanvas.height = 60;
arrowcanvas.style.display="none";

//canvas.style.background = "rgb(34, 36, 38)";

//drawDot(100,100,3);

var arrow = document.getElementById('source');
arrow.width = 60;
arrow.height = 8;

function drawDot(x,y,angle){
	//ctx.fillStyle = 'black';
    //ctx.beginPath();
    //ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    //ctx.fill();

    //ctx.drawImage(arrow, x, y, 60, 8);
    //console.log(typeof angle);
    drawRotated(angle, x, y);
}

function Particle(x,y){

	this.x = x;
	this.y = y;

	this.vel = {x: 3, y: -3};
	this.acc = {x: 0, y: 0.02};
	this.ang = findAngle(this.vel.x,this.vel.y);

//console.log(this.ang.toString());

	this.update = function(){

		//if(this.y >= 400 || this.y <= 0){
		//	this.vel.y = -this.vel.y;
		//}
		//if(this.x >= 400 || this.x <= 0){
		//	this.vel.x = -this.vel.x;
		//}

		this.x += this.vel.x;
		this.y += this.vel.y;


		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;
		
		this.ang = findAngle(this.vel.x,this.vel.y);
		
		//console.log(this.ang);
	}

	this.draw = function(){
		drawDot(this.x,this.y,this.ang)
	}

}

function findAngle(xvel, yvel){
//console.log(Math.atan(yvel/xvel).toString());
return Math.atan(yvel/xvel);

}



//var cool = new Particle(Math.floor(Math.random() * 400),400);


var balls = [];

//balls[0] = new Particle(Math.floor(Math.random() * 400),400);


function draw(){
	canvas.width = canvas.width;

	for(var i = 0; i <= balls.length-1; i++) {
	balls[i].draw();
	balls[i].update();
	}
	
	if(Math.random()>0.98)
	{
	//balls[balls.length] = new Particle(Math.floor(Math.random() * 400),400);
	}
	
}

setInterval(draw,5);

canvas.onclick = function(){

	balls[balls.length] = new Particle(Math.floor(100),400);
};



function drawRotated(radians, centerX, centerY){
    //context.clearRect(0,0,canvas.width,canvas.height);

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    ctx.save();

    // move to the center of the canvas
    ctx.translate(centerX,centerY);

    // rotate the canvas to the specified degrees
    ctx.rotate(radians);

    // draw the image
    // since the context is rotated, the image will be rotated also
    ctx.drawImage(arrow,-arrow.width/2,-arrow.height/2, arrow.width, arrow.height);

//console.log(degrees.toString());
    // we’re done with the rotating so restore the unrotated context
    ctx.restore();
}


