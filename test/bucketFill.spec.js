"use strict";
var deepFreeze = require('deep-freeze');
var proxyquire =  require('proxyquire');
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var bucketFill;

var bucketFillCommand = 'B 1 1 o'.split(' ');
var initScreenBuffer = [
  [ '-', '-', '-', '-', '-' ],
  [ '|', ' ', ' ', ' ', '|' ],
  [ '|', 'x', 'x', 'x', '|' ],
  [ '|', 'x', ' ', 'x', '|' ],
  [ '|', 'x', 'x', 'x', '|' ],
  [ '-', '-', '-', '-', '-' ]
];

var processCommands;

describe('bucketFill', function () {
  beforeEach(function () {
    bucketFill = sinon.spy(require('../bucketFill'));
    deepFreeze(initScreenBuffer);
  });

  it('should be defined', function () {
    expect(bucketFill).to.be.a('function');
  });

  it('should not mutate screenBuffer', function () {
    var newScreenBuffer;
    newScreenBuffer = bucketFill(bucketFillCommand, initScreenBuffer);
    expect(initScreenBuffer).to.not.deep.equal(newScreenBuffer);
  });

  it('should create a canvas', function () {
    var newScreenBuffer = bucketFill(bucketFillCommand, initScreenBuffer);
    expect(newScreenBuffer).to.deep.equal([
      [ '-', '-', '-', '-', '-' ],
      [ '|', 'o', 'o', 'o', '|' ],
      [ '|', 'x', 'x', 'x', '|' ],
      [ '|', 'x', ' ', 'x', '|' ],
      [ '|', 'x', 'x', 'x', '|' ],
      [ '-', '-', '-', '-', '-' ]
    ]);
  });
});
