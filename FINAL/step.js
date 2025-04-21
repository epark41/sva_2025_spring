class StepCircle {
  constructor(x, y, r, day, count) {
    this.day = day;
    this.r = r;
    this.count = count;

    this.body = Matter.Bodies.circle(x, y, r, {
      restitution: 0.2,
      friction: 0.02,
      density: 0.001
    });
    Matter.World.add(world, this.body);
  }

  show() {
    let baseColor;
    switch (this.day) {
      case "Monday": baseColor = color(100, 150, 255); break;
      case "Tuesday": baseColor = color(120, 100, 255); break;
      case "Wednesday": baseColor = color(150, 100, 220); break;
      case "Thursday": baseColor = color(200, 80, 180); break;
      case "Friday": baseColor = color(255, 100, 150); break;
      case "Saturday": baseColor = color(255, 80, 100); break;
      case "Sunday": baseColor = color(255, 120, 120); break;
      default: baseColor = color(200); break;
    }

    fill(baseColor);
    stroke(255);
    let pos = this.body.position;
    circle(pos.x, pos.y, this.r * 2);
  }

  isOffscreen() {
    let pos = this.body.position;
    return pos.y > height + 50;
  }
}
