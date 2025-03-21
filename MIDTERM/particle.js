class Particle {
  constructor(loc, size) {
    this.loc = loc.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.friction = 0.98;
    this.size = size;
    this.maxAge = 200;
    this.age = random(150, this.maxAge);
    this.isDead = false;
    this.hasForce = false;
    this.activeColor = color(random(0,360),random(0,100),random(0,100));
    this.deactiveColor = color(255);
    this.currentColor = color(255);
    this.alpha = 0.5;  
  }

  applyForce(force) {
    this.hasForce = true;
    this.acc.add(force.copy());
  }

  update() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(this.friction);

    this.age--;
    if (this.age <= 0) {
      this.alpha = lerp(this.alpha, 0, 0.1);
    }
  }

  display() {
    noStroke();
    fill(200, 100, 255, this.alpha * 0.5);
    ellipse(this.loc.x, this.loc.y, this.size);
    this.hasForce = false;
  }
  
}

