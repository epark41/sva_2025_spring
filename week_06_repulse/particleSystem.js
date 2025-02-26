class ParticleSystem {
    constructor() {
      this.particles = [];
      this.gravity = createVector(0, 0.08);
    }
    
    draw() {
      for (let i = this.particles.length-1; i >= 0; i-- ) { 
        let p = this.particles[i];
        
        
        for (let j=i; j >=0; j--) {
          let op = this.particles[j];
          
          let distance = p.loc.dist(op.loc);
          if (distance > 0 && distance < (p.size + op.size) * 0.5 + 1) {
            var pushForce = p5.Vector.sub(p.loc, op.loc);
            pushForce.normalize();
            pushForce.div(distance*2);
            pushForce.limit(1);
            p.applyForce(pushForce);
            op.applyForce(pushForce.mult(-1)); 
          }
        }
        
        p.update();
        p.display();
        
        if (p.isDead) {
          this.particles.splice(i, 1);
        }
      }
    }
    
  
    addParticles(pos, numOfParticles) {
      for (let i = 0; i < numOfParticles; i++ ) {
        let randomSize = random(15, 20);
        let particle = new Particle(pos, randomSize);
        let randomX = cos(random(0, PI*2));
        let randomY = sin(random(0, PI*2));
        let randomForce = createVector(randomX, randomY);
        //randomForce.mult(0.00001);
        particle.applyForce(randomForce);
        this.particles.push(particle);
  
      }
    }
  }