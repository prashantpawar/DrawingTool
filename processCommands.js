"use strict";

var createCanvas = require('./createCanvas');
var createLine = require('./createLine');
var createRectangle = require('./createRectangle');
var bucketFill = require('./bucketFill');

module.exports = {
  processCommands: function processCommands(commands, screenBuffer) {
    screenBuffer = screenBuffer || [[]];

    return commands.map(function (command) {
      var commandElements = command.split(' ');
      switch(commandElements[0]) {
        case 'C':
          screenBuffer = createCanvas(commandElements, screenBuffer);
          return screenBuffer;
        case 'L':
          screenBuffer = createLine(commandElements, screenBuffer);
          return screenBuffer;
        case 'R':
          screenBuffer = createRectangle(commandElements, screenBuffer);
          return screenBuffer;
        case 'B':
          screenBuffer = bucketFill(commandElements, screenBuffer);
          return screenBuffer;
        default:
          console.log('invalid command');
          process.exit(1);
      }
    });
  }
};
