let chain;
let target;

// Colours
const offWhite = [238, 238, 228]
const darkBlue = [6, 57, 112]
const orangish = [234, 182, 118]


function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(...offWhite);
  strokeWeight(5)

  chain = new Chain(numJoints = 12)
  target = new Target(600, 600, 20, 20)
}

function draw() {
  chain.update(target)
  target.update()
  background(...darkBlue);


  chain.show()
  target.show()
}
