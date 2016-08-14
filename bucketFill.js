"use strict";
var clone = require('./utils.js').clone;

module.exports = function bucketFill(commandElements, inScreenBuffer) {
  var outScreenBuffer = clone(inScreenBuffer); //to clone the array

  var x = parseInt(commandElements[1], 10);
  var y = parseInt(commandElements[2], 10);
  var c = commandElements[3];

  //Our screenBuffer is stored as Y,X
  if(outScreenBuffer[y][x] !== ' ') {
      return outScreenBuffer;
  }
  outScreenBuffer[y][x] = c;

  outScreenBuffer = bucketFill(['B', x+1, y, c], outScreenBuffer);
  outScreenBuffer = bucketFill(['B', x, y+1, c], outScreenBuffer);
  outScreenBuffer = bucketFill(['B', x-1, y, c], outScreenBuffer);
  outScreenBuffer = bucketFill(['B', x, y-1, c], outScreenBuffer);

  return outScreenBuffer;
};
