let chain;
let target;

class Chain {
  constructor(numJoints) {

    this.joints = []
    this.distances = []
    this.chainLength = 0
    
    // Add a base joint.
    this.joints.push(new Joint(400, 200))

    // Add the rest of the joints.
    for (let i = 1; i <= numJoints - 1; i++) {
      let jointX = this.joints.at(-1).x - Math.random() * 200
      let jointY = this.joints.at(-1).y + Math.random() * 100

      // Add this new link to the total length of the chain.
      this.chainLength += dist(this.joints.at(-1).x, this.joints.at(-1).y, jointX, jointY)
      this.joints.push(new Joint(jointX, jointY))
    }
    this.setDistances()
  }

  setDistances() {
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

    // Check whether the target is within reach.
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
      let baseX = this.joints[0].x
      let baseY = this.joints[0].y

      let maxIterations = 10;
      while (maxIterations--) {
        // STAGE 1: Forward Reaching
        // Set end effector (last joint) as the target's position.
        this.joints[this.joints.length - 1].x = target.x
        this.joints[this.joints.length - 1].y = target.y

        for (let i = this.joints.length - 2; i >= 0; i--){
          // Find the dist between the recently updated (i + 1)-th joint and the i-th joint.
          let jointDistance = dist(this.joints[i + 1].x, this.joints[i + 1].y, this.joints[i].x, this.joints[i].y)
          let lambda = this.distances[i] / jointDistance

          // Find the new joint positions.
          let newX = (1 - lambda) * this.joints[i + 1].x + lambda * this.joints[i + 1].x
          let newY = (1 - lambda) * this.joints[i + 1].y + lambda * this.joints[i + 1].y
          this.joints[i].setPosition(newX, newY)
        }


        // STAGE 2: Backward Reaching
        // Set the first joint back to it's inital position (baseX, baseY)
        this.joints[0].x = baseX
        this.joints[0].y = baseY

        for (let i = 0; i <= this.joints.length - 2; i++){
          // Find the dist between the new i-th joint and the (i+1)-th joint.
          let jointDistance = dist(this.joints[i + 1].x, this.joints[i + 1].y, this.joints[i].x, this.joints[i].y)
          let lambda = this.distances[i] / jointDistance

          // Find the new joint position.
          let newX = (1 - lambda) * this.joints[i].x + lambda * this.joints[i + 1].x
          let newY = (1 - lambda) * this.joints[i].y + lambda * this.joints[i + 1].y
          this.joints[i + 1].setPosition(newX, newY)
        }
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);

  chain = new Chain(numJoints = 4)
  target = new Target(600, 600, 20, 20)
}

function draw() {
  chain.update(target)
  target.update()
  background(51);

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

  update() {
    this.x = mouseX;
    this.y = mouseY;
  }
}


// TODO: Try with a tolerance and difference instead of iteration limit for convergence later. 
// TODO: Add random orthogonal move to start the bend and prevent locking.
