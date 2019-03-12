"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertFloatIntString = undefined;

var _isNan = require("babel-runtime/core-js/number/is-nan");

var _isNan2 = _interopRequireDefault(_isNan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertFloatIntString = exports.convertFloatIntString = function convertFloatIntString(value) {
  var thisValue = void 0;

  if ((0, _isNan2.default)(Number(value))) {
    // if not a number
    thisValue = value;
  } else {
    thisValue = parseFloat(value);
  }

  // check if integer
  if (Number(value) === thisValue && thisValue % 1 === 0) {
    thisValue = parseInt(value, 10);
  }

  return thisValue;
};