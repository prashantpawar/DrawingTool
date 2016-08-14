"use strict";

var createCanvas = require('./createCanvas');
var createLine = require('./createLine');
var createRectangle = require('./createRectangle');
var bucketFill = require('./bucketFill');

module.exports = {
  processCommands: function processCommands(commands, screenBuffer) {
    screenBuffer = screenBuffer || [[]];

    return commands.map(function (command, index) {
      var commandElements = command.trim().split(' ');
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
          console.log('Invalid command Line ' + (index + 1) + ': "' + commandElements[0] + '" is not a valid command');
          process.exit(1);
      }
    });
  }
};
