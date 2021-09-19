class Target{
    static cornerRadii = 3;
    constructor(x, y, height, width) {
      this.setPosition(x - (width / 2), y - (height / 2))
      this.height = height;
      this.width = width;
    }
  
    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
  
    show() {
      fill(...orangish)
      noStroke()
      rect(this.x, this.y, this.height, this.width, Target.cornerRadii)
    }
  
    update() {
      this.x = mouseX - ( this.width / 2);
      this.y = mouseY - ( this.height / 2);
    }
  }