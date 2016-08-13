"use strict";

module.exports = function bucketFill(commandElements, inScreenBuffer) {
  var outScreenBuffer = inScreenBuffer.slice(); //to clone the array

  var x = parseInt(commandElements[1], 10);
  var y = parseInt(commandElements[2], 10);
  var c = commandElements[3];

  //Our screenBuffer is stored as Y,X
  if(outScreenBuffer[y][x] !== ' ') {
      return outScreenBuffer;
  }
  outScreenBuffer[y][x] = c;

  bucketFill(['B', x+1, y, c], outScreenBuffer);
  bucketFill(['B', x, y+1, c], outScreenBuffer);
  bucketFill(['B', x-1, y, c], outScreenBuffer);
  bucketFill(['B', x, y-1, c], outScreenBuffer);

  return outScreenBuffer;
};
