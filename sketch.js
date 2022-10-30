//Midterm Progress - bendy line object and ghost object
//Anjali Shiyamsaran
//October 31

let _minWidth;
let lineArr = [];
let ghosts = [];

function setup() {
  createCanvas(600, 600);
  setSquiggly();
  for (var i = 0; i < 10; i++) {
    ghosts.push(new Ghost());
  }
}

//set up stroke and ensure that it is responsive to canvas size
function setSquiggly() {
  _minWidth = min(width, height) * 0.8;
  let numberLine = 1;
  for (let i = 0; i < numberLine; i++) {
    lineArr[i] = new BendSquiggly();
  }
}

class Ghost {
  constructor() {
    this.tail = [];
    this.tailLength = 30;

    // Give ghost a random size and starting location
    this.ghostSize = random(10, 100);
    this.ghostX = random(width);
    this.ghostY = random(height);

    this.cosOffset = random(100);
    this.wiggliness = random(2, 10);
    this.floatiness = random(2, 10);


    // Give ghost a random color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  moveAndDraw() {

    // Move ghost left and right in canvas
    this.ghostX += cos((this.cosOffset + frameCount) / 10) * this.wiggliness;
    
    // Move ghost up canvas
    this.ghostY -= this.floatiness;
    
    // Start ghost at the bottom again once it reaches top of canvas
    if (this.ghostY < -this.ghostSize) {
      this.ghostY = height + this.ghostSize;
    }

    this.tail.unshift({x: this.ghostX, y: this.ghostY});
    
    // Remove last point if array is too large
    if (this.tail.length > this.tailLength) {
      this.tail.pop();
    }

    // loop over tail and draw points
    for (let index = 0; index < this.tail.length; index++) {
      const tailPoint = this.tail[index];
      // make tail smaller and more transparent
      const pointSize = this.ghostSize * (this.tail.length - index) / this.tail.length;
      const pointAlpha = 255 * (this.tail.length - index) / this.tail.length;
      fill(this.r, this.g, this.b, pointAlpha);
      ellipse(tailPoint.x, tailPoint.y, pointSize);
    }

    // draw ghost's face
    fill(32);
    ellipse(this.ghostX - this.ghostSize * .2,
            this.ghostY - this.ghostSize * .1,
            this.ghostSize * .2);
    ellipse(this.ghostX + this.ghostSize * .2,
            this.ghostY - this.ghostSize * .1,
            this.ghostSize * .2);
    ellipse(this.ghostX,
            this.ghostY + this.ghostSize * .2,
            this.ghostSize * .2);
  }
}

//create squiggly line object
class BendSquiggly {
  constructor() {
    this.rad = _minWidth / 3;
    this.numberPoints = 600;
    this.aryXy = [];
    
    for (let i = 0; i < this.numberPoints; i++) {
      let ang = 2*PI / this.numberPoints * i;
      this.aryXy[i] = createVector(this.rad * cos(ang), this.rad * sin(ang));
    }
    
    this.numberBend = 3;
    this.aryRParameter = [];
    for (let i = 0; i < this.numberBend; i++) {
      this.aryRParameter[i] = [this.rad / 30 * 0.8**i, random(2*PI), 2*PI / random(100, 500)]; //[max, init, speed]
    }
    this.aryinitAngParameter = [];
    
    for (let i = 0; i < this.numberBend; i++) {
      this.aryinitAngParameter[i] = [2*PI, random(2*PI), 2*PI / random(200, 1000)]; //[max, init, speed]
    }
    
    this.aryAngStep = [];
    
    for (let i = 0; i < this.numberBend; i++) {
      this.aryAngStep[i] = 2*PI / this.numberPoints * int(random(3, 8 + i));
    }
    
    this.numberCycle = 7;
  }
  
  update() {
    this.updateRad();
    this.updateInitAng();
    this.newAryXy = this.aryXy;
    for (let i = 0; i < this.numberBend; i++) {
      this.newAryXy = bend(this.newAryXy, this.aryRad[i], this.aryinitAng[i], this.aryAngStep[i], this.numberCycle);
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

//use p5.Vector to bend line
function bend(aryXy, rad, initAng, angStep, numberCycle) {
  let aryXy2 = aryXy;
  
  for (let j = 0; j < numberCycle; j++) {
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
  background(0);
  stroke(0, 255, 0);
  strokeWeight(_minWidth/40);
  noFill();
  strokeJoin(ROUND);
  translate(300, 300); //keep in center of canvas
  for (let i = 0; i < lineArr.length; i++) {
    lineArr[i].update();
    lineArr[i].draw();
  }
  
  for (const ghost of ghosts) {
    ghost.moveAndDraw();
  }
}

function mousePressed() {
  //ghost.display();
}