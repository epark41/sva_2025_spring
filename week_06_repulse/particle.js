class Particle {
    constructor(loc, size) {
      this.loc = loc.copy();
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.friction = 0.98;
      this.size = size;
      this.maxAge = 200;
      this.age = random(80, this.maxAge);
      this.isDead = false;
      this.hasForce = false;
      this.activeColor = color(random(360), 90, 80);
      this.deactiveColor = color(255);
      this.currentColor = color(255);
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
        //this.isDead = true;
      }
    }
    
  
    display() {
      let colorLerpFactor = 0.05;
      if (this.hasForce) {
        this.currentColor = lerpColor(this.currentColor, this.activeColor, colorLerpFactor);      
      } else {
        this.currentColor = lerpColor(this.currentColor, this.deactiveColor, colorLerpFactor);   
      }
      fill(this.currentColor);
      ellipse(this.loc.x, this.loc.y, this.size);
      this.hasForce = false;
    }
    
  }