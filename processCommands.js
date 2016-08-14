"use strict";

var createCanvas = require('./createCanvas');
var createLine = require('./createLine');
var createRectangle = require('./createRectangle');
var bucketFill = require('./bucketFill');

module.exports = {
  processCommands: function processCommands(commands, screenBuffer) {
    screenBuffer = screenBuffer || [[]];

    return commands
      .filter(function (command, index) { //Lets sanitize the input first
        var commandElements = command.trim().split(' '); //ignore whitespaces
        switch(commandElements[0]) {
          case 'C':
          case 'L':
          case 'R':
          case 'B':
            return true;
          case '':
            return false;
          default:
            console.log('Invalid command Line ' + (index + 1) + ': "' + commandElements[0] + '" is not a valid command');
            return false;
        }
      })
      .map(function (command, index) {
        var commandElements = command.trim().split(' '); //ignore whitespaces
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
            return screenBuffer;
        }
      });
  }
};
