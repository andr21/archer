//archer breathing?
//reload bar
//enemies death animation
//enemies health bar?
//open m or f
//big enemy
//lives
//make better target image
//music
//levels + shop
//shop items - extra damage, double arrow, no reload, slow arrow, visuals - a hat, castle flag




var pp = document.querySelector("#pp");
var goldcounter = document.querySelector("#gold");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

canvas.width = 900;
canvas.height = 450;

var sex = 0;

if(sex == 0){
archerImgs.head = document.getElementById('mhead');
archerImgs.headb = document.getElementById('mheadb');
}else{
archerImgs.headb = document.getElementById('fheadb');
archerImgs.head = document.getElementById('fhead');
}

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

var gold = 0;


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




function drawboxes(x,y,part){
  ctx.beginPath();
ctx.strokeStyle="#FF69FF";
ctx.rect(x + part.xoff,y + part.yoff,part.width,part.height);
ctx.stroke();
ctx.closePath();

}


function TargetObj(x,y){
 this.x = x;
 this.y = y;
 
 this.draw = function(){
 
  ctx.drawImage(target, this.x - target.width/2, this.y - target.height/2, target.width,target.height);
  

ctx.strokeStyle="#000000"
  ctx.beginPath(); 
  ctx.moveTo(this.x,this.y);
  ctx.lineTo(Xmove,Ymove);
  ctx.stroke();
  ctx.closePath();
 
 }

}

function ArrowObj(x,y,m,xDiff,yDiff){

	this.x = x;
	this.y = y;
	
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
var bloods = [];
var clouds = [];

var enemyGap = 30;
var enemyGapCount = 0;
var cloudGap = 20;
var cloudGapCount = 0;

var archers = new archer(80,330);


enemys[enemys.length] = new EnemyObj(canvas.width,320);

//injured(200,200);
function draw(){
	canvas.width = canvas.width;
  
    

    archers.update();
    archers.draw();

for(var i = 0; i <= bloods.length-1; i++) {
	 
	 bloods[i].draw();
	 bloods[i].update();
	 
	 if(bloods[i].ground > arrowsustain + 100){
	  bloods.splice(i,1);
	  i -= 1;
	 }

}

  if(Math.random()> 0.997 && enemyGapCount <= 0){
  enemyGapCount = enemyGap;
    enemys[enemys.length] = new EnemyObj(canvas.width,320);
  }
  enemyGapCount -=1;

  if(Math.random()> 0.9985){
  cloudGapCount = cloudGap;
    clouds[clouds.length] = new cloud;
  }
  cloudGapCount -= 1;
  
for(var i = 0; i <= clouds.length-1; i++) {
    clouds[i].draw();
    clouds[i].update();
}



    coin.update();
    coin.render();


for(var i = 0; i <= enemys.length-1; i++) {
	enemys[i].draw();
	enemys[i].update();
	}



endLoopy:
	for(var i = 0; i <= arrows.length-1; i++) {
	 
	 arrows[i].draw();
	 arrows[i].update();
	 
	 
	 
	 for(var j = 0; j <= enemys.length-1; j++) {


   if(arrows[i].hit == 0){
    if(enemys[j].ishit(arrows[i].x,arrows[i].y) == true){
          var arrowvel = arrows[i].vel;
          arrows[i].vel = enemys[j].vel;
          arrows[i].acc = enemys[j].acc;
          arrows[i].hit +=1;
          if(enemys[j].lives <= 0){
            injured(arrows[i].x,arrows[i].y, arrowvel);
            arrows.splice(i,1);
            i -= 1;
            enemys.splice(j,1);
            gold += 50
            coin.freezeframe = 500;
            break endLoopy;
          }
       }
      }
 }
	 
	 if(arrows[i].hitcount > arrowsustain + 100){
	  arrows.splice(i,1);
	  i -= 1;
	 }
	 
}
	
	
	 
	for(var i = 0; i <= targets.length-1; i++) {
	targets[i].draw();
	}
	
	
	
	pp.innerHTML = arrows.length;
  goldcounter.innerHTML = gold;
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



    var xDown = firstTouch.touches[0].clientX;                                      
    var yDown = firstTouch.touches[0].clientY;                                 
    var xUp = lastTouch.touches[0].clientX;                                      
    var yUp = lastTouch.touches[0].clientY;
    
    var xDiff = xUp - xDown;
    var yDiff = yUp - yDown;

    var power = Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2));
  
  if(power < 90){
   archers.pos = 1;
  }else if(power < 250){
   archers.pos = 2;
  }else{
   archers.pos = 3;
  }

  archers.ang = findAngle(xDiff,yDiff)- Math.PI;
  //console.log((findAngle(xDiff,yDiff)-Math.PI).toString());




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
   

   
   arrows[arrows.length] = new ArrowObj(140,canvas.height-85,-yDiff/xDiff, xDiff, yDiff);
   archers.pos = 0;
   archers.ang = 0;
   
   };
   
   firstTouch = null;
   lastTouch = null;
   moved = false;
   targets = [];
                                 
};           


//window.addEventListener('resize', resize, false);
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Width: " + canvas.width.toString());
    console.log("Height: " + canvas.height.toString());
}