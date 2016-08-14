"use strict";
var proxyquire =  require('proxyquire');

var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var createCanvas;

var canvasCommand = 'C 3 4'.split(' ');
var screenBuffer;

var processCommands;

describe('createCanvas', function () {
  beforeEach(function () {
    createCanvas = sinon.spy(require('../createCanvas'));
    screenBuffer = [[]];
  });

  it('should be defined', function () {
    expect(createCanvas).to.be.a('function');
  });

  it('should not mutate screenBuffer', function () {
    var newScreenBuffer;
    newScreenBuffer = createCanvas(canvasCommand, screenBuffer);
    expect(screenBuffer).to.not.deep.equal(newScreenBuffer);
  });

  it('should create a canvas', function () {
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

  it('should draw the canvas only once', function () {
    var newScreenBuffer;
    screenBuffer = createCanvas(canvasCommand, screenBuffer);
    newScreenBuffer = createCanvas('C 3 1'.split(' '), screenBuffer);
    expect(newScreenBuffer).to.deep.equal(screenBuffer);
  });
});
