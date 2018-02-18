

//settings

var span = document.getElementsByClassName("close")[0];

var modal = document.getElementById('myModal');

var settings = document.getElementById('settings');


var maleRadio = document.getElementById('maleRadio');
var femaleRadio = document.getElementById('femaleRadio');

maleRadio.checked = true;

settings.onclick = function(){

 //pause game
 pauseplay();
 //settings menu

 if(sex == 0){
  maleRadio.checked = true;
 }else{
  femaleRadio.checked = true;
 }


 modal.style.display = "block";

}

span.onclick = function(){

  modal.style.display = "none";

  if(maleRadio.checked == true){
    sex = 0;
    setsex();
  }else{
    sex = 1;
    setsex();
  }


  pauseplay();
  
}

//add somewhere
// When the user clicks anywhere outside of the modal, close it
//window.onclick = function(event) {
    //if (event.target == modal) {
       // modal.style.display = "none";
   // }
//}






//arrows

var arrow = document.getElementById('arrow');
arrow.width = 30;
arrow.height = 4;

var arrowsustain = 200;

function ArrowObj(x,y,m,xDiff,yDiff){

	this.x = x;
	this.y = y;
	this.id = 0;
	
	var power = Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2));
	
	if(power < 90){
	 this.r = 4
	}else if(power < 250){
	 this.r = 7
	}else{
	 this.r = 8
	}
	
	this.hit = 0;
  this.hitcount = 0;
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
	
	  if(this.y >= canvas.height - ground){
	    this.hit = 1;
	    this.vel.x = 0;
	    this.vel.y = 0;
	    this.acc.x = 0;
	    this.acc.y = 0;
	  }
	 

		this.x += this.vel.x;
		this.y += this.vel.y;

		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;
		
      if(this.hit == 0){
  		  this.ang = findAngle(this.vel.x,this.vel.y);
      }else{
        this.hitcount += 1;
      }

	}
	
	

	this.draw = function(){
	if(this.hitcount > arrowsustain){
	 ctx.globalAlpha = Math.max(1-(this.hitcount-arrowsustain)/100,0);
	}
		drawArrowRotated(this.ang, this.x, this.y);
	ctx.globalAlpha = 1;
	}

}




function drawArrowRotated(radians, centerX, centerY){
 
    ctx.save();

    ctx.translate(centerX,centerY);
    
    ctx.rotate(radians);

    ctx.drawImage(arrow,-arrow.width/2,-arrow.height/2, arrow.width, arrow.height);

    ctx.restore();
}




//targeting/aiming

var target = document.getElementById('target');
target.width = 30;
target.height = 30;

function TargetObj(x,y){
 this.x = x;
 this.y = y;
 
 this.draw = function(){
 
  ctx.drawImage(target, this.x - target.width/2, this.y - target.height/2, target.width,target.height);
  

ctx.strokeStyle="#000000"
  ctx.beginPath(); 
  ctx.moveTo(this.x,this.y);
  ctx.lineTo(Xmove,Ymove);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
 
 }

}






//blood

function drawBall(x,y,size, color){

  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

}

function bloodParticle(x,y,vx,vy, ax,ay){
this.x = x;
this.y = y;
this.color = 'red';
this.size = 1.2;
this.delay = Math.random() * 30;
this.vel = {x: vx, y: vy}
this.acc = {x: ax, y: ay}
this.ground = 0;


this.update = function(){

if(this.y >= canvas.height - ground){
	    this.ground += 1;
	    this.vel.x = 0;
	    this.vel.y = 0;
	    this.acc.x = 0;
	    this.acc.y = 0;
	  }



 if(this.delay <= 0){
   this.x += this.vel.x
   this.y += this.vel.y
   this.vel.x += this.acc.x
   this.vel.y += this.acc.y
  }else{
   this.delay -= 1;
  }

}

this.draw = function(){

if(this.ground > arrowsustain){
	 ctx.globalAlpha = Math.max(1-(this.ground-arrowsustain)/100,0);
	}
    drawBall(this.x, this.y, this.size, this.color);
    ctx.globalAlpha = 1;
 }

}


function injured(x, y, arrowvel){

  for(i=1; i<=Math.random()*150+50; i++){

bloods[bloods.length] = new bloodParticle(x,y,-arrowvel.x/6 + (Math.random() * 0.4) - 0.2, arrowvel.y/6 + (Math.random() * 0.4) - 0.2, 0, 0.06);

  }


}







//clouds


var c1 = document.getElementById('c1');
var c2 = document.getElementById('c2');
var c3 = document.getElementById('c3');


function cloud(){
    this.x = 185;
    this.y = Math.random()*60 + 10;

    var randomiser = Math.random();

    if(randomiser < 0.33){
      this.img = c1;
    }
    else if(randomiser < 0.66){
      this.img = c2;
    }
    else{
      this.img = c3;
    }


    this.vel = {x: Math.random()/4, y: 0};

    this.update = function(){
         this.x += this.vel.x
         this.y += this.vel.y

    }

    this.draw = function(){
        ctx.drawImage(this.img, this.x, this.y, this.img.width/3, this.img.height/3);

    }



}





//gold and coins

// Create sprite sheet
var coinImage = document.getElementById('coin');
  
  // Create sprite
  coin = sprite({
    width: 1000,
    height: 100,
    image: coinImage,
    numberOfFrames: 10,
    ticksPerFrame: 1,
    factor: 0.3,
    x:815,
    y:8,
    freezeframe: 9
  });
  

function sprite (options) {
  
    var that = {},
      spincount = 0;
      frameIndex = 0,
      tickCount = 0,
      ticksPerFrame = options.ticksPerFrame || 0,
      numberOfFrames = options.numberOfFrames || 1;
    
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.factor = options.factor;
    that.x = options.x;
    that.y = options.y;
    that.freezeframe = options.freezeframe || 500;
    
    that.update = function () {
            if(spincount == numberOfFrames*4){
              spincount = 0;
              that.freezeframe = 9;
              
            }
            tickCount += 1;

            if (tickCount > ticksPerFrame) {

        tickCount = 0;
        
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {  
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
                
                if(that.freezeframe < 500){
                  frameIndex = that.freezeframe;
                }
            }
        };
    
    that.render = function () {
      
      // Draw the animation
      ctx.drawImage(
        that.image,
        frameIndex * that.width / numberOfFrames,
        0,
        that.width / numberOfFrames,
        that.height,
        that.x,
        that.y,
        that.factor * that.width / numberOfFrames,
        that.factor * that.height);
    
    if(that.freezeframe == 500){
      spincount += 1;
    }
    
    
    };
    
    return that;
  }








//tools


function findAngle(xvel, yvel){
  if(xvel >0){
    return Math.atan(yvel/xvel);
  }else{
    return Math.atan(yvel/xvel) + Math.PI
  }
}




//reload


function reload(x,y){

this.x = x;
this.y = y;
this.width = 50;
this.height = 8;
this.segs = 5;
this.ticks = 0;
this.reloadspeed = 15;
this.track = 0;
this.done = false;


this.draw = function(){

      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      //ctx.fillStyle = 'yellow';
      //ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.closePath();
      
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.track, this.height);
      ctx.fillStyle = 'black';
      ctx.fill();
      //ctx.lineWidth = 2;
      //ctx.strokeStyle = 'black';
      //ctx.stroke();
      ctx.closePath();
      
      
}


this.update = function(){

if(this.ticks % this.reloadspeed == 0){

  this.track += this.width/this.segs;
  if(this.track > this.width){
    this.done = true;
  }
}

this.ticks += 1;
}


}

