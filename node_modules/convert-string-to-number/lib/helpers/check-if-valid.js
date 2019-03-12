"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIfValid = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var checkIfValid = function checkIfValid(value) {
  if (typeof value !== 'string') {
    throw new Error("value has to be typeof: 'string' but got typeof: '".concat(_typeof(value), "'"));
  }
};

exports.checkIfValid = checkIfValid;