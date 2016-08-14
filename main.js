"use strict";

var Promise = require('bluebird');

var processCommands = require('./processCommands.js').processCommands;

var readFile = Promise.promisify(require("fs").readFile);

function splitLines(data) {
  return data.toString().split('\n');
}

var main = function main (argv) {
  var fileName = argv[2];

  if(!fileName) {
    var errorMsg = 'Usage: ';
    errorMsg += 'node index.js <input filename>';
    return Promise.reject(errorMsg);
  }

  return readFile(fileName)
    .then(splitLines)
    .then(processCommands);
};

module.exports = main;
