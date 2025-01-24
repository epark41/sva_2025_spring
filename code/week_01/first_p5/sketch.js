let btn;

function setup() {
    createCanvas(windowWidth,windowHeight);
    rectMode(CENTER);
    btn = select('#my_button');
    btn.mouseClicked(onBtnClicked);
    
  }
  
   function onBtnClicked(){
    fill(random(255));
   }

  function draw() {
    background(50);
    circle(200,200,200);
    circle(400,400,200);
    circle(600,600,200);
    circle(800,800,200);

    if(mouseIsPressed){
      line(pmouseX,pmouseY,mouseX,mouseY);
    }
  }

  function windowResized(){
     resizeCanvas(windowWidth,windowHeight)
  }