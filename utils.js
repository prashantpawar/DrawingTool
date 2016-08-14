"use strict";

module.exports = {
  clone: function clone(x) {
    return JSON.parse(JSON.stringify(x));
  },
  ifValidCoordinates: function (coordinates, screenBuffer) {
    var isValid = true;
    isValid = coordinates['x'].reduce(function (validFlag, value) {
      if(validFlag === false ||
         (value > (screenBuffer[0].length + 2) ||
         value < 1)
        ) {
            return false;
        } else {
            return true;
        }
    }, isValid);

    isValid = coordinates['y'].reduce(function (validFlag, value) {
      if(validFlag === false ||
        (value > (screenBuffer.length + 2) ||
         value < 1)
        ) {
            return false;
        } else {
            return true;
        }
    }, isValid);

    return isValid;
  }
};

