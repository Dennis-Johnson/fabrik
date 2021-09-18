let chain;
let target;

class Chain {
  constructor(numJoints, linkLengths) {
    if (!(linkLengths instanceof Array) || linkLengths.length != numJoints) {
      throw "An invalid linkLengths array was passed"
    }

    this.joints = []
    this.distances = []
    this.chainLength = linkLengths.reduce((accumulator, linkLength) => accumulator + linkLength, 0)
    
    // Add a base joint.
    this.joints.push(new Joint(100, 100))

    // Add the rest of the joints with their corresponding link lengths.
    // Initialize their positions relative to the preceding joint (joint index -1)
    for (let i = 1; i <= numJoints; i++) {
      this.joints.push(new Joint(this.joints.at(-1).x, this.joints.at(-1).y + linkLengths[i-1]))
      this.distances.push(0)
    }

    this.updateDistances()
  }

  updateDistances() {
    // Update the distances between consecutive joints. 
    for (let i = 0; i <=this.joints.length - 2; i++){
      this.distances[i] = dist(this.joints[i + 1].x, this.joints[i + 1].y, this.joints[i].x, this.joints[i].y)
    }
  }

  show() {
    for (let i = 0; i < this.joints.length; i++) {
      this.joints[i].show()

      // Draw the connecting line segments.
      if(i > 0)
        line(this.joints[i-1].x, this.joints[i-1].y, this.joints[i].x, this.joints[i].y)
    }
  }

  update(target) {
    const rootDistance = dist(this.joints[0].x, this.joints[0].y, target.x, target.y)
    console.log("Root Distance: " + rootDistance)

    // Check whether target is within reach.
    if (rootDistance > this.chainLength) {
      for (let i = 0; i <= this.joints.length - 2 ; i++){
        let jointToTargetDist = dist(target.x, target.y, this.joints[i].x, this.joints[i].y)
        let lambda = this.distances[i] / jointToTargetDist;

        let newX = (1 - lambda) * this.joints[i].x + lambda * target.x;
        let newY = (1 - lambda) * this.joints[i].y + lambda * target.y;
        this.joints[i + 1].setPosition(newX, newY)
      }
    }
    else {
      // TODO: Add reachable branch logic. 
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(51);
  stroke(255);

  chain = new Chain(numJoints = 4, [170, 150, 100, 70])
  target = new Target(1000, 700, 20, 20)
}

function draw() {
  chain.update(target)

  chain.show()
  target.show()
}


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
    fill(255)
    stroke(255)
    ellipse(this.x, this.y, Joint.diameter, Joint.diameter);
  }
}

class Target{
  static cornerRadii = 3;
  constructor(x, y, height, width) {
    this.setPosition(x, y)
    this.height = height;
    this.width = width;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(0, 255, 0)
    noStroke()
    rect(this.x, this.y, this.height, this.width, Target.cornerRadii)
  }
}