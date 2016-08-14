"use strict";
var clone = require('./utils.js').clone;
var ifValidCoordinates = require('./utils.js').ifValidCoordinates;

module.exports = function bucketFill(commandElements, inScreenBuffer) {
  var outScreenBuffer = clone(inScreenBuffer); //to clone the array
  if(outScreenBuffer.length === 1) {
    return outScreenBuffer;
  }

  var x = parseInt(commandElements[1], 10);
  var y = parseInt(commandElements[2], 10);
  var c = commandElements[3];

  if(!ifValidCoordinates({x: [x], y: [y]}, outScreenBuffer)) {
    return outScreenBuffer;
  }

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
