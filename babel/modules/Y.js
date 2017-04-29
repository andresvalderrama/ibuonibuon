'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pixi = require('pixi.js');

var PIXI = _interopRequireWildcard(_pixi);

var _gsap = require('gsap');

var gsap = _interopRequireWildcard(_gsap);

var _ww = require('./ww');

var _ww2 = _interopRequireDefault(_ww);

var _T = require('./T');

var T = _interopRequireWildcard(_T);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import Ww from './ww'


var _class = function (_WW) {
  _inherits(_class, _WW);

  function _class(selector) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, selector));

    _this.resources = [];
    _this.loader = new PIXI.loaders.Loader();

    _this.$els.bar = T.qs(_this.options.bar, _this.$el);
    _this.$els.graphicBar = T.qs(_this.options.graphicBar, _this.$el);
    _this.$els.progress = T.qs(_this.options.progress, _this.$el);

    _this.$els.bars = [_this.$els.bar, _this.$els.progress];

    return _this;
  }

  _createClass(_class, [{
    key: 'preload',
    value: function preload(array, ele) {
      var self = this;
      var i = [];

      if (Array.isArray(array) && array.length) {
        array.forEach(function (ele) {
          ele.sprites.forEach(function (sprite) {
            if (!i.includes(sprite.url)) {
              //var e = T.isMobile ? `assets/images/mobile/${sprite.url}.png` : `assets/images/${sprite.url}.png`
              var e = 'assets/images/' + sprite.url + '.png';

              i.push(sprite.url);
              self.loader.add(sprite.url, e);
            }
          });
        });
      }

      this.loader.once('complete', function () {
        self.resources.push(ele);
        self.emit('loaded');
        self.destroy();
      });
    }
  }, {
    key: 'init',
    value: function init(array) {
      var self = this;

      this.allDone = null;
      this.preload(array);
      this.loader.load();

      gsap.set(this.$els.bar, {
        width: 0
      });

      this.loader.onProgress.add(function (loader) {
        gsap.to(self.$els.bar, 1.2, {
          width: loader.progress + '%'
        });

        var e = parseInt(loader.progress);
        var progressValue = e >= 95 ? '100' : e;

        self.$els.progress.innerHTML = progressValue;
      });

      return new Promise(function (resolve) {
        self.allDone = resolve;
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var self = this;
      var time = .6;
      var tween = new gsap.TimelineMax({
        onComplete: function onComplete() {
          self.allDone();
        }
      });

      tween.to(this.$els.graphicBar, time, {
        scaleX: 0,
        delay: 2,
        ease: gsap.Power4.easeOut
      }).to('.loading-text', .4, {
        xPercent: 100,
        autoAlpha: 0,
        ease: gsap.Power4.easeOut
      }, '-=' + time).to(this.$el, .5, {
        opacity: 0
      });
    }
  }, {
    key: 'getDefaultOptions',
    value: function getDefaultOptions() {
      return {
        graphicBar: '[data-bar]',
        bar: '.c-loader__wrapper',
        progress: '[data-progress]'
      };
    }
  }]);

  return _class;
}(_ww2.default);

exports.default = _class;