import * as PIXI from 'pixi.js'
import * as gsap from 'gsap'

import * as utils from './utils'

import BootstrapComponent from './BootstrapComponent'

export default class extends BootstrapComponent {
  constructor(DomSelector) {
    super(DomSelector)

    this.resources = []

    this.loader = new PIXI.loaders.Loader

    this.$els.bar = utils.qs(this.options.bar, this.$el)
    this.$els.progress = utils.qs(this.options.progress, this.$el)
    this.$els.graphicBar = utils.qs(this.options.graphicBar, this.$el)
  }

  getDefaultOptions() {
    return {
      graphicBar: '[data-bar]',
      bar: '.c-loader__wrapper',
      progress: '[data-progress]'
    }
  }

  init(sectionsFiles) {
    var self = this

    this.allDone = null

    this.preload(sectionsFiles)
    this.loader.load()

    gsap.set(this.$els.bar, {
      width: 0
    })

    this.loader.onProgress.add(function (loader) {
      gsap.to(self.$els.bar, 1.2, {
        width: loader.progress + '%'
      })

      var progress = parseInt(loader.progress)
      var progressInt = progress >= 95 ? 100 : progress

      self.$els.progress.innerHTML = progressInt
    })

    return new Promise(function (resolve) {
      self.allDone = resolve
    })

  }

  preload(sectionsFiles, ele) {
    var self = this
    var sprites = []

    if (Array.isArray(sectionsFiles) && sectionsFiles.length) {
      for (var f = 0; f < sectionsFiles.length; f++) {
        var sectionFile = sectionsFiles[f]

        for (var d = 0; d < sectionFile.sprites.length; d++) {
          var sprite = sectionFile.sprites[d]
          if (!sprites.includes(sprite.url)) {
            var urlPath = `assets/images/${sprite.url}.png`

            sprites.push(sprite.url)
            self.loader.add(sprite.url, urlPath)
          }
        }
      }
    }

    this.loader.once('complete', function () {
      self.resources.push(ele)
      self.emit('loaded')
      self.destroy()
    })
  }

  destroy() {
    var time = .6
    var tween = new gsap.TimelineMax({
      onComplete: () => {
        this.allDone()
        //super.destroy() --TODO
        document.body.removeChild(this.$el)
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
      .to(this.$el, .8, {
        opacity: 0
      })
  }
}
