let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine, world;
let rawData = [];
let currentIndex = 0;
let circles = [];
let dataLoaded = false;
let started = false;
let startButton;

let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let columns = {};
let weekdayCounts = {};
let weekdaySums = {};
let weekdayAverages = {};

function preload() {
  loadJSON("data/walking_day.json", (data) => {
    rawData = data;
    dataLoaded = true;
  });
}

function setup() {
  createCanvas(1000, 800);
  engine = Engine.create();
  world = engine.world;
  frameRate(30);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < weekdays.length; i++) {
    columns[weekdays[i]] = map(i, 0, 6, 100, width - 100);
    weekdayCounts[weekdays[i]] = 0;
    weekdaySums[weekdays[i]] = 0;

    let x = columns[weekdays[i]];
    let wallWidth = 120;
    let wallLeft = Bodies.rectangle(x - wallWidth * 0.6, height / 2, 10, height, { isStatic: true });
    let wallRight = Bodies.rectangle(x + wallWidth * 0.6, height / 2, 10, height, { isStatic: true });
    World.add(world, [wallLeft, wallRight]);
  }

  let floor = Bodies.rectangle(width / 2, height + 40, width, 150, { isStatic: true });
  World.add(world, floor);

  startButton = createButton("START");
  startButton.position(width / 2 - 50, height / 2 - 25);
  startButton.size(100, 50);
  startButton.style("font-size", "16px");
  startButton.mousePressed(() => {
    started = true;
    startButton.hide();
  });
}

function draw() {
  background(255);

  if (!dataLoaded || !started) return;

  Engine.update(engine);

  if (frameCount % 1 === 0 && currentIndex < rawData.length) {
    let d = rawData[currentIndex];
    let day = d.day;
    let steps = d.steps;

    let x = columns[day];
    let r = map(steps, 35, 70897, 5, 50);

    weekdayCounts[day]++;
    weekdaySums[day] += steps;

    circles.push(new StepCircle(x, -20, r, day, weekdayCounts[day]));
    currentIndex++;
  }

  for (let i = circles.length - 1; i >= 0; i--) {
    if (circles[i].isOffscreen()) {
      World.remove(world, circles[i].body);
      circles.splice(i, 1);
    } else {
      circles[i].show();
    }
  }

  drawDayLabels();
  drawAverageLabels();

  if (rawData[currentIndex]) {
    let date = rawData[currentIndex].date;
    let yearMonth = date.slice(0, 7);
    fill(0);
    noStroke();
    textSize(16);
    text(yearMonth, width / 2, 20);
  }
}

function drawDayLabels() {
  fill(0);
  textSize(14);
  for (let i = 0; i < weekdays.length; i++) {
    const x = columns[weekdays[i]];
    textAlign(CENTER, TOP);
    text(weekdays[i], x, height - 20);
  }
}

function drawAverageLabels() {
  textSize(12);
  textAlign(CENTER, BOTTOM);
  for (let i = 0; i < weekdays.length; i++) {
    let day = weekdays[i];
    if (weekdayCounts[day] > 0) {
      let avg = floor(weekdaySums[day] / weekdayCounts[day]);
      fill(80);
      text(`${avg.toLocaleString()} steps`, columns[day], height - 50);
    }
  }
}
