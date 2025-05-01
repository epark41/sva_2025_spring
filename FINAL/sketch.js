let Engine = Matter.Engine,  
    World  = Matter.World,   
    Bodies = Matter.Bodies;  
let engine, world;


let rawData = [];        
let currentIndex = 0;    
let circles = [];       
let dataLoaded = false; 
let started = false;


const weekdays = [
  "Sunday","Monday","Tuesday", 
  "Wednesday","Thursday","Friday","Saturday"
];
let columns = {};        
let weekdayCounts = {};  
let weekdaySums = {};    


function preload() {
  loadJSON("data/walking_day.json", data => {
    rawData = data;       
    dataLoaded = true;   
  });
}


function setup() {
 
  createCanvas(1000, 800).parent(document.body);
 
  textAlign(CENTER, CENTER);

  engine = Engine.create({
    positionIterations:   40, 
    velocityIterations:   20, 
    constraintIterations: 8,   
    enableSleeping:       true, 
    solver: {
      iterations: 40,          
      tolerance:  0.001       
    }
  });
  world = engine.world;
  frameRate(40);

  for (let i = 0; i < weekdays.length; i++) {
    const day = weekdays[i];
    columns[day] = map(i, 0, 6, 100, width - 100);
    weekdayCounts[day] = 0;  
    weekdaySums[day] = 0; 

    const x = columns[day], w = 110;
    const leftWall  = Bodies.rectangle(x - w*0.5, height/2, 10, height, { isStatic: true });
    const rightWall = Bodies.rectangle(x + w*0.5, height/2, 10, height, { isStatic: true });
    World.add(world, [leftWall, rightWall]);
  }

  
  const floor = Bodies.rectangle(width/2, height + 40, width, 200, { isStatic: true });
  World.add(world, floor);

  
  select('#start-btn').mousePressed(() => {
    started = true;             
    select('#start-btn').hide(); 
  });
}


function draw() {
  background(255);
  if (!dataLoaded || !started) return;

  for (let i = 0; i < 4; i++) {
    Engine.update(engine, (1000/60)/4, 1);
  }

  if (currentIndex < rawData.length) {
    const { date, day, steps } = rawData[currentIndex];
    const x = columns[day];
    const r = map(steps, 35, 70897, 5, 33);

    
    weekdayCounts[day]++;
    weekdaySums[day] += steps;

   
    circles.push(new StepCircle(x, -20, r, day, date, steps));
    currentIndex++;
  }

 
  for (let c of circles) {
    c.show(); 
  }

  drawWeekdayLabels();
  drawAvgSteps();

  if (rawData[currentIndex]) {
    const ym = rawData[currentIndex].date.slice(0, 7);
    noStroke(); fill(0); textSize(16);
    text(ym, width/2, 20);
  }

  for (let c of circles) {
    let pos = c.body.position;
    if (dist(mouseX, mouseY, pos.x, pos.y) < c.r) {
      _showTooltip(c, pos.x, pos.y);
      break;
    }
  }
}


function drawWeekdayLabels() {
  fill(0);
  textSize(20);
  for (let day of weekdays) {
    text(day, columns[day], height - 40);
  }
}


function drawAvgSteps() {
  textSize(14);
  fill(0);
  for (let day of weekdays) {
    if (weekdayCounts[day] > 0) {
      const avg = floor(weekdaySums[day] / weekdayCounts[day]);
      text(`${avg.toLocaleString()} steps`, columns[day], height - 20);
    }
  }
}


function _showTooltip(circleObj, cx, cy) {
  const padding = 6;
  textSize(12);
  const lines = [
    `Date: ${circleObj.date}`,
    `Day:  ${circleObj.day}`,
    `Steps:${circleObj.steps.toLocaleString()}`
  ];

  let w = 0;
  for (let l of lines) w = max(w, textWidth(l));
  const h = textAscent() * lines.length + padding * 2;
  w += padding * 2;

  let tx = constrain(mouseX + 10, 0, width - w);
  let ty = constrain(mouseY - h - 10, 0, height - h);

  fill(255, 230);
  noStroke();
  rect(tx, ty, w, h, 4);

  fill(0);
  textAlign(LEFT, TOP);
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], tx + padding, ty + padding + i * textAscent());
  }
  textAlign(CENTER, CENTER);
}