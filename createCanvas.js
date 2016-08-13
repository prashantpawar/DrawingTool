module.exports = function createCanvas(commandElements, inScreenBuffer) {
  console.log('createCanvas', commandElements);

  var outScreenBuffer = inScreenBuffer.slice(); //to clone the array

  var width = parseInt(commandElements[1], 10);
  var height = parseInt(commandElements[2], 10);
  var boxHeight = height + 2;
  var boxWidth = width + 2;

  //Initialize the Canvas buffer
  outScreenBuffer = new Array(boxHeight);

  for(var j = 0; j < boxHeight; j++) {
    outScreenBuffer[j] = new Array(boxWidth).fill(' ');
    outScreenBuffer[j][0] = '|';
    outScreenBuffer[j][boxWidth - 1] = '|';
  }

  for(var i = 0; i < boxWidth; i++) {
    outScreenBuffer[0][i] = '-';
    outScreenBuffer[boxHeight-1][i] = '-';
  }

  return outScreenBuffer;
};