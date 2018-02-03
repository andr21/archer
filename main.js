


var pp = document.querySelector("#pp");



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;


canvas.style.background = "rgb(247, 247, 247)";


var arrow = document.getElementById('arrow');
arrow.width = 60;
arrow.height = 8;


function drawDot(x,y,angle){
    drawRotated(angle, x, y);
}

function Particle(x,y,m,fb){

	this.x = x;
	this.y = y;
	
	this.r = 3.5;
	this.m = m;
	
	if(fb < 0){
	 this.fb = 1
	 }else{
	 this.fb = -1
	};
	
	//console.log(this.fb.toString());

	//this.vel = {x: 3, y: -3};
	//this.vel = {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * -3)};
	
	this.vel = {
	x: 
	 this.fb*Math.sqrt(Math.pow(this.r,2)/(Math.pow(this.m,2) + 1))
	,
	y: 
	 -m*this.fb*Math.sqrt(Math.pow(this.r,2)/(Math.pow(this.m,2) + 1))
	 //-Math.sqrt(this.r^2*this.m^2/(this.m^2 + 1))
	};
	//console.log("x: " + this.vel.x.toString());
	
	
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

//canvas.onclick = function(){

	//balls[balls.length] = new Particle(Math.floor(100),400);
//};



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


//var xDown = null;                                                        
//var yDown = null;                                                        

var firstTouch = null;
var lastTouch = null;




function handleTouchStart(evt) {                                         
    //xDown = evt.touches[0].clientX;                                      
    //yDown = evt.touches[0].clientY;
    
    firstTouch = evt;
    lastTouch = evt;
     
    
    
   evt.preventDefault()
    //console.log("touchStart");                                  
};                                                

function handleTouchMove(evt) {
    //if ( ! xDown || ! yDown ) {
    //    return;
    // }

    //var xUp = evt.touches[0].clientX;                                    
    //var yUp = evt.touches[0].clientY;

    //var xDiff = xDown - xUp;
    //var yDiff = yDown - yUp;

    //if ( Math.abs( xDiff ) > //Math.abs( yDiff ) ) {/*most significant*/
        //if ( xDiff > 0 ) {
         //j = j + 1;
     //   } else {
         //j = j - 1;
     //   }                       
   // } else {
     //   if ( yDiff > 0 ) {
         //i = i + 1;
      //  } else { 
         //i = i - 1;
     //   }                                                                 
  //  }
    
    lastTouch = evt;
 
    //console.log((-yDiff/xDiff).toString());
    
    
    //console.log((-yDiff/xDiff).toString());
 evt.preventDefault()
    /* reset values */
   // xDown = null;
    //yDown = null;                                             
};


function handleTouchEnd(evt) {    

    var xDown = firstTouch.touches[0].clientX;                                      
    var yDown = firstTouch.touches[0].clientY;                                 
    var xUp = lastTouch.touches[0].clientX;                                      
    var yUp = lastTouch.touches[0].clientY;
    
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    
    
   evt.preventDefault()
   
   console.log((-yDiff/xDiff).toString());
   
   balls[balls.length] = new Particle(100,350,-yDiff/xDiff, -xDiff);
                                 
};           
