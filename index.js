"use strict";

var Promise = require('bluebird');

var processCommands = require('./processCommands.js').processCommands;

var readFile = Promise.promisify(require("fs").readFile);

function printScreenBuffer(screenBuffer) {
  screenBuffer.map(function (state) {
    state.map(function (line) {
      console.log(line.join(''));
    });
  });
  return screenBuffer;
}

function splitLines(data) {
  return data.toString().split('\n');
}

var main = function main () {
  var fileName = process.argv[2];

  if(!fileName) {
    console.log('Usage:');
    console.log('node index.js <input filename>');
    process.exit(1);
  }

  console.log('Processing', fileName);
  readFile(fileName)
    .then(splitLines)
    .then(processCommands)
    .then(printScreenBuffer);
};

main();
