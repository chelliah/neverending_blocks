var b1, b2, c1, c2;

var cubes;
var staticCubes;
var step = 0;
var startingHeight;

function setup(){
  createCanvas(windowWidth,windowHeight);
  bgColor = color(253,254,250, 30);
  colorMode(HSB);
  initialize(100,100,25);
}


function draw(){
  background(50);

  
  cubes.drawBottom();
  staticCubes.drawStatic();
  cubes.drawTop();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initialize(100,100,25);
}



function mouseWheel(event) {

  var scrollDist = event.deltaY;
  for(var i = 0; i<cubes.cubes.length; i++){
    cubes.cubes[i].position.y += scrollDist/50;
  }
  cubes.draw();

}

function initialize(x2, cubeWidth, depth){

  cubes = new Cubes(x2, cubeWidth, depth);
  var y = windowHeight;
  while((y+depth)>0){
    cubes.addCube(x2,y,cubeWidth,depth);
    y -= 2*depth-10;
  }

  staticCubes = new Cubes(x2, cubeWidth, depth);
  staticCubes.static = true;
  startingHeight = Math.round(windowHeight/2)+(2*depth);
  for(var i = 0; i<4; i++){
    staticCubes.addCube(x2,startingHeight,cubeWidth,depth);
    startingHeight -= depth;
  }
 
}





var Cube = function(startingX,y1,cubeWidth, depth){
  this.cubeWidth = cubeWidth;
  this.depth = depth;
  this.position = {};
  this.position.x = startingX;
  this.position.y = y1;
  this.fill = fill;
  // this.display();
  return this;
};

Cube.prototype.display = function(){
  // c = color(150, 100, 100);
  var cMin = 143;
  var cMax = 180;
  var cRange = cMax-cMin;
  
  // if(this.position.y>(windowHeight/2)){
  //   // console.log('true');
  var distanceRatio = this.position.y/windowHeight;
  var c = cMin + Math.round(cRange*distanceRatio);
  var saturation = Math.round(53*distanceRatio*1.5);
  fill(c, saturation, 74);
  quad(this.position.x,this.position.y,this.position.x+this.cubeWidth,this.position.y+this.depth,this.position.x+(this.cubeWidth*2),this.position.y,this.position.x+(this.cubeWidth),this.position.y-this.depth);
  fill(c,saturation,54);
  quad(this.position.x,this.position.y,this.position.x+this.cubeWidth,this.position.y+this.depth,this.position.x+this.cubeWidth,this.position.y+(this.depth*2),this.position.x,this.position.y+this.depth);
  fill(c, saturation, 44);
  quad(this.position.x+this.cubeWidth,this.position.y+(this.depth*2),this.position.x+this.cubeWidth,this.position.y+this.depth,this.position.x+(this.cubeWidth*2),this.position.y,this.position.x+(this.cubeWidth*2),this.position.y+this.depth);
};


var Cubes = function(startingX, width, depth){
  this.cubes = [];
  this.startingX = startingX;
  this.width = width;
  this.depth = depth;
};

Cubes.prototype.addCube = function(x,y,cubeWidth,depth){
  this.cubes.push(new Cube(x,y,cubeWidth,depth));
};


Cubes.prototype.getPerimiter = function(){
  this.topCube = this.cubes[this.cubes.length-1];
  this.bottomCube = this.cubes[0];
  // console.log(this.bottomCube.position.y-this.bottomCube.depth, windowHeight);
  if(this.bottomCube.position.y-this.depth > windowHeight){
    console.log('its gone');
    this.cubes.shift();
    this.cubes.push(new Cube(this.startingX, 0-(this.depth*2), this.width, this.depth));
  }

  if(this.topCube.position.y+(this.depth*2) < 0){
    console.log('its gone');
    this.cubes.pop();
    this.cubes.unshift(new Cube(this.startingX, windowHeight+this.depth, this.width, this.depth));
  }

  
};

Cubes.prototype.drawTop = function(){
  // step++;
  this.getPerimiter();
  
  for(var i = 0; i < this.cubes.length; i++){
    cube = this.cubes[i];
    if(cube.position.y < startingHeight+this.depth){
      cube.display();
    }
      
  }
  
};

Cubes.prototype.drawStatic = function(){
  
  for(var i = 0; i < this.cubes.length; i++){
    cube = this.cubes[i];
    
      cube.display();
  }
};

Cubes.prototype.drawBottom = function(){
  // step++;
  this.getPerimiter();
  
  for(var i = 0; i < this.cubes.length; i++){
    cube = this.cubes[i];
    if(cube.position.y > (startingHeight + 4*this.depth)){
      cube.display();
    }
  }
  
};
