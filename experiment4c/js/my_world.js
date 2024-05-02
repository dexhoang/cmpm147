"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;
let colorOffset = 0;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {
  colorOffset += 0.01;
}

function p3_drawTile(i, j, cx, cy) {
  noStroke();
  let angle = atan2(mouseY-cy, mouseX-cx);
  let colorShift = sin(frameCount * 0.05 + i * 0.1 + j * 0.1 + colorOffset) * 100;


  if (XXH.h32("tile:" + [i, j], worldSeed) % 2 == 0) {
    fill(63 + colorShift, 29 + colorShift, 104 + colorShift);
    if (XXH.h32("tile:" + [i, j], worldSeed) % 20 == 0){
      fill(255);
      stroke(0);
      strokeWeight(2);
      ellipse(0, 0, 50, 50);
      fill(130, 31, 29 + colorShift);
      noStroke();
      ellipse(10 * cos(angle), 10 * sin(angle), 25, 25);
      fill(0);
      ellipse(10 * cos(angle), 10 * sin(angle), 15, 15);
      pop();
    }
  } else {
    fill(0);
  }
  
 
  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill(255);
    stroke(0);
    strokeWeight(2);
    ellipse(0, 0, 50, 50);
    fill(130, 31, 29 + colorShift);
    noStroke();
    ellipse(10 * cos(angle), 10 * sin(angle), 25, 25);
    fill(0);
    ellipse(10 * cos(angle), 10 * sin(angle), 15, 15);
  }
  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(239, 34, 3 , 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(255);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
