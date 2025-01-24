let btn;

function setup() {
    createCanvas(400, 400);
    btn = select('#my_button');
    btn.mouseClicked(onBtnClicked);
    
  }
  
   function onBtnClicked(){
    fill(random(255));
   }

  function draw() {
    background(100);
    circle(200,200,200);
    rect(200,200,100);
    rect(100,100,100);

  }