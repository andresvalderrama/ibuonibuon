import * as T from './T'

import * as about from './about'

import Slider from './Slider'

import Barba from 'barba.js'

import * as gsap from 'gsap'

var homepage = Barba.BaseView.extend({
  namespace: 'homepage',
  onEnter: function () {
    var self = this
    var index = 0

    if (Barba.Pjax.History.prevStatus()  &&  'product' === Barba.Pjax.History.prevStatus().namespace) {
      var barbaWrapper = T.qs('#barba-wrapper')
      var r = T.data('from', barbaWrapper)

      index = slides.slides.findIndex( slide => slide.id === r) || 0
    }

    this.slider = new Slider('#slider', {
      startFrom: index
    })
    this.slider.init()
    this.slider.on('animation:first', function () {
      var element = T.qs('[data-tip]', self.container)

      gsap.to(element, .5, {
        autoAlpha: 0
      })
    })

    console.log('on enter homepage')
  },
  onEnterCompleted: function () {
    /*var t = {
      slides: about.slidesAbout,
      text: about.textAbout
    }*/

    //h.createContainer(t)
    this.slider.start()
  },
  onLeave: function () {
    console.log('on leave homepage')
  }
})

homepage.init()

export { homepage }