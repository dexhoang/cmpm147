// sketch.js - purpose and description here
// Author: Dexter Hoang
// Date: 4/16/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;
const darkSkyColor = "#1e4854";
const lightSkyColor = "#417c87";
const mountainColor = "#222026";
const snowColor = "#c0d7d1";
const treeLeave = "#364311";
const northernLightColor = "#2ab266";
const lightOverlay = "#6fd47e";
const brightLight = "#84b4b4";
const treeTrunk = "#372A11";

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let seed = 0;
let xOffset = 0;
let yOffset = -50;


class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function drawPineTree(x, y) {
  fill(treeTrunk);
  triangle(x - 5, y, x + 5, y, x, y - 20);

  fill(treeLeave);
  triangle(x - 15, y - 10, x + 15, y - 10, x, y - 50);
  triangle(x - 10, y - 30, x + 10, y - 30, x, y - 60);
  triangle(x - 5, y - 50, x + 5, y - 50, x, y - 80);
}


// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  //background
  let darkSky = color(2,50,70,255);
  let lightSky = color(48,123,142,255);
  let interA = lerpColor(darkSky, lightSky, 0.40);
  let interB = lerpColor(darkSky, lightSky, 0.70);
  
  noStroke();
  background(darkSkyColor);
  fill(lightSkyColor);
  rect(0, height-70, width, height);
  fill(interA);
  rect(0, height/3, width, height/4);
  fill(interB);
  rect(0, height/2, width, height/5);
  filter(BLUR, 14)

  //northern lights
  stroke(northernLightColor)
  let noiseLevel = 120;
  let noiseScale = 0.02;
  let spacing = 5;
  xOffset += 1;
  randomSeed(seed)
  
  blendMode(BLEND);
  for (let x = 0; x < width; x += spacing) {
    let nx = noiseScale * (x + xOffset);
    let y = noiseLevel * noise(nx) + random(10, 20);
    let z = noiseLevel * noise(nx) + random(80, 90);

    line(x, z - yOffset + 200, x, y - yOffset);
  }
  
  stroke(lightOverlay);
  randomSeed(seed)
  blendMode(ADD);
  for (let x = 0; x < width; x += spacing) {
    let nx = noiseScale * (x + xOffset);
    let y = noiseLevel * noise(nx) + 20;
    let z = noiseLevel * noise(nx) + random(80, 90);

    line(x + 5, z - yOffset + 200, x - 5, y - yOffset);
  }
  
  randomSeed(seed)
  for (let x = 0; x < width; x += spacing) {
    let nx = noiseScale * (x + xOffset);
    let y = noiseLevel * noise(nx) + 20;
    let z = noiseLevel * noise(nx) + random(80, 90);

    line(x - 20, z - yOffset+ 200, x - 20, y - yOffset);
  }
  //xOffset %= width;
  
  blendMode(BLEND);
  filter(BLUR, 3);
  
  noStroke();
  
  //ground
  fill(snowColor);
  rect(0, height-28, width, height);

  //mountains
  fill(mountainColor);
  beginShape();
  vertex(0, height-20);
  const steps = random(15, 20);
  for (let i = 0; i < steps + 1; i++) {
    fill(mountainColor);
    let x = (width * i) / steps ;
    let y = height / 2 - (noise(i * random(0.3, 0.5)) * 100) + 120;
    vertex(x, y);
  }

  beginShape();
  vertex(0, height-20);
  for (let i = 0; i < steps + 1; i++) {
    fill(mountainColor);
    let x = (width * i) / steps ;
    let y = height / 2 - (noise(i * random(0.3, 0.5)) * 100) + random(150, 200);
    vertex(x, y);
  }
  vertex(width, height-25);
  endShape(CLOSE);

   //trees
   for (let i = 0; i < 40; i ++) {
    let treeX = random(width);
    let treeY = height - random(20, 40) + 20;
    drawPineTree(treeX, treeY);
  }

}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}