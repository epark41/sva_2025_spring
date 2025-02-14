let particleSystem;
function setup(){
    createCanvas(800,800);
    particleSystem = new ParticleSystem();

}

function draw(){
    background(150);
    particleSystem.loop();
}

function mousePressed(){
    particleSystem.addParticles(mouseX,mouseY,10);
}


