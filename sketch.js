//Midterm Progress - bendy line object
//Anjali Shiyamsaran
let _minWidth;
let t = 0.0;

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
  let size = 5;
	let osci = 10 * sin(t);
	let oscic = 10 * cos(t);
	let hW = w / size;
	let hH = w / (size - 1) + (ran == 1 ? osci / 5 : oscic / 5);
	noStroke();
	push();
	translate(x, y);
	push();
	//leg_shadow-----
	fill(200);
	beginShape();
	vertex(-hW, 0);
	vertex(hW, 0);
	for (let i = hW; i > -hW + 1; i -= 1) {
		let y = hH + (hH / 10) * cos(i / (hW / 500) + t);
		vertex(i, y);
	}
	vertex(-hW, hH);
	endShape();

	//ghost_body-----
	let bodycol = ["#ffffff", "#fbfefb"];
	fill(bodycol[int(random(bodycol.length))]);

	beginShape();
	vertex(hW, 0);
	bezierVertex(hW * 1.1, -hH * 1.35, -hW * 1.1, -hH * 1.35, -hW, 0);
	vertex(-hW, hH);
	for (let i = -hW; i < hW + 1; i += 1) {
		let y = hH + (hH / 10) * sin(i / (hW / 500) - t);
		vertex(i, y);
	}
	vertex(hW, 0);
	endShape();
	pop();

	//eye-------

	let mouthcol = color("#b38184");
	let eyecol = color("#574f7d");
	if (ran == 1) {
		fill(eyecol);
		// strokeCap(ROUND);
		ellipse(-hW / 2, -hH / 2 + abs(osci / 5), hW / 5);
		ellipse(hW / 5, -hH / 2 + abs(osci / 5), hW / 5);
		push();
		stroke(mouthcol);
		fill(mouthcol);
		strokeWeight(hW / 10);
		ellipse(
			-hW / 6.5,
			-hH / 4 + abs(osci / 5),
			hW / 6 + 2 * sin(t / 2),
			(hW / 6) * sin(t / 2)
		);
		pop();
	} else {
		stroke(eyecol);
		strokeWeight(hW / 10);
		noFill();
		arc(hW / 2, -hH / 2 + abs(oscic / 5), hW / 5, hW / 5, 360, 180);
		arc(-hW / 5, -hH / 2 + abs(oscic / 5), hW / 5, hW / 5, 360, 180);
		push();
		fill(mouthcol);
		stroke(mouthcol);
		ellipse(
			hW / 5.5,
			-hH / 4 + abs(oscic / 5),
			hW / 6 + 2 * abs(oscic / 5) * 0.3,
			(hW / 6) * abs(oscic / 5) * 0.3
		);
		pop();
	}
	pop();
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