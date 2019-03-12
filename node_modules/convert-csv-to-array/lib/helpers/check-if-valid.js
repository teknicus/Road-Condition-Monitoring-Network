"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIfValid = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var checkIfValid = function checkIfValid(data, _ref) {
  var separator = _ref.separator;

  if (typeof data !== 'string') {
    throw new Error("data has to be typeof: ".concat(_typeof(''), " but got typeof: ").concat(_typeof(data)));
  } else if (!data.includes(separator)) {
    throw new Error("data does not include separator: ".concat(separator));
  }
};

exports.checkIfValid = checkIfValid;