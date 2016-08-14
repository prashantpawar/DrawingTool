"use strict";
var deepFreeze = require('deep-freeze');
var proxyquire =  require('proxyquire');
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var createRectangle;

var rectangleCommand = 'R 3 4 1 2'.split(' ');
var initScreenBuffer = [
  [ '-', '-', '-', '-', '-' ],
  [ '|', ' ', ' ', ' ', '|' ],
  [ '|', ' ', ' ', ' ', '|' ],
  [ '|', ' ', ' ', ' ', '|' ],
  [ '|', ' ', ' ', ' ', '|' ],
  [ '-', '-', '-', '-', '-' ]
];

var processCommands;

describe('createRectangle', function () {
  beforeEach(function () {
    createRectangle = sinon.spy(require('../createRectangle'));
    deepFreeze(initScreenBuffer);
  });

  it('should be defined', function () {
    expect(createRectangle).to.be.a('function');
  });

  it('should not mutate screenBuffer', function () {
    var newScreenBuffer;
    newScreenBuffer = createRectangle(rectangleCommand, initScreenBuffer);
    expect(initScreenBuffer).to.not.deep.equal(newScreenBuffer);
  });

  it('should create a canvas', function () {
    var newScreenBuffer = createRectangle(rectangleCommand, initScreenBuffer);
    expect(newScreenBuffer).to.deep.equal([
      [ '-', '-', '-', '-', '-' ],
      [ '|', ' ', ' ', ' ', '|' ],
      [ '|', 'x', 'x', 'x', '|' ],
      [ '|', 'x', ' ', 'x', '|' ],
      [ '|', 'x', 'x', 'x', '|' ],
      [ '-', '-', '-', '-', '-' ]
    ]);
  });
});
