class Chain {
    constructor(numJoints = 4) {
  
      this.joints = []
      this.distances = []
      this.chainLength = 0
      
      // Add a base joint.
      this.joints.push(new Joint(400, 400))
  
      // Add the rest of the joints.
      for (let i = 1; i <= numJoints - 1; i++) {
        let jointX = this.joints.at(-1).x - Math.random() * 200
        let jointY = this.joints.at(-1).y + Math.random() * 100
        this.joints.push(new Joint(jointX, jointY))
  
        // Add the new link's length to the total length of the chain.
        this.chainLength += dist(this.joints.at(-1).x, this.joints.at(-1).y, this.joints.at(-2).x, this.joints.at(-2).y)
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
        if (i > 0)
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
  
        let maxIterations = 30;
        while (maxIterations--) {
          // STAGE 1: Forward Reaching
          // Set end effector (last joint) to the target's position.
          this.joints[this.joints.length - 1].x = target.x
          this.joints[this.joints.length - 1].y = target.y
  
          for (let i = this.joints.length - 2; i >= 0; i--){
            // Find the dist between the recently updated (i + 1)-th joint and the i-th joint.
            let jointDistance = dist(this.joints[i + 1].x, this.joints[i + 1].y, this.joints[i].x, this.joints[i].y)
            let lambda = this.distances[i] / jointDistance
  
            // Find the new joint positions.
            let newX = (1 - lambda) * this.joints[i + 1].x + lambda * this.joints[i].x
            let newY = (1 - lambda) * this.joints[i + 1].y + lambda * this.joints[i].y
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