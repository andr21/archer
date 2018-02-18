
//touch screen

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
   

   
   if(reloads == null){
    
      //var rand = Math.random();
      //if(rand < 0.3){
      //  a1.play();
      //}else if(rand < 0.6){
      //  a2.play();
      //}else{
      //  a3.play();
      //}

     arrows[arrows.length] = new ArrowObj(140,canvas.height-88,-yDiff/xDiff, xDiff, yDiff);
     reloads = new reload(archers.x - 5,archers.y + 90);
     }
   
   archers.pos = 0;
   archers.ang = 0;
   
   };
   
   firstTouch = null;
   lastTouch = null;
   moved = false;
   targets = [];
                                 
};           




//mouse
var mouseclicked = false;
canvas.addEventListener('mousedown', mousedown, false);
canvas.addEventListener('mousemove', mousemove, false);        
document.addEventListener('mouseup', mouseup, false);


function mousedown(evt)
{


    firstTouch = evt;
    lastTouch = evt;
    
    
    rect = canvas.getBoundingClientRect();

    var Xclick = evt.clientX - rect.left;
    var Yclick = evt.clientY - rect.top;
    
    Xmove = Xclick;
    Ymove = Yclick;  
    //targets[targets.length] = new TargetObj(firstTouch.touches[0].clientX,firstTouch.touches[0].clientY);
     targets[targets.length] = new TargetObj(Xclick,Yclick);
     
    evt.preventDefault()

    mouseclicked = true;

}


function mousemove(evt)
{
  if(mouseclicked == true){

    lastTouch = evt;
    moved = true;
    
    rect = canvas.getBoundingClientRect();

    Xmove = evt.clientX - rect.left;
    Ymove = evt.clientY - rect.top;



    var xDown = firstTouch.clientX;                                      
    var yDown = firstTouch.clientY;                                 
    var xUp = lastTouch.clientX;                                      
    var yUp = lastTouch.clientY;
    
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

    evt.preventDefault()

  }

}



function mouseup(evt)
{

   if(moved == true){
    var xDown = firstTouch.clientX;                                      
    var yDown = firstTouch.clientY;                                 
    var xUp = lastTouch.clientX;                                      
    var yUp = lastTouch.clientY;
    
    var xDiff = xUp - xDown;
    var yDiff = yUp - yDown;
    
    
  evt.preventDefault()
   

    if(reloads == null){

      //var rand = Math.random();
      //if(rand < 0.3){
      //  a1.play();
      //}else if(rand < 0.6){
      //  a2.play();
      //}else{
      //  a3.play();
      //}


      arrows[arrows.length] = new ArrowObj(140,canvas.height-88,-yDiff/xDiff, xDiff, yDiff);
      reloads = new reload(archers.x - 5,archers.y + 90);
    }
   
   archers.pos = 0;
   archers.ang = 0;
   
   };
   
   firstTouch = null;
   lastTouch = null;
   moved = false;
   targets = [];


  mouseclicked = false;
}







//window.addEventListener('resize', resize, false);
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Width: " + canvas.width.toString());
    console.log("Height: " + canvas.height.toString());
}