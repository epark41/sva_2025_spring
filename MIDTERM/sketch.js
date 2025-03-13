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
  image(video, 0, 0, width, height);

  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];

    let upperLip = face.keypoints[13]; 
    let lowerLip = face.keypoints[14]; 

    let mouthOpenDist = dist(upperLip.x, upperLip.y, lowerLip.x, lowerLip.y);

    if (mouthOpenDist > 15) { 
      particleSystem.addParticles(createVector(upperLip.x, upperLip.y), 1);
    }
  }

  particleSystem.draw();
}
