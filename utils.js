"use strict";

module.exports = {
  clone: function clone(x) {
    return JSON.parse(JSON.stringify(x));
  }
};

