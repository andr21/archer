


var pp = document.querySelector("#pp");



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

canvas.width = 800;
canvas.height = 400;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Width: " + canvas.width.toString());
    console.log("Height: " + canvas.height.toString());
}
//window.addEventListener('resize', resize, false);


//canvas.style.background = "rgb(247, 247, 247)";

var rect = canvas.getBoundingClientRect();


var arrow = document.getElementById('arrow');
arrow.width = 30;
arrow.height = 4;

var target = document.getElementById('target');
target.width = 30;
target.height = 30;

var ground = 50;
var arrowsustain = 200;


function EnemyObj(x,y){
  this.x = x;
  this.y = y;
  this.drawSquares = true;
  
  this.vel = {x: -0.35, y: 0};
  
  this.head = {
    xoff: 5
  , yoff: 0
  , width: 20
  , height: 20
  };
  
  this.body = {
    xoff: 0
  , yoff: 20
  , width: 30
  , height: 30
  };
  
  this.legs = {
    xoff: 6
  , yoff: 50
  , width: 18
  , height: 20
  };
  
  this.draw = function(){
  if(this.drawSquares == true){
   drawboxes(this.x,this.y,this.head);
   drawboxes(this.x,this.y,this.body);
   drawboxes(this.x,this.y,this.legs);
   }
  }
  
  this.update = function(){
   this.x += this.vel.x;
  }
}

function drawboxes(x,y,part){
ctx.strokeStyle="#FF69FF";
ctx.rect(x + part.xoff,y + part.yoff,part.width,part.height);
ctx.stroke();

}


function TargetObj(x,y){
 this.x = x;
 this.y = y;
 
 this.draw = function(){
 
  ctx.drawImage(target, this.x - target.width/2, this.y - target.height/2, target.width,target.height);
  
  ctx.beginPath(); 
  ctx.moveTo(this.x,this.y);
  ctx.lineTo(Xmove,Ymove);
  ctx.stroke();
 
 }

}

function ArrowObj(x,y,m,xDiff,yDiff){

	this.x = x;
	this.y = y;
	
	var power = Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2));
	
	if(power < 90){
	 this.r = 4
	}else if(power < 300){
	 this.r = 7
	}else{
	 this.r = 8
	}
	
	this.hit = 0
	this.m = m;
	
	if(xDiff < 0){
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
	};

	
	this.acc = {x: 0, y: 0.06};
	
	this.ang = findAngle(this.vel.x,this.vel.y);

	this.update = function(){
	 if(this.y < canvas.height - ground){

		this.x += this.vel.x;
		this.y += this.vel.y;

		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;
		
		this.ang = findAngle(this.vel.x,this.vel.y);
		}else{
		 this.hit += 1;
		}
	}
	
	

	this.draw = function(){
	if(this.hit > arrowsustain){
	 ctx.globalAlpha = Math.max(1-(this.hit-arrowsustain)/100,0);
	}
		drawRotated(this.ang, this.x, this.y);
	ctx.globalAlpha = 1;
	}

}

function findAngle(xvel, yvel){
if(xvel >0){
  return Math.atan(yvel/xvel);
}else{
  return Math.atan(yvel/xvel) + Math.PI
}
}


var arrows = [];
var targets = [];
var enemys = [];

enemys[enemys.length] = new EnemyObj(750,280);


function draw(){
	canvas.width = canvas.width;

	for(var i = 0; i <= arrows.length-1; i++) {
	 arrows[i].draw();
	 arrows[i].update();
	 if(arrows[i].hit > arrowsustain + 100){
	  arrows.splice(i,1);
	 }
	 
	}
	for(var i = 0; i <= targets.length-1; i++) {
	targets[i].draw();
	}
	for(var i = 0; i <= enemys.length-1; i++) {
	enemys[i].draw();
	enemys[i].update();
	}
	
	pp.innerHTML = arrows.length;
}

setInterval(draw,10);


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
var moved = false;
var Xmove;
var Ymove;


function handleTouchStart(evt) {                                         
    
    firstTouch = evt;
    lastTouch = evt;
    
    
    rect = canvas.getBoundingClientRect();

var Xclick = evt.touches[0].clientX - rect.left;
var Yclick = evt.touches[0].clientY - rect.top;
    
  Xmove = Xclick;
  Ymove = Yclick;  
    //targets[targets.length] = new TargetObj(firstTouch.touches[0].clientX,firstTouch.touches[0].clientY);
     targets[targets.length] = new TargetObj(Xclick,Yclick);
     
    evt.preventDefault()
                                    
};                                                

function handleTouchMove(evt) {
    
    if(evt.touches.length = 1){
    
    lastTouch = evt;
    moved = true;
    
    rect = canvas.getBoundingClientRect();

Xmove = evt.touches[0].clientX - rect.left;
Ymove = evt.touches[0].clientY - rect.top;

 evt.preventDefault()
 }
 
 //pp.innerHTML = evt.touches.length;
                                        
};


function handleTouchEnd(evt) {    

   if(moved == true){
    var xDown = firstTouch.touches[0].clientX;                                      
    var yDown = firstTouch.touches[0].clientY;                                 
    var xUp = lastTouch.touches[0].clientX;                                      
    var yUp = lastTouch.touches[0].clientY;
    
    var xDiff = xUp - xDown;
    var yDiff = yUp - yDown;
    
    
  evt.preventDefault()
   

   
   arrows[arrows.length] = new ArrowObj(100,canvas.height-80,-yDiff/xDiff, xDiff, yDiff);
   
   };
   
   firstTouch = null;
   lastTouch = null;
   moved = false;
   targets = [];
                                 
};           
