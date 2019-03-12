"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.convertCSVToArray = void 0;

var _checkIfValid = require("./helpers/check-if-valid");

var _convertCsvToArrayOfArrays = require("./modules/convert-csv-to-array-of-arrays");

var _convertCsvToArrayOfObjects = require("./modules/convert-csv-to-array-of-objects");

var convertCSVToArray = function convertCSVToArray(data) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      header = _ref.header,
      type = _ref.type,
      separator = _ref.separator;

  var thisOptions = {
    header: header !== false,
    type: type || 'object',
    separator: separator || ','
  };
  (0, _checkIfValid.checkIfValid)(data, thisOptions);

  if (thisOptions.type === 'object') {
    return (0, _convertCsvToArrayOfObjects.convertCSVToArrayOfObjects)(data, thisOptions);
  }

  return (0, _convertCsvToArrayOfArrays.convertCSVToArrayOfArrays)(data, thisOptions);
};

exports.convertCSVToArray = convertCSVToArray;
var _default = convertCSVToArray;
exports.default = _default;