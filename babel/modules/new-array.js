"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function newArray(array) {
  if (Array.isArray(array)) {
    var brandNewArray = Array(array.lenth);
    for (var e = 0; e < array.length; e++) {
      brandNewArray[e] = array[e];
    }
    return brandNewArray;
  }
}

exports.default = newArray;