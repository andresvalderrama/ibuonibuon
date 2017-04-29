'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var textContacts = exports.textContacts = ['Addò ieddhri'];
var slideContacts = exports.slideContacts = [{
  id: 'contacts',
  sprites: [{
    url: 'contacts1b',
    factor: -1,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = r(t, 2);
    }
  }, {
    url: 'contacts',
    factor: 5,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }, {
    url: 'contacts2b',
    factor: -.3,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = r(t, 2.4);
    }
  }]
}, {
  id: 'contacts1',
  sprites: [{
    url: 'contacts2a',
    factor: -.8,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = r(t, 2);
    }
  }, {
    url: 'contatti',
    factor: 5,
    setup: function setup(t, e) {
      t.x = e.width / 3, t.y = r(t, 2);
    }
  }, {
    url: 'contacts1a',
    factor: -1.2,
    setup: function setup(t, e) {
      t.scale.x = -1, t.x = e.width / 2, t.y = r(t, 2.4);
    }
  }]
}];