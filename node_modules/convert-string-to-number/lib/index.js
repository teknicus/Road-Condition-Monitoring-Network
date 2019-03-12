"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.convertStringToNumber = void 0;

var _checkIfValid = require("./helpers/check-if-valid");

var convertStringToNumber = function convertStringToNumber(value) {
  (0, _checkIfValid.checkIfValid)(value);

  if (Number.isNaN(Number(value))) {
    // if not a number
    return NaN;
  }

  var float = parseFloat(value); // check if integer

  if (float % 1 === 0) {
    var int = parseInt(value, 10);
    return int;
  }

  return float;
};

exports.convertStringToNumber = convertStringToNumber;
var _default = convertStringToNumber;
exports.default = _default;