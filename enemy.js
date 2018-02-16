
var enemyImgs = [];

enemyImgs.head = document.getElementById('head');
enemyImgs.headblink = document.getElementById('headblink');
enemyImgs.headgrit = document.getElementById('headgrit');
enemyImgs.helmet = document.getElementById('helmet');
enemyImgs.la = [];
enemyImgs.la[0] = document.getElementById('la0');
enemyImgs.la[1] = document.getElementById('la1');
enemyImgs.la[2] = document.getElementById('la2');
enemyImgs.la[3] = document.getElementById('la3');
enemyImgs.la[4] = document.getElementById('la4');
enemyImgs.la[5] = document.getElementById('la5');
enemyImgs.la[6] = document.getElementById('la6');
enemyImgs.la[7] = document.getElementById('la7');
enemyImgs.la[8] = document.getElementById('la8');
enemyImgs.leg = document.getElementById('enemyleg');
enemyImgs.legs = [];
enemyImgs.legs[0] = document.getElementById('legs0');
enemyImgs.legs[1] = document.getElementById('legs1');
enemyImgs.legs[2] = document.getElementById('legs2');
enemyImgs.legs[3] = document.getElementById('legs3');
enemyImgs.legs[4] = document.getElementById('legs4');
enemyImgs.legs[5] = document.getElementById('legs5');
enemyImgs.legs[6] = document.getElementById('legs6');
enemyImgs.legs[7] = document.getElementById('legs7');
enemyImgs.legs[8] = document.getElementById('legs8');
enemyImgs.ra = [];
enemyImgs.ra[0] = document.getElementById('ra0');
enemyImgs.ra[1] = document.getElementById('ra1');
enemyImgs.ra[2] = document.getElementById('ra2');
enemyImgs.ra[3] = document.getElementById('ra3');
enemyImgs.ra[4] = document.getElementById('ra4');
enemyImgs.ra[5] = document.getElementById('ra5');
enemyImgs.ra[6] = document.getElementById('ra6');
enemyImgs.ra[7] = document.getElementById('ra7');
enemyImgs.ra[8] = document.getElementById('ra8');
enemyImgs.sword = document.getElementById('sword');
enemyImgs.torso = document.getElementById('enemytorso');






