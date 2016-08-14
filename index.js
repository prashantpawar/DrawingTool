"use strict";

var main = require('./main.js');

function printScreenBuffer(screenBuffer) {
  screenBuffer.map(function (state) {
    state.map(function (line) {
      console.log(line.join(''));
    });
  });
  return screenBuffer;
}


main(process.argv).then(printScreenBuffer);
