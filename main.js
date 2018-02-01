
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


function drawDot(x,y,pointSize){
	//ctx.fillStyle = 'black';
    //ctx.beginPath();
    //ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    //ctx.fill();

    ctx.drawImage(arrow, x, y, 60, 8);
}

function Particle(x,y){

	this.x = x;
	this.y = y;

	this.vel = {x: 3, y: -3};
	this.acc = {x: 0, y: 0.02};

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
	}

	this.draw = function(){
		drawDot(this.x,this.y,3)
	}

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
