//BendSquiggly class to create squiggly line object

class BendSquiggly {
    constructor() {
      noStroke();
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
    
    //update points in line array
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
    
    //draw squiggly line
    draw() {
      beginShape();
      for (let i = 0; i < this.newAryXy.length; i++) {
        vertex(this.newAryXy[i].x, this.newAryXy[i].y);
      }
      endShape(CLOSE);
    }
  }