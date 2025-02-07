let pos;
let vel;

function setup(){
createCanvas(800,800);
    pos = createVector(width/2,height/2);
    vel = createVector(0.1,0.1);

}

function draw(){
    background(180);

    pos.add(vel);
    
    const lineVec = createVector(100,100);
    const aVec = createVector(0,100);
    //lineVec.add(aVec);
    //lineVec.sub(aVec);
    //lineVec.mult(2);
    //lineVec.div(2);
    lineVec.normalize();
    lineVec.mult(100);

    translate(width/2,height/2);
    line (0,0,lineVec.x, lineVec.y);
 }