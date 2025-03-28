let circleX;
let circleY;
let circleSize;
let circleColor;
let message = 'Nothing';

function setup() {

    createCanvas(500, 300);
    circleX = width / 2;
    circleY = height / 2;
    circleSize = 50;
    circleColor = color(255, 0, 0);
}


function draw() {

    background(220);
    fill(circleColor);
    circle(circleX, circleY, circleSize);
    fill(0);
    text(message, width * 0.45, height * 0.1);
}

function mouseClicked() {

    console.log('click');
    anim();
}

function delay(timeDelay) {
    return new Promise(resolve => setTimeout(resolve, timeDelay));
}

async function anim() {

    await delay(1000);
    circleSize = 150;

    await delay(1000);
    circleX = width * 0.75;
    message = 'move to right';

    await delay(1000);
    circleColor = color(0, 0, 255);

    await delay(1000);
    circleX = width * 0.5;

    await delay(1000);
    circleSize = 50;

}

function callBack() {

    console.log('timeout:', millis())
}