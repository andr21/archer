//archer breathing?
//reload bar
//click as well as touch controls
//enemies death animation - stops walking, changes face, drops sword? fades out.
//enemies health bar?
//open m or f
//big enemy
//lives
//make better target image
//music
//levels + shop
//shop items - extra damage, double arrow, no reload, slow arrow, visuals - a hat, castle flag



//initialise

var pp = document.querySelector("#pp");
var goldcounter = document.querySelector("#gold");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

canvas.width = 900;
canvas.height = 450;

//canvas.style.background = "rgb(247, 247, 247)";

var rect = canvas.getBoundingClientRect();

var ground = 50;

var gold = 0;


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






//draw

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

