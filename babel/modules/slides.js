'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var slides = [{
  id: 'intro',
  title: 'Benvenuto',
  sprites: [{
    url: 'intro',
    factor: -1,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }, {
    url: 'intro1',
    factor: 5,
    setup: function setup(t, e) {
      t.x = e.width / 2.8, t.y = r(t, 2);
    }
  }, {
    url: 'intro2',
    factor: -.6,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 4;
    }
  }]
}, {
  id: 'primitivo',
  title: 'Primitivo',
  sprites: [{
    url: 'primitivo1',
    factor: -1.8,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = r(t, 2);
    }
  }, {
    url: 'primitivo',
    factor: 5,
    setup: function setup(t, e) {
      t.x = e.width / 2.5, t.y = r(t, 1.9);
    }
  }, {
    url: 'primitivo2',
    factor: -.2,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = r(t, 2);
    }
  }]
}, {
  id: 'negroamaro',
  title: 'Negroamaro',
  sprites: [{
    url: 'negroamaro1',
    factor: -2,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }, {
    url: 'negroamaro',
    factor: 5,
    setup: function setup(t, e) {
      t.x = e.width / 1.6, t.y = e.height - t.height / 2;
    }
  }, {
    url: 'negroamaro2',
    factor: -.3,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }]
}, {
  id: 'fiano',
  title: 'Fiano',
  sprites: [{
    url: 'fiano',
    factor: 8,
    setup: function setup(t, e) {
      t.x = e.width / 3, t.y = e.height / 2;
    }
  }, {
    url: 'fiano-2',
    factor: -.8,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }, {
    url: 'fiano-1',
    factor: -2,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }]
}, {
  id: 'rosalento',
  title: 'Rosalento',
  sprites: [{
    url: 'rosalento2',
    factor: -.8,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = r(t, 2);
    }
  }, {
    url: 'rosalento',
    factor: 3,
    setup: function setup(t, e) {
      t.x = e.width / 2.8, t.y = e.height - t.height / 2;
    }
  }, {
    url: 'rosalento1',
    factor: -2,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }]
}, {
  id: 'nicolaus',
  title: 'Nicolaus',
  sprites: [{
    url: 'nicolaus3',
    factor: -.2,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = r(t, 2.4);
    }
  }, {
    url: 'nicolaus2',
    factor: -1,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = r(t, 2.2);
    }
  }, {
    url: 'nicolaus',
    factor: 4,
    setup: function setup(t, e) {
      t.x = e.width / 3, t.y = r(t, 2);
    }
  }, {
    url: 'nicolaus1',
    factor: -.8,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = r(t, 3.9);
    }
  }]
}, {
  id: 'celestiaco',
  title: 'Celestiaco',
  sprites: [{
    url: 'celesticao1',
    factor: -1.5,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }, {
    url: 'aleatico',
    factor: 8,
    setup: function setup(t, e) {
      t.x = e.width / 1.7, t.y = e.height - t.height / 2;
    }
  }, {
    url: 'celesticao2',
    factor: -.2,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }]
}, {
  id: 'olio',
  title: 'Olio',
  sprites: [{
    url: 'olio3',
    factor: -2,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }, {
    url: 'olio2',
    factor: 5,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2.4;
    }
  }, {
    url: 'olio1',
    factor: -.3,
    setup: function setup(t, e) {
      t.x = e.width / 2, t.y = e.height - t.height / 2;
    }
  }]
}];
var texts = undefined;
var userAgent = navigator.userAgent.toLowerCase();

userAgent.indexOf('firefox') > -1 ? exports.texts = texts = ['I nostri vini'] : exports.texts = texts = ['Ci mbie mieru campa cent\'annit'];

exports.texts = texts;
exports.slides = slides;