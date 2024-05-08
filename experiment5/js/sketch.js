// sketch.js - purpose and description here
// Author: Dexter Hoang
// Date: 4/16/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

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


function getInspirations() {
  return [
    {
      name: "Gojo Purple",
      assetUrl: "https://cdn.glitch.global/3bdce7bd-a69a-4705-a766-1cce45721862/gojopurple.jpeg?v=1715133643607",
      credit: "Jujutsu Kaisen, 2020"
    },
    {
      name: "Spirited Away",
      assetUrl: "https://cdn.glitch.global/3bdce7bd-a69a-4705-a766-1cce45721862/spirited.jpeg?v=1715133842935",
      credit: "Spirited Away, 2002"
    },
    {
      name: "QOT - Wedding",
      assetUrl: "https://cdn.glitch.global/3bdce7bd-a69a-4705-a766-1cce45721862/queen.jpeg?v=1715134011656",
      credit: "Queen of Tears, 2024"
    },
    {
      name: "Spongebob and Patrick",
      assetUrl: "https://cdn.glitch.global/3bdce7bd-a69a-4705-a766-1cce45721862/spongebob.jpeg?v=1715138855993",
      credit: "Spongebob Squarepants, 1999"
    },
    {
      name: "The Creation of Adam",
      assetUrl: "https://cdn.glitch.global/3bdce7bd-a69a-4705-a766-1cce45721862/Michelangelo_-_Creation_of_Adam_(cropped).jpg?v=1715139156740",
      credit: "The Creation of Adam, Michelangelo, 1512"
    }
  ];
}

function initDesign(inspiration) {
  resizeCanvas(inspiration.image.width, inspiration.image.height);
  let num = ((inspiration.image.width) * (inspiration.image.height /4)) / 25;
  
  let design = {
    background: 255,
    shapes: []
  }
  
  for (let i = 0; i < num; i++) {
    let randX = random(inspiration.image.width);
    let randY = random(inspiration.image.height);
    let color = inspiration.image.get(randX, randY);
    let shapeNum = int(random(3));
    
    if (shapeNum == 0) {
      design.shapes.push({
        type: "circle",
        x: randX,
        y: randY,
        d: random(20, 40),
        fill: color,
      })
    }
    
    else if (shapeNum == 1) {
      design.shapes.push({
        type: "rectangle",
        x: randX,
        y: randY,
        w: random(20, 40),
        h: random(20, 40),
        fill: color,
      })
    }
    
    else if (shapeNum == 2) {
      design.shapes.push({
        type: "triangle",
        x1: randX,
        y1: randY,
        x2: randX + 10,
        y2: randY - 20,
        x3: randX + 20,
        y3: randY,
        fill: color,
      })
    }
    
  }
  

  return design;
}

function renderDesign(design, inspiration) {
  background(design.background)
  
  for(let shape of design.shapes) {
    noStroke();
    fill(shape.fill);
    
    if (shape.type === "circle") {
      ellipse (shape.x, shape.y, shape.d);
    } 
    
    else if (shape.type === "rectangle") {
      rect (shape.x, shape.y, shape.w, shape.h);
    } 
    
    else if (shape.type === "triangle") {
      triangle (shape.x1, shape.y1, shape.x2, shape.y2, shape.x3, shape.y3);
    }
  }
  
  
}

function mutateDesign(design, inspiration, rate) {
  for (let shape of design.shapes) {
    if (shape.type === "circle") {
      shape.x = mut(shape.x, 0, inspiration.image.width, rate)
      shape.y = mut(shape.y, 0, inspiration.image.height, rate)
      shape.d = mut(shape.d, 0, random(20, 40), rate)
    }
    
    else if (shape.type === "rectangle") {
      shape.x = mut(shape.x, 0, inspiration.image.width, rate)
      shape.y = mut(shape.y, 0, inspiration.image.height, rate)
      shape.w = mut(shape.w, 0, random(20, 40), rate)
      shape.h = mut(shape.h, 0, random(20, 40), rate)
    }
    
    else if (shape.type === "triangle") {
      shape.x1 = mut(shape.x1, 0, inspiration.image.width, rate)
      shape.y1 = mut(shape.y1, 0, inspiration.image.height, rate)
      shape.x2 = mut(shape.x2, 0, inspiration.image.width, rate)
      shape.y2 = mut(shape.y2, 0, inspiration.image.height, rate)
      shape.x3 = mut(shape.x3, 0, inspiration.image.width, rate)
      shape.y3 = mut(shape.y3, 0, inspiration.image.height, rate)
    }
  }
}

function mut(num, min, max, rate) {
  return constrain(randomGaussian(num, (rate * (max - min)) / 70), min, max);
}

let bestDesign;
let currentDesign;
let currentScore;
let currentInspiration;
let currentCanvas;
let currentInspirationPixels;

function preload() {
  

  let allInspirations = getInspirations();

  for (let i = 0; i < allInspirations.length; i++) {
    let insp = allInspirations[i];
    insp.image = loadImage(insp.assetUrl);
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = insp.name;
    dropper.appendChild(option);
  }
  dropper.onchange = e => inspirationChanged(allInspirations[e.target.value]);
  currentInspiration = allInspirations[0];

  restart.onclick = () =>
    inspirationChanged(allInspirations[dropper.value]);
}

function inspirationChanged(nextInspiration) {
  currentInspiration = nextInspiration;
  currentDesign = undefined;
  memory.innerHTML = "";
  setup();
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  // let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  // canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  currentCanvas = createCanvas(width, height);
  currentCanvas.parent(document.getElementById("active"));
  currentScore = Number.NEGATIVE_INFINITY;
  currentDesign = initDesign(currentInspiration);
  bestDesign = currentDesign;
  image(currentInspiration.image, 0,0, width, height);
  loadPixels();
  currentInspirationPixels = pixels;
}


function evaluate() {
  loadPixels();

  let error = 0;
  let n = pixels.length;
  
  for (let i = 0; i < n; i++) {
    error += sq(pixels[i] - currentInspirationPixels[i]);
  }
  return 1/(1+error/n);
}

function memorialize() {
  let url = currentCanvas.canvas.toDataURL();

  let img = document.createElement("img");
  img.classList.add("memory");
  img.src = url;
  img.width = width;
  img.heigh = height;
  img.title = currentScore;

  document.getElementById("best").innerHTML = "";
  document.getElementById("best").appendChild(img.cloneNode());

  img.width = width / 2;
  img.height = height / 2;

  memory.insertBefore(img, memory.firstChild);

  if (memory.childNodes.length > memory.dataset.maxItems) {
    memory.removeChild(memory.lastChild);
  }
}

let mutationCount = 0;
function draw() {
  
  if(!currentDesign) {
    return;
  }
  randomSeed(mutationCount++);
  currentDesign = JSON.parse(JSON.stringify(bestDesign));
  rate.innerHTML = slider.value;
  mutateDesign(currentDesign, currentInspiration, slider.value/100.0);
  
  randomSeed(0);
  renderDesign(currentDesign, currentInspiration);
  let nextScore = evaluate();
  activeScore.innerHTML = nextScore;
  if (nextScore > currentScore) {
    currentScore = nextScore;
    bestDesign = currentDesign;
    memorialize();
    bestScore.innerHTML = currentScore;
  }
  
  fpsCounter.innerHTML = Math.round(frameRate());
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}