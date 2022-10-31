//Ghost class to create ghost object

class Ghost {
  constructor() {
    this.ghostTail = [];
    this.ghostTailLength = 30;

    //give ghost a random size and starting location
    this.ghostSize = random(10, 100);
    this.ghostX = random(0);
    this.ghostY = random(height);

    this.cosOffset = random(100);
    this.wiggle = random(2, 10);
    this.float = random(2, 10);

    //give ghost a random color
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
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

    this.ghostTail.unshift({
      x: this.ghostX, 
      y: this.ghostY
    });
    
    if (this.ghostTail.length > this.ghostTailLength) {
      this.ghostTail.pop();
    }

    //loop over tail and draw points
    for (let index = 0; index < this.ghostTail.length; index++) {
      const tailPoint = this.ghostTail[index];
      //make ghost tail smaller and more transparent
      const ptSize = this.ghostSize * (this.ghostTail.length - index) / this.ghostTail.length;
      const ptAlpha = 255 * (this.ghostTail.length - index) / this.ghostTail.length;
      fill(this.red, this.green, this.blue, ptAlpha);
      ellipse(tailPoint.x, tailPoint.y, ptSize);
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