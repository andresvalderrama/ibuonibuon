import newArray from './modules/new-array'

import * as slides from './modules/slides'

import Barba from 'barba.js'
import homepage from './modules/homepage'

import * as gsap from 'gsap'

import Loader from './modules/Loader'
var P = undefined

document.addEventListener('DOMContentLoaded', function () {

  P = [].concat(newArray(slides.slides))
  new Loader('#loader').init(P).then(function () {
    Barba.Pjax.start()
    Barba.Prefetch.init()
    gsap.to('#loader', .8, {
      autoAlpha: 0
    })
  })

  Barba.Dispatcher.on('linkClicked', function (n) {
    console.log('dispacher linkClicked', n)
  })

  Barba.Dispatcher.on('newPageReady', function (t) {
    console.log('dispacher newPageReady', t)
  })
})