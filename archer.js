


var bow1 = document.getElementById('bow1');
var bow2 = document.getElementById('bow2');
var bow3 = document.getElementById('bow3');
var bowrest = document.getElementById('bowrest');
var head = document.getElementById('head');
var torso = document.getElementById('torso');
var leg = document.getElementById('leg');
var leftarmaction = document.getElementById('leftarmaction');
var leftarmrest = document.getElementById('leftarmrest');



function archer(x,y){


this.x = x;
this.y = y;

this.pos = 0;
this.ang = 0;


this.head = {
	  x: -18
	, y: -36
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: head
};

this.torso = {
	  x: 0
	, y: 20
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: torso
};

this.leftarm = {
	  x: 27
	, y: 30
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: leftarmrest
};

this.bow = {
	  x: -15
	, y: -17
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: bowrest
};

this.leftleg = {
	  x: 14
	, y: 54
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: leg
};

this.rightleg = {
	  x: 4
	, y: 55
	, ang: 0
	, xmove: 0
	, ymove: 0
	, img: leg
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

   // ctx.translate(this.x + part.x, this.y + part.y);
    ctx.translate(this.x + part.x + part.xmove + dependent.xmove + part.img.width/16, this.y + part.y + part.ymove + dependent.ymove + part.img.height/16);
    
    ctx.rotate(part.ang);

	//ctx.drawImage(part.img, this.x + part.x + part.xmove + dependent.xmove, this.y + part.y + part.ymove + dependent.ymove, part.img.width/8, part.img.height/8);
    ctx.drawImage(part.img, -part.img.width/16, -part.img.height/16, part.img.width/8, part.img.height/8);

	ctx.restore();
}


this.update = function(){

switch(this.pos) {
    case 0:
        this.bow.x = -15;
        this.bow.y = -15;
        this.bow.img = bowrest;

        this.leftarm.x = 27;
        this.leftarm.y = 30;
        this.leftarm.img = leftarmrest;
        break;
    case 1:
        this.bow.x = -10;
        this.bow.y = -15;
        this.bow.img = bow1;

        this.leftarm.x = 27;
        this.leftarm.y = 30;
        this.leftarm.img = leftarmaction;
        break;
    case 2:
    	this.bow.x = -15;
        this.bow.y = -15;
        this.bow.img = bow2;

        this.leftarm.x = 27;
        this.leftarm.y = 30;
        this.leftarm.img = leftarmaction;
    	break;
    case 3:
    	this.bow.x = -13;
        this.bow.y = -15;
        this.bow.img = bow3;

        this.leftarm.x = 27;
        this.leftarm.y = 30;
        this.leftarm.img = leftarmaction;
    	break;
}

this.bow.ang = this.ang * 0.25 / (Math.PI/2);
this.head.ang = this.ang * 0.08 / (Math.PI/2);




}

}