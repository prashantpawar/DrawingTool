"use strict";
var proxyquire =  require('proxyquire');
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var createCanvas;

var canvasCommand = 'C 3 4'.split(' ');

var processCommands;

describe('createCanvas', function () {
  beforeEach(function () {
    createCanvas = sinon.spy(require('../createCanvas'));
  });

  it('should be defined', function () {
    expect(createCanvas).to.be.a('function');
  });

  it('should not mutate screenBuffer', function () {
    var screenBuffer = [[]],
      newScreenBuffer;
    newScreenBuffer = createCanvas(canvasCommand, screenBuffer);
    expect(screenBuffer).to.not.deep.equal(newScreenBuffer);
  });

  it('should create a canvas', function () {
    var screenBuffer = [[]];
    screenBuffer = createCanvas(canvasCommand, screenBuffer);
    expect(screenBuffer).to.deep.equal([
      [ '-', '-', '-', '-', '-' ],
      [ '|', ' ', ' ', ' ', '|' ],
      [ '|', ' ', ' ', ' ', '|' ],
      [ '|', ' ', ' ', ' ', '|' ],
      [ '|', ' ', ' ', ' ', '|' ],
      [ '-', '-', '-', '-', '-' ]
    ]);
  });
});
