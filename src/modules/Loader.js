import * as PIXI from 'pixi.js'
import * as gsap from 'gsap'

import BootstrapComponent from './BootstrapComponent'
import * as T from './T'

export default class extends BootstrapComponent {
  constructor(selector) {
    super(selector)

    this.resources = []
    this.loader = new PIXI.loaders.Loader

    this.$els.bar = T.qs(this.options.bar, this.$el)
    this.$els.graphicBar = T.qs(this.options.graphicBar, this.$el)
    this.$els.progress = T.qs(this.options.progress, this.$el)

    this.$els.bars = [this.$els.bar, this.$els.progress]

  }

  preload(array, ele) {
    var self = this
    var i = []
    
    if (Array.isArray(array) && array.length) {
      array.forEach(function (ele) {
        ele.sprites.forEach(function (sprite) {
          if (!i.includes(sprite.url)) {
            //var e = T.isMobile ? `assets/images/mobile/${sprite.url}.png` : `assets/images/${sprite.url}.png`
            var e = `assets/images/${sprite.url}.png`

            i.push(sprite.url)
            self.loader.add(sprite.url, e)
          }
        })
      })
    }

    this.loader.once('complete', function () {
      self.resources.push(ele)
      self.emit('loaded')
      self.destroy()
    })

  }
  init(array) {
    var self = this

    this.allDone = null
    this.preload(array)
    this.loader.load()

    gsap.set(this.$els.bar, {
      width: 0
    })

    this.loader.onProgress.add(function (loader) {
      gsap.to(self.$els.bar, 1.2, {
        width: loader.progress + '%'
      })

      var e = parseInt(loader.progress)
      var progressValue = e >= 95 ? '100' : e

      self.$els.progress.innerHTML = progressValue
    })

    return new Promise(function (resolve) {
      self.allDone = resolve
    })

  }
  destroy() {
    var self = this
    var time = .6
    var tween = new gsap.TimelineMax({
      onComplete: () => {
        self.allDone()
        super.destroy()
        document.body.removeChild(self.$el)
      }
    })

    tween
      .to(this.$els.graphicBar, time, {
        scaleX: 0,
        delay: 2,
        ease: gsap.Power4.easeOut
      })
      .to('.loading-text', .4, {
        xPercent: 100,
        autoAlpha: 0,
        ease: gsap.Power4.easeOut
      }, '-=' + time)
      .to(this.$el, .5, {
        opacity: 0
      })
  }
  getDefaultOptions() {
    return {
      graphicBar: '[data-bar]',
      bar: '.c-loader__wrapper',
      progress: '[data-progress]'
    }
  }
}