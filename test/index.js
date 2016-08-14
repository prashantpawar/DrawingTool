"use strict";
var proxyquire =  require('proxyquire');
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var fileContent = `C 20 4
    L 1 2 6 2
    L 6 3 6 4
    R 16 1 20 3
    B 10 3 o`;

var fsStub = {
  readFile: function (fileName, cb) {
    cb(null, fileContent);
  }
};

var processCommands = require('../processCommands.js').processCommands;
var processCommandsStubDefault = {
  processCommands: function (commands) {
    return [[]];
  }
}, processCommandsStub;

var DrawingToolMain;

describe('DrawingTool', function () {
  beforeEach(function () {
    processCommandsStub = processCommandsStubDefault;
    DrawingToolMain = proxyquire('../main.js', {
      'fs': fsStub,
      './processCommands.js': processCommandsStub
    });
  });

  it('should display help if no filename is supplied', function (done) {
    var argv = [null, null, null];
    DrawingToolMain(argv).then(function (screenBuffer) {
      done("DrawingTool did not throw a help message with filename was missing");
    }).catch(function (errorMsg) {
      expect(errorMsg.indexOf('Usage')).to.be.above(-1);
      done();
    });
  });

  it('should accept input filename', function (done) {
    var argv = [null, null, "input.txt"];
    processCommandsStub.processCommands = function (commands) {
        return commands;
    };

    DrawingToolMain = proxyquire('../main.js', {
      'fs': fsStub,
      './processCommands.js': processCommandsStub
    });

    DrawingToolMain(argv).then(function (screenBuffer) {
      expect(screenBuffer).to.deep.equal(fileContent.split('\n'));
      done();
    }).catch(function (e) {
      done(e);
    });
  });
});
