//Ghost class to create ghost object

class Ghost {
    constructor() {
      this.tail = [];
      this.tailLength = 30;
  
      //give ghost a random size and starting location
      this.ghostSize = random(10, 100);
      this.ghostX = random(0);
      this.ghostY = random(mouseY);
  
      this.cosOffset = random(100);
      this.wiggle = random(2, 10);
      this.float = random(2, 10);
  
  
      //give ghost a random color
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
    }
  
    moveAndDraw() {
  
      //move ghost left and right in canvas
      this.ghostX += cos((this.cosOffset + frameCount) / 10) * this.wiggle;
      
      //move ghost up canvas
      this.ghostY -= this.float;
      
      //start ghost at the bottom again once it reaches top of canvas
      if (this.ghostY < -this.ghostSize) {
        this.ghostY = height + this.ghostSize;
      }
  
      this.tail.unshift({x: this.ghostX, y: this.ghostY});
      
      if (this.tail.length > this.tailLength) {
        this.tail.pop();
      }
  
      //loop over tail and draw points
      for (let index = 0; index < this.tail.length; index++) {
        const tailPoint = this.tail[index];
        //make ghost tail smaller and more transparent
        const pointSize = this.ghostSize * (this.tail.length - index) / this.tail.length;
        const pointAlpha = 255 * (this.tail.length - index) / this.tail.length;
        fill(this.r, this.g, this.b, pointAlpha);
        ellipse(tailPoint.x, tailPoint.y, pointSize);
      }
  
      //draw ghost's face
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