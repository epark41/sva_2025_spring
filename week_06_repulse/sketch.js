let particleSystem;

function setup() {
  colorMode(HSB, 360, 100, 100);
  createCanvas(600, 600);
  noStroke();
  
  particleSystem = new ParticleSystem();
}

function draw() {
  background(0);
  particleSystem.draw();

  if (mouseIsPressed) {
    let mousePos = createVector(mouseX, mouseY);
    particleSystem.addParticles(mousePos, 1);
  }
}


function mousePressed() {
  
}
