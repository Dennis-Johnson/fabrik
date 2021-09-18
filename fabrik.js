let chain;

class Joint{
  static diameter = 15
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    ellipse(this.x, this.y, Joint.diameter, Joint.diameter);
  }
}

class Chain {
  constructor(numJoints = 2) {
    this.joints = []
    
    this.joints.push(new Joint(100, 200))
    this.joints.push(new Joint(100, 300))
    this.joints.push(new Joint(200, 400))
  }

  show() {
    for (let i = 0; i < this.joints.length; i++) {
      this.joints[i].show()

      if(i > 0)
        line(this.joints[i-1].x, this.joints[i-1].y, this.joints[i].x, this.joints[i].y)
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(51);
  stroke(255);
  fill(255)

  chain = new Chain(2)
}

function draw() {
  chain.show()
}