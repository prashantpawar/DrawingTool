"use strict";

var createLine = require('./createLine');

module.exports = function createRectangle(commandElements, inScreenBuffer) {
  console.log('createRectangle', commandElements);

  var outScreenBuffer = inScreenBuffer.slice(); //to clone the array

  var strokeChar = 'x';
  //No need to parse them to Int since createLine does that for us
  var x1 = commandElements[1];
  var y1 = commandElements[2];
  var x2 = commandElements[3];
  var y2 = commandElements[4];
  
  createLine(['L', x1, y1, x2, y1], outScreenBuffer);
  createLine(['L', x2, y1, x2, y2], outScreenBuffer);
  createLine(['L', x2, y2, x1, y2], outScreenBuffer);
  createLine(['L', x1, y2, x1, y1], outScreenBuffer);

  return outScreenBuffer;
};
