//Midterm Progress - bendy line object and ghost object
//Anjali Shiyamsaran
//October 31

let _minWidth;
let t = 0.0;
let lineArr = [];

function setup() {
  createCanvas(600, 600);
  setSquiggly();
  ghost = new GhostObject();
}

//set up stroke and ensure that it is responsive to canvas size
function setSquiggly() {
  _minWidth = min(width, height) * 0.8;
  let numberLine = 1;
  for (let i = 0; i < numberLine; i++) {
    lineArr[i] = new BendSquiggly();
  }
}

class GhostObject {
  constructor() {
    this.ran = random(2);
    this.ghostSize = 5;
	this.osci = 10 * sin(t);
	this.oscic = 10 * cos(t);
	this.hW = 200 / this.ghostSize;
	this.hH = 200 / (this.ghostSize - 1) + (this.ran == 1 ? this.osci / 5 : this.oscic / 5);
  }
  
  display() {
    noStroke();
    translate(mouseX, mouseY);
    push();
    
    //leg shadow
    fill(200);
    beginShape();
    vertex(-this.hW, 0);
    vertex(this.hW, 0);
    for (let i = this.hW; this.i > -this.hW + 1; i -= 1) {
      this.y = this.hH + (this.hH / 10) * cos(i / (this.hW / 500) + t);
      vertex(i, this.y);
      }
    vertex(-this.hW, this.hH);
    endShape();

    //ghost body
    this.bodycol = ["#ffffff", "#fbfefb"];
    fill(this.bodycol[int(random(this.bodycol.length))]);

    beginShape();
    vertex(this.hW, 0);
    bezierVertex(this.hW * 1.1, -this.hH * 1.35, -this.hW * 1.1, -this.hH * 1.35, -this.hW, 0);
    vertex(-this.hW, this.hH);
    for (let i = -this.hW; this.i < this.hW + 1; this.i += 1) {
      this.y = this.hH + (this.hH / 10) * sin(i / (this.hW / 500) - t);
      vertex(this.i, this.y);
    }
    vertex(this.hW, 0);
    endShape();
    pop();

    //eye
    this.mouthcol = color("#b38184");
    this.eyecol = color("#574f7d");
    if (this.ran == 1) {
      fill(this.eyecol);
      strokeCap(ROUND);
      ellipse(-this.hW / 2, -hH / 2 + abs(this.osci / 5), this.hW / 5);
      ellipse(this.hW / 5, -hH / 2 + abs(this.osci / 5), this.hW / 5);
      push();
      stroke(this.mouthcol);
      fill(this.mouthcol);
      strokeWeight(this.hW / 10);
      ellipse(
        -this.hW / 6.5,
        -this.hH / 4 + abs(this.osci / 5),
        this.hW / 6 + 2 * sin(this.t / 2),
        (this.hW / 6) * sin(this.t / 2)
      );
      pop();
      } else {
        stroke(this.eyecol);
        strokeWeight(this.hW / 10);
        noFill();
        arc(this.hW / 2, -this.hH / 2 + abs(this.oscic / 5), this.hW / 5, this.hW / 5, 360, 180);
        arc(-this.hW / 5, -this.hH / 2 + abs(this.oscic / 5), this.hW / 5, this.hW / 5, 360, 180);
        push();
        fill(this.mouthcol);
        stroke(this.mouthcol);
        ellipse(
          this.hW / 5.5,
          -this.hH / 4 + abs(this.oscic / 5),
          this.hW / 6 + 2 * abs(this.oscic / 5) * 0.3,
          (this.hW / 6) * abs(this.oscic / 5) * 0.3
        );
    }
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
  //ghost.display();
}

function mousePressed() {
  ghost.display();
}