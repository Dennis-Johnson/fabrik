class Joint{
    static diameter = 15
    constructor(x, y) {
      this.setPosition(x, y)
    }
  
    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
  
    show() {
      fill(...offWhite)
      stroke(...offWhite)
      ellipse(this.x, this.y, Joint.diameter, Joint.diameter);
    }
}