function EnemyObj(x,y){
  this.x = x;
  this.y = y;
  this.drawSquares = false;
  this.lives = 2;
  this.walkcycle = 1;
  this.blink = 0;
  this.walktick = 9;
  this.tick = 0;
  this.beenhit = false;

  this.vel = {x: -0.35, y: 0};
  this.acc = {x: 0, y: 0};


  //testing
//this.x = 400;
//this.y = 330;
//this.vel = {x: 0, y: 0};
  

  //targeting

  this.Sqhelmet = {
    xoff: -5
  , yoff: -24
  , width: 50
  , height: 20
  };

  this.Sqhead = {
    xoff: -9
  , yoff: -4
  , width: 50
  , height: 30
  };
  
  this.Sqbody = {
    xoff: 0
  , yoff: 25
  , width: 30
  , height: 47
  };
  
  this.Sqlegs = {
    xoff: 6
  , yoff: 72
  , width: 18
  , height: 18
  };

//art
this.helmet = {
    x: -19
  , y: -36
  , ang: 0
  , xmove: 0
  , ymove: 0
  , img: enemyImgs.helmet
  
};

this.head = {
    x: -20
  , y: -35
  , ang: 0
  , xmove: 0
  , ymove: 0
  , img: enemyImgs.head
  
};

this.torso = {
    x: -5
  , y: 23
  , ang: 0
  , xmove: 0
  , ymove: 0
  , img: enemyImgs.torso
  
};

this.legs = {
    x: -10
  , y: 56
  , ang: 0
  , xmove: 0
  , ymove: 0
  , img: enemyImgs.legs[0]
  
};

this.rightarm = {
    x: 14
  , y: 33
  , ang: 0
  , xmove: 0
  , ymove: 0
  , img: enemyImgs.ra[0]
  
};

this.leftarm = {
    x: -58
  , y: 31
  , ang: 0
  , xmove: 0
  , ymove: 0
  , img: enemyImgs.la[0]
  
};

this.null = {
   ang: 0
  , xmove: 0
  , ymove: 0  
};






  
  this.draw = function(){

    this.drawpart(this.legs, this.null); 
    this.drawpart(this.leftarm, this.torso);   
    this.drawpart(this.torso, this.null);    
    this.drawpart(this.head, this.torso);
    this.drawpart(this.rightarm, this.torso);
    this.drawpart(this.helmet, this.torso);


  if(this.drawSquares == true){
   drawboxes(this.x,this.y,this.Sqhead);
   drawboxes(this.x,this.y,this.Sqbody);
   drawboxes(this.x,this.y,this.Sqlegs);
   drawboxes(this.x,this.y,this.Sqhelmet);
   }

  }
  
  this.update = function(){
   this.x += this.vel.x;
   this.y += this.vel.y;


    switch(this.walkcycle) {
    case 0:
      this.legs.img = enemyImgs.legs[0];
      this.rightarm.img = enemyImgs.ra[0];
      this.leftarm.img = enemyImgs.la[0];


      break;
    case 1:
      this.legs.img = enemyImgs.legs[1];
      this.rightarm.img = enemyImgs.ra[1];
      this.leftarm.img = enemyImgs.la[1];

      this.torso.ymove = 1;


      break;
    case 2:
      this.legs.img = enemyImgs.legs[2];
      this.rightarm.img = enemyImgs.ra[2];
      this.leftarm.img = enemyImgs.la[2];

      this.torso.ymove = 0;


      break;
    case 3:
      this.legs.img = enemyImgs.legs[3];
      this.rightarm.img = enemyImgs.ra[3];
      this.leftarm.img = enemyImgs.la[3];


      break;
    case 4:
      this.legs.img = enemyImgs.legs[4];
      this.rightarm.img = enemyImgs.ra[4];
      this.leftarm.img = enemyImgs.la[4];


      break;
    case 5:
      this.legs.img = enemyImgs.legs[5];
      this.rightarm.img = enemyImgs.ra[5];
      this.leftarm.img = enemyImgs.la[5];

      this.torso.ymove = 1;


      break;
    case 6:
      this.legs.img = enemyImgs.legs[6];
      this.rightarm.img = enemyImgs.ra[6];
      this.leftarm.img = enemyImgs.la[6];

      this.torso.ymove = 0;


      break;
    case 7:
      this.legs.img = enemyImgs.legs[7];
      this.rightarm.img = enemyImgs.ra[7];
      this.leftarm.img = enemyImgs.la[7];


      break;
    case 8:
      this.legs.img = enemyImgs.legs[8];
      this.rightarm.img = enemyImgs.ra[8];
      this.leftarm.img = enemyImgs.la[8];


      break;

    }

    //blinking
    //been hit can be removed when i have blinking grit teeth
    if(this.blink == 500 && this.beenhit == false){
      this.head.img = enemyImgs.headblink;
    }else if(this.blink > 505 && this.beenhit == false){
      this.head.img = enemyImgs.head;
      this.blink = 0;
    }
    this.blink += 1;

    //walking
    if(this.tick == this.walktick){
      this.tick = 0;
      this.walkcycle += 1;
      if(this.walkcycle == 9){
        this.walkcycle = 1;
      }
    }
    this.tick += 1;

  }


this.drawpart = function(part, dependent){

    //ctx.save();
    //ctx.translate(this.x + part.x + part.xmove + dependent.xmove + part.img.width/2, this.y + part.y + part.ymove + dependent.ymove + part.img.height/2); 
    //ctx.rotate(part.ang);
    //ctx.drawImage(part.img, -part.img.width/2, -part.img.height/2, part.img.width, part.img.height);
    //ctx.restore();

    ctx.drawImage(part.img, this.x + part.x + part.xmove + dependent.xmove, this.y + part.y + part.ymove + dependent.ymove, part.img.width, part.img.height);

}




  this.ishit = function(x,y){

      if(this.hitwhere(x,y,this.Sqhead)){
        
        this.lives -= 2;
        this.head.img = enemyImgs.headgrit;
        return true
      }else if(this.hitwhere(x,y,this.Sqbody)){
        
        this.lives -= 1;
        this.head.img = enemyImgs.headgrit;
        return true
      }else if(this.hitwhere(x,y,this.Sqlegs)){
       
        this.lives -= 1;
        this.head.img = enemyImgs.headgrit;
        return true
      }else if(this.hitwhere(x,y,this.Sqhelmet)){
       
        return true
      }else{
        return false
      }


  }

  this.hitwhere = function(x,y,part){
      if(x > this.x + part.xoff && x < this.x + part.xoff + part.width && y > this.y + part.yoff && y < this.y + part.yoff + part.height){
        this.beenhit = true;
        return true;
      }else{
        return false;
      }

  }

}




function drawboxes(x,y,part){
  ctx.beginPath();
ctx.strokeStyle="#FF69FF";
ctx.rect(x + part.xoff,y + part.yoff,part.width,part.height);
ctx.stroke();
ctx.closePath();

}
