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

function error(message) {
  console.log('Error', message);
  process.exit(1);
}

main(process.argv)
  .then(printScreenBuffer)
  .catch(error);
