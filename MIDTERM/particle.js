class Particle {
  constructor(loc, size) {
    this.loc = loc.copy();
    this.vel = createVector(0, random(-1.5, -0.5));
    this.acc = createVector(0, 0);
    this.friction = 0.98;
    this.size = size;
    this.maxAge = 200;
    this.age = random(150, this.maxAge);
    this.isDead = false;

    this.alpha = 60;          // ← 초기 불투명도: 약 60%
    this.targetAlpha = 0;     // 서서히 사라질 목표값

    // 연하고 밝은 파스텔 계열
    this.currentColor = color(random(180, 250), random(30, 60), 100);
  }

  applyForce(force) {
    this.acc.add(force.copy());
  }

  update() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(this.friction);

    this.age--;

    if (this.age < 50) {
      this.targetAlpha = 0;
    }

    this.alpha = lerp(this.alpha, this.targetAlpha, 0.05);

    if (this.alpha < 1) {
      this.isDead = true;
    }
  }

  display() {
    noStroke();
    let bubbleColor = color(
      hue(this.currentColor),
      saturation(this.currentColor),
      brightness(this.currentColor),
      this.alpha
    );
    fill(bubbleColor);
    ellipse(this.loc.x, this.loc.y, this.size);
  }
}
