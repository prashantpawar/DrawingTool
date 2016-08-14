"use strict";
var clone = require('./utils.js').clone;
var ifValidCoordinates = require('./utils.js').ifValidCoordinates;

var createLine = require('./createLine');

module.exports = function createRectangle(commandElements, inScreenBuffer) {
  var outScreenBuffer = clone(inScreenBuffer); //to clone the array
  if(outScreenBuffer.length === 1) {
    return outScreenBuffer;
  }

  var strokeChar = 'x';
  var x1 = parseInt(commandElements[1], 10);
  var y1 = parseInt(commandElements[2], 10);
  var x2 = parseInt(commandElements[3], 10);
  var y2 = parseInt(commandElements[4], 10);

  if(!ifValidCoordinates({x: [x1, x2], y: [y1, y2]}, outScreenBuffer)) {
    return outScreenBuffer;
  }

  
  outScreenBuffer = createLine(['L', x1, y1, x2, y1], outScreenBuffer);
  outScreenBuffer = createLine(['L', x2, y1, x2, y2], outScreenBuffer);
  outScreenBuffer = createLine(['L', x2, y2, x1, y2], outScreenBuffer);
  outScreenBuffer = createLine(['L', x1, y2, x1, y1], outScreenBuffer);

  return outScreenBuffer;
};
