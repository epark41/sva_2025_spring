class ParticleSystem {
  constructor() {
    this.particles = [];
    this.gravity = createVector(0, -0.08); // 위로 떠오르는 효과
    this.maxParticles = 500;
  }

  draw() {
    while (this.particles.length > this.maxParticles) {
      this.particles.shift();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];

      for (let j = i - 1; j >= 0; j--) {
        let op = this.particles[j];
        let distance = p.loc.dist(op.loc);
        if (distance > 0 && distance < (p.size + op.size) * 0.5 + 1) {
          let pushForce = p5.Vector.sub(p.loc, op.loc);
          pushForce.normalize();
          pushForce.div(distance * 2);
          pushForce.limit(1);
          p.applyForce(pushForce);
          op.applyForce(pushForce.copy().mult(-1));
        }
      }

      p.applyForce(this.gravity);
      p.update();
      p.display();

      if (p.isDead) {
        this.particles.splice(i, 1);
      }
    }
  }

  addParticles(pos, numOfParticles) {
    for (let i = 0; i < numOfParticles; i++) {
      let randomSize = random(10, 40);
      let particle = new Particle(pos, randomSize);
      let randomDir = p5.Vector.random2D().mult(random(0.5, 2));
      particle.applyForce(randomDir);
      this.particles.push(particle);
    }
  }
}
