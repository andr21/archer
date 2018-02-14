

var archerImgs = [];

archerImgs.bow1 = document.getElementById('bow1');
archerImgs.bow2 = document.getElementById('bow2');
archerImgs.bow3 = document.getElementById('bow3');
archerImgs.bowrest = document.getElementById('bowrest');
archerImgs.torso = document.getElementById('torso');
archerImgs.leg = document.getElementById('leg');
archerImgs.leftarmaction = document.getElementById('leftarmaction');
archerImgs.leftarmrest = document.getElementById('leftarmrest');



function archer(x,y){



this.x = x;
this.y = y;

this.pos = 0;
this.ang = 0;
this.blink = 0;


this.head = {
	  x: -22
	, y: -34
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: archerImgs.head
	
};

this.torso = {
	  x: 0
	, y: 20
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: archerImgs.torso
};

this.leftarm = {
	  x: 27
	, y: 30
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: archerImgs.leftarmrest
};

this.bow = {
	  x: -15
	, y: -17
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: archerImgs.bowrest
};

this.leftleg = {
	  x: 14
	, y: 54
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: archerImgs.leg
};

this.rightleg = {
	  x: 4
	, y: 55
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: archerImgs.leg
};

this.null = {
	 ang: 0
	, xmove: 0
	, ymove: 0	
};



this.draw = function(){

	this.drawpart(this.leftleg, this.torso);
	this.drawpart(this.rightleg, this.torso);
	this.drawpart(this.leftarm, this.torso);
	this.drawpart(this.torso, this.null);
	this.drawpart(this.head, this.torso);
	this.drawpart(this.bow, this.torso);
//ctx.drawImage(this.torso.img, this.x + this.torso.x, this.y + this.torso.y, this.torso.img.width/7, this.torso.img.height/7 );
//console.log("drawing")

}



this.drawpart = function(part, dependent){

	ctx.save();

	ctx.translate(this.x + part.x + part.xmove + dependent.xmove + part.img.width/2, this.y + part.y + part.ymove + dependent.ymove + part.img.height/2);
    
    ctx.rotate(part.ang);

	ctx.drawImage(part.img, -part.img.width/2, -part.img.height/2, part.img.width, part.img.height);

	ctx.restore();
}


this.update = function(){

switch(this.pos) {
    case 0:
        this.bow.x = -15;
        this.bow.y = -15;
        this.bow.img = archerImgs.bowrest;

        this.leftarm.x = 27;
        this.leftarm.y = 30;
        this.leftarm.img = archerImgs.leftarmrest;
        break;
    case 1:
        this.bow.x = -10;
        this.bow.y = -15;
        this.bow.img = archerImgs.bow1;

        this.leftarm.x = 27;
        this.leftarm.y = 30;
        this.leftarm.img = archerImgs.leftarmaction;
        break;
    case 2:
    	this.bow.x = -15;
        this.bow.y = -15;
        this.bow.img = archerImgs.bow2;

        this.leftarm.x = 27;
        this.leftarm.y = 30;
        this.leftarm.img = archerImgs.leftarmaction;
    	break;
    case 3:
    	this.bow.x = -13;
        this.bow.y = -15;
        this.bow.img = archerImgs.bow3;

        this.leftarm.x = 27;
        this.leftarm.y = 30;
        this.leftarm.img = archerImgs.leftarmaction;
    	break;
}

this.bow.ang = this.ang * 0.25 / (Math.PI/2);
this.head.ang = this.ang * 0.08 / (Math.PI/2);


if(this.blink == 400){
  this.head.img = archerImgs.headb;
}else if(this.blink > 405){
  this.head.img = archerImgs.head;
  this.blink = 0;
}
this.blink += 1;
//console.log(this.blink.toString());

}

}