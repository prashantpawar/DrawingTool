"use strict";
var proxyquire =  require('proxyquire');
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var createCanvasStub;
var createLineStub;
var createRectangleStub;
var bucketFillStub;

var canvasCommand = 'C 3 4';
var lineCommand = 'L 2 4 20 3';
var rectangleCommand = 'R 2 4 20 3';
var bucketFillCommand = 'B 10 3 o';
var invalidCommand = 'K 10 3';

var processCommands;

describe('processCommands', function () {
  beforeEach(function () {
    createCanvasStub = sinon.spy(require('../createCanvas'));
    createLineStub = sinon.spy(require('../createLine'));
    createRectangleStub = sinon.spy(require('../createRectangle')); 
    bucketFillStub = sinon.spy(require('../bucketFill')); 

    processCommands = proxyquire('../processCommands.js', {
      './createCanvas': createCanvasStub,
      './createLine': createLineStub,
      './createRectangle': createRectangleStub,
      './bucketFill': bucketFillStub
    }).processCommands;
  });

  it('should be defined', function () {
    expect(processCommands).to.be.a('function');
  });

  it('should return an empty screen buffer upon initialization', function () {
    expect(processCommands([])).to.deep.equal([]);
  });


  it('should process C command', function () {
    var screenBuffer = [[]];
    processCommands([canvasCommand], screenBuffer);
    expect(createCanvasStub).to.have.been.calledWith(canvasCommand.trim().split(' '), screenBuffer);
  });

  it('should process L command', function () {
    var screenBuffer = [[]];
    processCommands([lineCommand], screenBuffer);
    expect(createLineStub).to.have.been.calledWith(lineCommand.trim().split(' '), screenBuffer);
  });

  it('should process R command', function () {
    var screenBuffer = [[]];
    processCommands([rectangleCommand], screenBuffer);
    expect(createRectangleStub).to.have.been.calledWith(rectangleCommand.trim().split(' '), screenBuffer);
  });

  it('should process B command', function () {
    var screenBuffer = [[]];
    processCommands([bucketFillCommand], screenBuffer);
    expect(bucketFillStub).to.have.been.calledWith(bucketFillCommand.trim().split(' '), screenBuffer);
  });

  it('should not process invalid commands', function () {
    var screenBuffer = [[]], stateArray;
    var savedConsoleLog = console.log;
    var consoleStub = sinon.stub(console, 'log');

    stateArray = processCommands([invalidCommand], screenBuffer);
    expect(stateArray).to.deep.equal([]);

    console.log = savedConsoleLog;
    expect(consoleStub).to.have.been.calledWith('Invalid command Line 1: "K" is not a valid command');
  });
});
