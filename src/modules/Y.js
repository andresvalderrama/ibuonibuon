//import Ww from './ww'
import * as PIXI from 'pixi.js'
import WW from './ww'

export default class extends WW{
  constructor(selector) {
    super()

    this.resources = []
    this.loader = new PIXI.loaders.Loader

  }

  preload(array, ele) {
    var self = this
    var i = []
    //var r = d(array)
    //var i = []

    if (Array.isArray(array) && array.length) {
      array.forEach(function (ele) {
        ele.sprites.forEach(function (sprite) {
          if (!i.includes(sprite.url)) {
            //var e = T.isMobile ? `assets/images/mobile/${sprite.url}.png` : `assets/images/${sprite.url}.png`
            var e =  `assets/images/${sprite.url}.png`

            i.push(sprite.url)
            self.loader.add(sprite.url, e)
          }
        })
      })
    }

    this.loader.once('complete', function () {
      console.log('loader once -> complete')
      self.resources.push(e)
      self.emit('loaded')
      self.destroy()
    })

    console.log('preload thissss', this)
    console.log('preload selffff', self)
  }
  init(array) {
    //var self = this;

    this.allDone = null
    this.preload(array)
    //this.loader.load()

    console.log('init thiss', this)
  }
}