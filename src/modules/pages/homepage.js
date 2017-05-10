import Barba from 'barba.js'
import * as gsap from 'gsap'

import Slider from '../Slider'
import * as utils from '../utils'

var homepage = Barba.BaseView.extend({
  namespace: 'homepage',

  // The new Container is ready and attached to the DOM.
  onEnter: function () {
    console.time('barba')
    var self = this
    var index = 0

    this.slider = new Slider('#slider', { startFrom: index })
    this.slider.init()
    
    this.slider.on('animation:first', function () {
      var element = utils.qs('[data-tip]', self.container)

      gsap.to(element, .5, {
        autoAlpha: 0
      })
    })
  },

  // The Transition has just finished.
  onEnterCompleted: function () {
    this.slider.start()
    console.timeEnd('barba') //barba: 0.500ms
  }
})

homepage.init()

export { homepage }
