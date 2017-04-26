export var textAbout = ['Ncera na fiata']
export var slidesAbout = [
  {
    id: 'about',
    sprites: [
      {
        url: 'about1a',
        factor: -.8,
        setup: function (t, e) {
          t.x = e.width / 2,
            t.y = e.height - t.height / 2
        }
      }, {
        url: 'storia',
        factor: 4,
        setup: function (t, e) {
          t.x = e.width / 3.5,
            t.y = e.height - t.height / 2
        }
      }, {
        url: 'about3',
        factor: -1,
        setup: function (t, e) {
          t.scale.x = -1,
            t.x = e.width / 2,
            t.y = e.height - t.height / 4
        }
      }
    ]
  }, {
    id: 'about1',
    sprites: [
      {
        url: 'about4',
        factor: -.5,
        setup: function (t, e) {
          t.x = e.width / 2,
            t.y = e.height - t.height / 2
        }
      }, {
        url: 'sommelier',
        factor: 4,
        setup: function (t, e) {
          t.x = e.width / 3.6,
            t.y = e.height - t.height / 2
        }
      }, {
        url: 'about4b',
        factor: -.8,
        setup: function (t, e) {
          t.x = e.width / 2,
            t.y = e.height - t.height / 3.5
        }
      }
    ]
  }, {
    id: 'about2',
    sprites: [
      {
        url: 'about3',
        factor: -1.2,
        setup: function (t, e) {
          t.x = e.width / 2,
            t.y = e.height - t.height / 2
        }
      }, {
        url: 'contadini',
        factor: 5,
        setup: function (t, e) {
          t.x = e.width / 1.4,
            t.y = e.height - t.height / 3.8
        }
      }, {
        url: 'about2',
        factor: -.3,
        setup: function (t, e) {
          t.x = e.width / 2,
            t.y = e.height - t.height / 4
        }
      }
    ]
  }, {
    id: 'about3',
    sprites: [
      {
        url: 'about4b',
        factor: -1.2,
        setup: function (t, e) {
          t.scale.x = -1,
            t.x = e.width / 2,
            t.y = e.height - t.height / 2.7;
        }
      }, {
        url: 'turisti',
        factor: 5,
        setup: function (t, e) {
          t.x = e.width / 1.6,
            t.y = e.height - t.height / 3.2
        }
      }, {
        url: 'about3',
        factor: -.4,
        setup: function (t, e) {
          t.x = e.width / 2,
            t.y = e.height - t.height / 4
        }
      }
    ]
  }
]