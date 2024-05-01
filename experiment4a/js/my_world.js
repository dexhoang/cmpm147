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

let terrainNoiseScale = 0.05;
let time = 0;

function p3_preload() {}

function p3_setup() {
  noiseDetail(4);
}

let worldSeed;

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

function p3_drawBefore() {}

function p3_drawTile(i, j, cx, cy) {
  noStroke();
  let yOffset = map(noise(i * 0.5, j * 0.5, time), 0, 1, -5, 5);
  
  if (XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0) {
    fill(66, 186, 66);
    
    fill(21, 142, 83)
    translate(0, -10)
    ellipse(0, 0, 5, 60)
    translate(0, 10)
    fill(66, 186, 66);
    
  } else {
    fill(59, 177, 59);
    
  }

  let terrainHeight = map(noise(i * terrainNoiseScale, j * terrainNoiseScale), 0, 1, -th, th);

  if (terrainHeight < 0) {
    translate(0, -10)
  } else {
    fill(76, 153, 148);
    translate(0, yOffset)
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
    // fill(0, 0, 0, 32);
    // translate(0, 20)
    // ellipse(0, 0, 10, 5);
    // translate(0, -10);
    // fill(255, 255, 100, 128);
    // ellipse(0, 0, 4, 30);
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);
  translate(0, -5)

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {
  time += 0.01;
}
