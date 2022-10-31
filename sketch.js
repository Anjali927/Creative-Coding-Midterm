//Midterm Progress - squiggly line object and ghost object
//Anjali Shiyamsaran
//October 31

let _minWidth;
let lineArr = [];
let ghosts = [];

function setup() {
  createCanvas(600, 600);
  background(0);
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

//call update and draw methods of squiggly line object
//call moveAndDraw method of ghost object
function draw() {
  fill(255,165,0);
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