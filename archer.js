


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


this.head = {
	  x: -20
	, y: -44
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

this.null = {
	 ang: 0
	, xmove: 0
	, ymove: 0	
}



this.draw = function(){



	this.drawpart(this.torso, this.null);
	this.drawpart(this.head, this.torso);
//ctx.drawImage(this.torso.img, this.x + this.torso.x, this.y + this.torso.y, this.torso.img.width/7, this.torso.img.height/7 );
//console.log("drawing")

}




this.drawpart = function(part, dependent){

ctx.drawImage(part.img, this.x + part.x + part.xmove + dependent.xmove, this.y + part.y + part.ymove + dependent.ymove, part.img.width/7, part.img.height/7);

}




}