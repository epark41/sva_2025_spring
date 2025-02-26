let vehicle;
let gravity;

function setup(){
createCanvas(800,800);
    vehicle = new Vehicle(width/2,0);
    vehicle.applyForce(createVector(0.1,0.1));
    gravity  = createVector(0,0.1);
}

function draw(){
    background(180);
    
    if (mouseIsPressed){
        let wind;
    
        if(vehicle.pos.x < mouseX){
        wind = createVector(-1,0);
        }
        else{
        wind = createVector(1,0);
        }
        vehicle.applyForce(wind);
    }


    vehicle.applyForce(gravity);
    vehicle.bounce();
    vehicle.update();
    vehicle.display(); 

 }

 
