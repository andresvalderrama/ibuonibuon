"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qs = qs;
function qs(selector) {
  var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return dom.querySelector(selector);
}