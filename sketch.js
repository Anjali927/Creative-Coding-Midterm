//Midterm Progress - bendy line object
//Anjali Shiyamsaran
let _minWidth;

function setup() {
  createCanvas(600, 600);
  setSquiggly();
}

let lineArr = [];

//set up stroke and ensure that it is responsive to canvas size
function setSquiggly() {
  _minWidth = min(width, height) * 0.8;
  strokeWeight(_minWidth/40);
  stroke(0, 255, 0);
  noFill();
  strokeJoin(ROUND);
  let numLine = 1;
  for (let i = 0; i < numLine; i++) {
    lineArr[i] = new BendSquiggly();
  }
}

//create squiggly line object
class BendSquiggly {
  constructor() {
    this.rad = _minWidth / 3;
    this.numPoints = 600;
    this.aryXy = [];
    
    for (let i = 0; i < this.numPoints; i++) {
      let ang = 2*PI / this.numPoints * i;
      this.aryXy[i] = createVector(this.rad * cos(ang), this.rad * sin(ang));
    }
    
    this.numBend = 3;
    this.aryRParameter = [];
    for (let i = 0; i < this.numBend; i++) {
      this.aryRParameter[i] = [this.rad / 30 * 0.8**i, random(2*PI), 2*PI / random(100, 500)]; //[max, init, speed]
    }
    this.aryinitAngParameter = [];
    
    for (let i = 0; i < this.numBend; i++) {
      this.aryinitAngParameter[i] = [2*PI, random(2*PI), 2*PI / random(200, 1000)]; //[max, init, speed]
    }
    
    this.aryAngStep = [];
    
    for (let i = 0; i < this.numBend; i++) {
      this.aryAngStep[i] = 2*PI / this.numPoints * int(random(3, 8 + i));
    }
    
    this.numCycle = 7;
  }
  
  update() {
    this.updateRad();
    this.updateInitAng();
    this.newAryXy = this.aryXy;
    for (let i = 0; i < this.numBend; i++) {
      this.newAryXy = bend(this.newAryXy, this.aryRad[i], this.aryinitAng[i], this.aryAngStep[i], this.numCycle);
    }
  }
  
  updateRad() {
    this.aryRad = [];
    for (let i = 0; i < this.aryRParameter.length; i++) {
      this.aryRad[i] = this.aryRParameter[i][0] * (sin(this.aryRParameter[i][1] + this.aryRParameter[i][2] * frameCount));
    }
  }
  
  updateInitAng() {
    this.aryinitAng = [];
    for (let i = 0; i < this.aryinitAngParameter.length; i++) {
      this.aryinitAng[i] = this.aryinitAngParameter[i][1] +     this.aryinitAngParameter[i][0] * (sin(this.aryinitAngParameter[i][2] * frameCount));
    }
  }
  
  draw() {
    beginShape();
    for (let i = 0; i < this.newAryXy.length; i++) {
      vertex(this.newAryXy[i].x, this.newAryXy[i].y);
    }
    endShape(CLOSE);
  }
}

function bend(aryXy, rad, initAng, angStep, numCycle) {
  let aryXy2 = aryXy;
  
  for (let j = 0; j < numCycle; j++) {
    let aryXyNew = [];
    for (let i = 0; i < aryXy2.length; i++) {
      let xy_1_2 = p5.Vector.sub(aryXy2[(i+1)%aryXy2.length], aryXy2[i]);
      let ang = initAng + angStep * i;
      xy_1_2.rotate(-PI/2).setMag(rad * sin(ang));
      let xy = p5.Vector.add(aryXy2[i], xy_1_2);
      aryXyNew.push(xy);
    }
    aryXy2 = aryXyNew;
  }

  return aryXy2;
}

//call update and draw methods
function draw() {
  background(255);
  translate(width/2, height/2); //keep in center of canvas
  for (let i = 0; i < lineArr.length; i++) {
    lineArr[i].update();
    lineArr[i].draw();
  }
}