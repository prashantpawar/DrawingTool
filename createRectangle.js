"use strict";
var clone = require('./utils.js').clone;

var createLine = require('./createLine');

module.exports = function createRectangle(commandElements, inScreenBuffer) {
  var outScreenBuffer = clone(inScreenBuffer); //to clone the array
  if(outScreenBuffer.length === 1) {
    return outScreenBuffer;
  }

  var strokeChar = 'x';
  //No need to parse them to Int since createLine does that for us
  var x1 = commandElements[1];
  var y1 = commandElements[2];
  var x2 = commandElements[3];
  var y2 = commandElements[4];
  
  outScreenBuffer = createLine(['L', x1, y1, x2, y1], outScreenBuffer);
  outScreenBuffer = createLine(['L', x2, y1, x2, y2], outScreenBuffer);
  outScreenBuffer = createLine(['L', x2, y2, x1, y2], outScreenBuffer);
  outScreenBuffer = createLine(['L', x1, y2, x1, y1], outScreenBuffer);

  return outScreenBuffer;
};
