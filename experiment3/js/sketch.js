// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

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
let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
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

  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

let rectX = 20; 
let rectY = 30;
let rectWidth = 200;
let rectHeight = 80;
let speed= 1;

function generateGrid(numCols, numRows) {
  let grid = [];
  let noiseScale = 0.1;
  let threshold = 0.5;

  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      if (i === 0 || i === numRows - 1 || j === 0 || j === numCols - 1) {
        row.push('t');
      } else {
        if (noise(i * noiseScale, j * noiseScale) > threshold) {
          row.push('.');
        } else {
          row.push('_');
        }
      }
    }
    grid.push(row);
  }
  
  return grid;
}

function drawGrid(grid) {
  background(128);
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == '_') {
        placeTile(i, j, (floor(random(4))), 0);
        if (random(1) < 0.09) {
          placeTile(i, j, 26, floor(random(4)))
        }
        if (random(1) < 0.02) {
          placeTile(i, j, 14, 0)
        }
      } else if (gridCheck(grid, i, j, '.')) {
        placeTile(i, j, random(4) | 0, 13);
        drawContext(grid, i, j, '.', 0, 0);
      } else if (gridCheck(grid, i, j, 't')) {
        placeTile(i, j, (floor(random(4))), 0);
        placeTile(i, j, 14, 0)
        drawContext2(grid, i, j, 't', 0, 0)
      }
    }
  }
  
  //clouds
  fill(70, 70, 70, 100);
  noStroke();
  
  rect(rectX, rectY, rectWidth, rectHeight);
  rect(rectX - 10, rectY + 20, rectWidth + 25, rectHeight/2);
  rect(rectX + 150, rectY + 200, rectWidth/2, rectHeight);
  rect(rectX + 120, rectY + 220, rectWidth-40, rectHeight/2);
  rectX -= speed;
  
  //reset cloud position
  if (rectX + rectWidth < 0) {
    rectX = width; 
  }
  
}

function gridCheck(grid, i, j, target) {
  if (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length) {
    return grid[i][j] == target;
  } else {
    return false;
  }
}


function gridCode(grid, i, j, target) {
  let bitCode = 0;
  
  //checks north
  if (gridCheck(grid, i - 1, j, target)) {
    bitCode += 1<<0
  }
  //checks south
  if (gridCheck(grid, i + 1, j, target)) {
    bitCode += 1<<3
  }
  //checks east
  if (gridCheck(grid, i, j + 1, target)) {
    bitCode += 1<<2
  }
  //checks west
  if (gridCheck(grid, i, j - 1, target)) {
    bitCode += 1<<1
  }
  
  return bitCode;
}


function drawContext(grid, i, j, target, ti, tj) {
  const locationCode = gridCode(grid, i, j, target);
  
  const [tiOffset, tjOffset] = lookup[locationCode];

  placeTile(i, j, ti + tiOffset, tj + tjOffset);
}


const lookup = [
  [7,0],
  [10,2],
  [11],
  [11,2],
  [9],
  [9,2],
  [10],
  [10,2],
  [10],
  [11,1],
  [11],
  [11,1],
  [9],
  [9,1],
  [10],
  [7,0]
];


function drawContext2(grid, i, j, target, ti, tj) {
  const locationCode = gridCode(grid, i, j, target);
  
  const [tiOffset, tjOffset] = lookup2[locationCode];
  
  placeTile(i, j, ti + tiOffset, tj + tjOffset);
}


const lookup2 = [
  [7,0],
  [15,2],
  [17],
  [15,2],
  [15],
  [15,2],
  [16],
  [16],
  [17],
  [17,1],
  [17],
  [15,1],
  [15],
  [16],
  [16],
  [7,0]
];
