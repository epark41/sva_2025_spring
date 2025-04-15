class Particle {
  constructor(loc, size) {
    this.loc = loc.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.friction = 0.98;
    this.size = size;
    this.maxAge = 500;
    this.age = random(150, this.maxAge);
    this.isDead = false;
    this.hasForce = false;

    this.activeColor = color(random(180, 200),random(30,60), 100); // 파스텔 HSB
    this.deactiveColor = color(255); // 죽을 때 색상 바꾸고 싶을 때 사용
    this.currentColor = this.activeColor;

    this.alpha = random(0.5, 0.8);  // 더 연하게 낮춤
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

    // 벽 반사
    let r = this.size / 2;
    if (this.loc.x < r || this.loc.x > width - r) {
      this.vel.x *= -1;
      this.loc.x = constrain(this.loc.x, r, width - r);
    }
    if (this.loc.y < r || this.loc.y > height - r) {
      this.vel.y *= -1;
      this.loc.y = constrain(this.loc.y, r, height - r);
    }

    this.age--;
    if (this.age <= 0) {
      this.alpha = lerp(this.alpha, 0, 0.05); // 점점 투명해짐
      if (this.alpha < 0.01) {
        this.isDead = true;
      }
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
    this.hasForce = false;
  }
}
