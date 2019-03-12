"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertCSVToArrayOfArrays = void 0;

var _convertStringToNumber = require("convert-string-to-number");

var convertCSVToArrayOfArrays = function convertCSVToArrayOfArrays(data, _ref) {
  var header = _ref.header,
      separator = _ref.separator;
  var csv = data;
  var array = [];
  var rows = csv.split(/(?!\B"[^"]*)\n(?![^"]*"\B)/g);
  rows.forEach(function (row, idx) {
    var values = row.split(separator);
    var checkedAndConvertedValues = [];

    if (rows.length - 1 !== idx && (!header && idx !== 0 || header)) {
      values.forEach(function (value) {
        var convertedToNumber = (0, _convertStringToNumber.convertStringToNumber)(value);
        var thisValue = Number.isNaN(convertedToNumber) ? value : convertedToNumber;
        checkedAndConvertedValues.push(thisValue);
      });
      array.push(checkedAndConvertedValues);
    }
  });
  return array;
};

exports.convertCSVToArrayOfArrays = convertCSVToArrayOfArrays;