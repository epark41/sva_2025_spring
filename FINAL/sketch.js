let stepsData = [];
let currentIndex = 0;
let stepObjects = [];
let dataLoaded = false;

function preload() {
  loadJSON('data/walking.json', (data) => {
    stepsData = data;
    dataLoaded = true;
  });
}

function setup() {
  createCanvas(800, 800);
  frameRate(30);
  angleMode(RADIANS);
  textAlign(CENTER, CENTER);
  textSize(14);
}

function draw() {
  if (!dataLoaded) return;

  background(190);

  if (stepObjects.length === 0) {
    for (let i = 0; i < stepsData.length; i++) {
      let obj = new StepDay(stepsData[i].date, stepsData[i].steps, i);
      stepObjects.push(obj);
    }
  }

  // 원 표시
  for (let i = 0; i < stepObjects.length; i++) {
    stepObjects[i].display(currentIndex);
  }

  // 날짜 텍스트 출력
  fill(0);
  noStroke();

  // 날짜 증가 (애니메이션 효과)
  if (frameCount % 3 === 0 && currentIndex < stepObjects.length - 1) {
    currentIndex++;
  }

  // 📌 상태 바 그리기
  drawProgressBar();
}

function drawProgressBar() {
    const barX = 50;
    const barY = height - 40;
    const barWidth = width - 100;
    const barHeight = 10;
  
    const progress = map(currentIndex, 0, stepsData.length - 1, 0, 1);
  
    // 상태 바 배경
    noStroke();
    fill(230);
    rect(barX, barY, barWidth, barHeight);
  
    // 진행된 부분
    fill(50);
    rect(barX, barY, barWidth * progress, barHeight);
  
    // 날짜 텍스트를 따라가게
    if (stepsData[currentIndex]) {
      let labelX = barX + (barWidth * progress);
      let labelY = barY - 15;
  
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text(stepsData[currentIndex].date, labelX, labelY);
    }
  
  }
  
