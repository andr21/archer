


var pp = document.querySelector("#pp");



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;


canvas.style.background = "rgb(247, 247, 247)";


var arrow = document.getElementById('arrow');
arrow.width = 60;
arrow.height = 8;

var target = document.getElementById('target');
target.width = 30;
target.height = 30;


function TargetObj(x,y){

 this.x = x;
 this.y = y;
 
 this.draw = function(){
  ctx.drawImage(target, this.x, this.y, target.width,target.height);
 
 }

}

function ArrowObj(x,y,m,fb){

	this.x = x;
	this.y = y;
	
	this.r = 3.5;
	this.m = m;
	
	if(fb < 0){
	 this.fb = 1
	 }else{
	 this.fb = -1
	};
	
	
	this.vel = {
	x: 
	 this.fb*Math.sqrt(Math.pow(this.r,2)/(Math.pow(this.m,2) + 1))
	,
	y: 
	 -m*this.fb*Math.sqrt(Math.pow(this.r,2)/(Math.pow(this.m,2) + 1))
	 //-Math.sqrt(this.r^2*this.m^2/(this.m^2 + 1))
	};

	
	this.acc = {x: 0, y: 0.02};
	
	this.ang = findAngle(this.vel.x,this.vel.y);

	this.update = function(){

		this.x += this.vel.x;
		this.y += this.vel.y;

		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;
		
		this.ang = findAngle(this.vel.x,this.vel.y);
		
	}

	this.draw = function(){
		drawRotated(this.ang, this.x, this.y);
	}

}

function findAngle(xvel, yvel){
  return Math.atan(yvel/xvel);
}


var arrows = [];
var targets = [];


function draw(){
	canvas.width = canvas.width;

	for(var i = 0; i <= arrows.length-1; i++) {
	arrows[i].draw();
	arrows[i].update();
	}
	for(var i = 0; i <= targets.length-1; i++) {
	targets[i].draw();
	}
	
	pp.innerHTML = arrows.length;
}

setInterval(draw,5);


function drawRotated(radians, centerX, centerY){
 
    ctx.save();

    ctx.translate(centerX,centerY);
    
    ctx.rotate(radians);

    ctx.drawImage(arrow,-arrow.width/2,-arrow.height/2, arrow.width, arrow.height);

    ctx.restore();
}




canvas.addEventListener('touchstart', handleTouchStart, false);        
canvas.addEventListener('touchmove', handleTouchMove, false);
canvas.addEventListener('touchend', handleTouchEnd, false);       
                                                 

var firstTouch = null;
var lastTouch = null;


function handleTouchStart(evt) {                                         
    
    firstTouch = evt;
    lastTouch = evt;
    
    targets[targets.length] = new TargetObj(firstTouch.touches[0].clientX,firstTouch.touches[0].clientY);
     
    evt.preventDefault()
                                      
};                                                

function handleTouchMove(evt) {
    
    lastTouch = evt;

 evt.preventDefault()
                                            
};


function handleTouchEnd(evt) {    

    var xDown = firstTouch.touches[0].clientX;                                      
    var yDown = firstTouch.touches[0].clientY;                                 
    var xUp = lastTouch.touches[0].clientX;                                      
    var yUp = lastTouch.touches[0].clientY;
    
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    
    
   evt.preventDefault()
   
   
   arrows[arrows.length] = new ArrowObj(100,350,-yDiff/xDiff, -xDiff);
   
   firstTouch = null;
   lastTouch = null;
                                 
};           
