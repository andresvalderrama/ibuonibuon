'use strict';

var _newArray = require('./modules/new-array');

var _newArray2 = _interopRequireDefault(_newArray);

var _slides = require('./modules/slides');

var slides = _interopRequireWildcard(_slides);

var _barba = require('barba.js');

var _barba2 = _interopRequireDefault(_barba);

var _homepage = require('./modules/homepage');

var _homepage2 = _interopRequireDefault(_homepage);

var _gsap = require('gsap');

var gsap = _interopRequireWildcard(_gsap);

var _Y = require('./modules/Y');

var _Y2 = _interopRequireDefault(_Y);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var P = undefined;

document.addEventListener('DOMContentLoaded', function () {

  P = [].concat((0, _newArray2.default)(slides.slides));
  new _Y2.default('#loader').init(P).then(function () {
    _barba2.default.Pjax.start();
    _barba2.default.Prefetch.init();
    gsap.to('#loader', .8, {
      autoAlpha: 0
    });
  });

  _barba2.default.Dispatcher.on('linkClicked', function (n) {
    console.log('dispacher linkClicked', n);
  });

  _barba2.default.Dispatcher.on('newPageReady', function (t) {
    console.log('dispacher newPageReady', t);
  });
});