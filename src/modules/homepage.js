import * as T from './T'

import Barba from 'barba.js'

var homepage = Barba.BaseView.extend({
  namespace: 'homepage',
  onEnter: function () {
    var self = this
    var e = 0

    if (Barba.Pjax.History.prevStatus()  &&  'product' === Barba.Pjax.History.prevStatus().namespace) {
      var barbaWrapper = T.qs('#barba-wrapper')
      var r = d.data('from', barbaWrapper)

      e = f.slides.findIndex( slide => slide.id === r) || 0
    }

    this.slider = new h.default('#slider', {
      startFrom: e
    })
    this.slider.init()
    this.slider.on('animation:first', function () {
      console.log('animation:first')
    })

    console.log('on enter homepage')
  },
  onEnterCompleted: function () {
    console.log('on enterComplete homepage')
  },
  onLeave: function () {
    console.log('on leave homepage')
  }
})

homepage.init()

export { homepage }