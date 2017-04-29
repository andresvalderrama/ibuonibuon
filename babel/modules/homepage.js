'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homepage = undefined;

var _barba = require('barba.js');

var _barba2 = _interopRequireDefault(_barba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var homepage = _barba2.default.BaseView.extend({
  namespace: 'homepage',
  onEnter: function onEnter() {
    console.log('on enter homepage');
  },
  onEnterCompleted: function onEnterCompleted() {
    console.log('on enterComplete homepage');
  },
  onLeave: function onLeave() {
    console.log('on leave homepage');
  }
});

homepage.init();

exports.homepage = homepage;