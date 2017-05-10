import * as gsap from 'gsap'

import BootstrapComponent from './BootstrapComponent'
import * as utils from './utils'

export default class Slider extends BootstrapComponent {
  constructor (DomSelector, options = {}) {
    super(DomSelector, options)

    this.$els.container = utils.qsa(this.options.slidesContainerClass, this.$el)
    this.$els.items = utils.qsa(this.options.itemClass, this.$el)

    this.gridWidth = utils.viewportSize().x
  }

  getDefaultOptions() {
    return {
      slidesContainerClass: '.c-slider',
      itemClass: '.c-slide',
      startFrom: 0
    }
  }

  getInitialState() {
    return {
      currentPos: {x: 0},

      itemsAmount: this.$els.items.length,

      current: this.options.startFrom,
      prev: this.options.startFrom - 1,
      next: this.options.startFrom + 1,

      totalWidth: 0,
      isFirstAnim: true
    }
  }

  init() {
    super.init()

    var xPosition = utils.viewportSize().x * this.getInitialState('current')

    this.setState('totalWidth', this.$els.items.length * this.gridWidth)

    gsap.set(this.$els.container, {
      width: this.getState('totalWidth'),
      x: -xPosition
    })

    //this.cursor.init TODO

    this.setTo()
  }

  setTo() {
    var self = this

    for (var i = 0; i < this.$els.items.length; i++) {
      var element = self.$els.items[i]
      element.removeAttribute('data-active')
    }

    this.currentEl = this.$els.items[this.getState('current')]
    this.currentEl.setAttribute('data-active', '')
    this.updateFocus()
  }

  updateFocus() {
    var section = utils.qs('[data-namespace="product"]', this.currentEl)

    if (section) { section.focus() }
  }

  start() {
    var _current = this.getState('current')
    //var xPosition = utils.viewportSize().x * _current

    this.slideTo(_current, true)
    this.setEvents()
  }

  slideTo(index, animate = false) {
    this.updateIndexes(index)
    this.animate(animate)   
  }
  
  updateIndexes(index) {
    var self = this

    if (this.getState('next') < this.getState('itemsAmount')) {
      var direction = index < this.getState('current') ? 'left' : 'right'

      this.setState('direction', direction)
      this.setState('current', index)
      this.setState('prev', index === 0 ? 0 : index - 1)
      this.setState('next', index + 1 === this.getState('itemsAmount') ? index : index + 1)

      for (var i = 0; i < this.$els.items.length; i++) {
        self.$els.items[i].removeAttribute('data-active')
      }

      this.currentEl = this.$els.items[this.getState('current')]
      this.currentEl.setAttribute('data-active', '')
    }
  }

  animate(animate) {
    var self = this

    this.setState('animating', true)

    if(this.getState('isFirstAnim') && !animate) { this.setState('isFirstAnim', false) }

    this.emit('animation:first')

    var time = animate ? 0 : 2
    var currentPos = this.getState('currentPos')
    var newPos = {
      x: -utils.viewportSize().x * this.getState('current')
    }

    this.tween = gsap.to(currentPos, time, {
      x: newPos.x,
      ease: gsap.Back.easeOut.config(.8),
      onUpdateParams: ['{self}'],
      onUpdate: function () {
        gsap.set(self.$els.container, {
          x: currentPos.x
        })

        //y.default.setPos(n.x, e.getState("current")), TODO
      },
      onStart: function () {
        gsap.set(self.currentEl, {
          pointerEvents: 'none'
        })
      },
      onComplete: function () {
        self.setState('animating', false)

        gsap.set(self.$els.items, {
          pointerEvents: ''
        })

        self.updateFocus()
      }
    })

  }

  setEvents() {
    var self = this
    var element = utils.qs(this.options.slidesContainerClass, this.$el)

    element.addEventListener('click', function (event) {
      if(event.clientX < utils.viewportSize().x / 3) {
        self.slideTo(self.getState('prev'))
      } else if (event.clientX > utils.viewportSize().x - utils.viewportSize().x / 3) {
        self.slideTo(self.getState('next'))
      }
    })
  }
}