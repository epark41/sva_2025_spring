let engine;
let shapes = [];

function setup() {
    createCanvas(600, 600);
    engine = Matter.Engine.create();
    setupChain();
    setupMouse();

}

function setupChain() {
    const radius = 25;
    const anchor = { x: width / 2, y: 100 };
    let prevCircle;
    for (let i = 0; i < 5; i++) {
        const circle = new Circle(engine.world,
            createVector(anchor.x + i * radius * 1.1, anchor.y),
            createVector(radius * 2, 0));
        shapes.push(circle);

        const constraintOptions = {
            bodyB: circle.body,
            length: radius * 2.5,
            stiffness: 0.5
        }

        if (prevCircle) {
            constraintOptions.bodyA = prevCircle.body;

        } else {
            constraintOptions.pointA = anchor;
        }
        const constraint = Matter.Constraint.create(constraintOptions);
        Matter.Composite.add(engine.world, constraint);

        prevCircle = circle;
    }
}

function setupMouse(){
    const mouse = Matter.Mouse.create();
    const mouseOptions = {
        mouse: mouse
    };
    const mouseConstraint = Matter.MouseConstraint.create(engine,mouseOptions);
    Matter.Composite.add(engine.world,mouseConstraint);
}

function draw() {

    background(175);

    for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        shape.display();
    }

    Matter.Engine.update(engine, 1000 / 30);
}

