"use strict";
var deepFreeze = require('deep-freeze');
var proxyquire =  require('proxyquire');
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var createLine;

var lineCommand = 'L 2 4 2 2'.split(' ');
var outOfBoundsLineCommand = 'L -2 9 -2 2'.split(' ');
var initScreenBuffer = [
  [ '-', '-', '-', '-', '-' ],
  [ '|', ' ', ' ', ' ', '|' ],
  [ '|', ' ', ' ', ' ', '|' ],
  [ '|', ' ', ' ', ' ', '|' ],
  [ '|', ' ', ' ', ' ', '|' ],
  [ '-', '-', '-', '-', '-' ]
];

var processCommands;

describe('createLine', function () {
  beforeEach(function () {
    createLine = sinon.spy(require('../createLine'));
    deepFreeze(initScreenBuffer);
  });

  it('should be defined', function () {
    expect(createLine).to.be.a('function');
  });

  it('should not mutate screenBuffer', function () {
    var newScreenBuffer;
    newScreenBuffer = createLine(lineCommand, initScreenBuffer);
    expect(initScreenBuffer).to.not.deep.equal(newScreenBuffer);
  });

  it('should create a line', function () {
    var newScreenBuffer = createLine(lineCommand, initScreenBuffer);
    expect(newScreenBuffer).to.deep.equal([
      [ '-', '-', '-', '-', '-' ],
      [ '|', ' ', ' ', ' ', '|' ],
      [ '|', ' ', 'x', ' ', '|' ],
      [ '|', ' ', 'x', ' ', '|' ],
      [ '|', ' ', 'x', ' ', '|' ],
      [ '-', '-', '-', '-', '-' ]
    ]);
  });

  it('should not draw outside the canvas', function () {
    var newScreenBuffer = createLine(outOfBoundsLineCommand, initScreenBuffer);
    expect(newScreenBuffer).to.deep.equal(initScreenBuffer);
  });
});
