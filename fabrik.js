var angle = Math.PI / 6;
var trees = 7;
var xoff = 0.02;
var col = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(1) //framerate adjustment is laggy
  noLoop()
}

function draw() {
  background(240);
  stroke(0);
  for (var i = 0; i <= trees; i++) {           //shorties
    push();
    translate(i * width / trees, height+30);
    branch(random(60, 110));
    pop();
  }
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len, 0);

  if (len > 1.3) {
    if (len < 10) stroke(0, 170, 0)
    push();
    rotate(map(noise(xoff), 0, 1, Math.PI / 7, angle));
    branch(len * random(0.60, 0.79));
    pop();
    push();
    rotate(-(map(noise(xoff), 0, 1, Math.PI / 7, angle)));
    branch(len * random(0.60, 0.79));
    pop();
  }
}