'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WW = function (_EventEmitter) {
  _inherits(WW, _EventEmitter);

  function WW(selector) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, WW);

    var _this = _possibleConstructorReturn(this, (WW.__proto__ || Object.getPrototypeOf(WW)).call(this));

    _this.setMaxListeners(0);
    _this.el = _this.$el = 'string' == typeof selector ? document.querySelector(selector) : selector;

    /** revisar ???
      if () {
      }     
    */

    _this.$els = {};
    _this.$refs = {};
    _this.options = Object.assign({}, _this.getDefaultOptions(), state);

    //var a = new d.default(i.$el, i)

    _this.delegate = function () {};
    _this.undelegate = function () {};
    _this.state = new Map();
    return _this;
  }

  _createClass(WW, [{
    key: 'setRef',
    value: function setRef() {
      console.log('setRef');
    }
  }, {
    key: 'init',
    value: function init() {
      console.log('init');
    }
  }, {
    key: 'getDefaultOptions',
    value: function getDefaultOptions() {
      return {};
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      console.log('destroy??? from WW.js');
    }
  }]);

  return WW;
}(_events.EventEmitter);

exports.default = WW;