let particleSystem;
let faceMesh;
let options = { maxFaces: 1, refineLandmarks: false, flipped: false };
let video;
let faces = [];

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);
  colorMode(HSB);
  particleSystem = new ParticleSystem();
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
}

function gotFaces(results) {
  faces = results;
}

function draw() {
  background(180);

  // 좌우 반전 비디오 출력
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  // 얼굴 분석
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let upperLip = face.keypoints[13];
    let lowerLip = face.keypoints[14];
    let mouthOpenDist = dist(upperLip.x, upperLip.y, lowerLip.x, lowerLip.y);

    if (mouthOpenDist > 15) {
      // 입 좌표도 좌우 반전
      let mirroredX = width - upperLip.x;
      particleSystem.addParticles(createVector(mirroredX, upperLip.y), 1);
    }
  }

  particleSystem.draw();
}
