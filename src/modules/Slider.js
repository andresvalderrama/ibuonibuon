import * as gsap from 'gsap'
import { Lethargy } from 'lethargy'

import BootstrapComponent from './BootstrapComponent'
import SliderNavigator from './SliderNavigator'
import * as utils from './utils'

export default class Slider extends BootstrapComponent {
  constructor(DomSelector, options = {}) {
    super(DomSelector, options)

    this.$els.container = utils.qsa(this.options.slidesContainerClass, this.$el)
    this.$els.items = utils.qsa(this.options.itemClass, this.$el)

    this.gridWidth = utils.viewportSize().x

    var $sliderNavigator = utils.qs('#slider-navigator', this.$el)
    this.setRef('navigator', SliderNavigator, $sliderNavigator, {
      items: this.$els.items
    })
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
      currentPos: { x: 0 },

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
    var xPosition = utils.viewportSize().x * this.getState('current')

    this.slideTo(this.getState('current'), true)
    this.setEvents()

    gsap.set(this.$els.container, {
      x: -xPosition
    })

    if (this.getState('next') >= this.getState('itemsAmount') - 1) { //???
      this.setState('next', this.getState('current'))
    }

    this.$refs.navigator.start(-xPosition, this.getState('current'), this.getState('totalWidth'))
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

    if (this.getState('isFirstAnim') && !animate) {
      this.setState('isFirstAnim', false)
      this.emit('animation:first')
    }


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

    //on mousewheel
    this.bindScroll()


    //on click
    this.bindClick = this.bindClick.bind(this)
    element.addEventListener('click', this.bindClick)

    //on left and right keydown
    this.bindKeys = this.bindKeys.bind(this)
    document.addEventListener('keydown', this.bindKeys)
  }

  bindScroll() {
    var self = this
    var lethargy = new Lethargy

    this.$el.addEventListener('mousewheel', function (event) {
      event.preventDefault()
      event.stopPropagation()

      if (!self.getState('animating') && lethargy.check(event) !== false) {
        var direction = undefined

        direction = 1 === lethargy.check(event) ? 'prev' : 'next'
        self.slideTo(self.getState(direction))
      }
    })
  }

  bindClick(clickEvent) {
    if (clickEvent.clientX < utils.viewportSize().x / 3) {
      this.slideTo(this.getState('prev'))
    } else if (clickEvent.clientX > utils.viewportSize().x - utils.viewportSize().x / 3) {
      this.slideTo(this.getState('next'))
    }
  }

  bindKeys(keyEvent) {
    if (null === keyEvent.which) {
      keyEvent.which = null !== keyEvent.charCode ? keyEvent.charCode : keyEvent.keyCode
    }

    switch (keyEvent.which) {
      case 39:
        this.slideTo(this.getState('next'))
        break
      case 37:
        this.slideTo(this.getState('prev'))
        break
      default:
        return
    }
  }
}
