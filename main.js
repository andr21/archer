


var pp = document.querySelector("#pp");



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 400;


canvas.style.background = "rgb(247, 247, 247)";


var arrow = document.getElementById('arrow');
arrow.width = 60;
arrow.height = 8;


function drawDot(x,y,angle){
    drawRotated(angle, x, y);
}

function Particle(x,y){

	this.x = x;
	this.y = y;

	//this.vel = {x: 3, y: -3};
	this.vel = {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * -3)};
	
	
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
	
	pp.innerHTML = balls.length;
}

setInterval(draw,5);

canvas.onclick = function(){

	balls[balls.length] = new Particle(Math.floor(100),400);
};



function drawRotated(radians, centerX, centerY){
 
    ctx.save();

    ctx.translate(centerX,centerY);
    
    ctx.rotate(radians);

    ctx.drawImage(arrow,-arrow.width/2,-arrow.height/2, arrow.width, arrow.height);

    ctx.restore();
}


