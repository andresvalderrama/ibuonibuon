import * as T from './T'

import SliderNavigator from './SliderNavigator'

import BootstrapComponent from './BootstrapComponent'

import * as gsap from 'gsap'

export default class Slider extends BootstrapComponent {
  constructor(id, options) {
    super(id, options)

    this.gridWidth = T.viewportSize().x
    this.bindIndicators = []
    this.cursor = null
    this.$els.items = T.qsa(this.options.itemClass, this.$el)
    this.$els.container = T.qsa(this.options.slidesContainerClass, this.$el)

    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)

    var $sliderNavigator = T.qs('#slider-navigator', this.$el)
    this.setRef('navigator', SliderNavigator, $sliderNavigator, {
      items: this.$els.items
    })
  }

  getDefaultOptions() {
    return {
      nextClass: 'is-next',
      prevClass: 'is-prev',
      slidesContainerClass: '.c-slider',
      prevButtonClass: 'c-slider-button__prev',
      nextButtonClass: 'c-slider-button__next',
      itemClass: '.c-slide',
      indicatorContainer: 'c-slider-nav',
      indicatorClass: 'c-slider-nav__el',
      startFrom: 0
    }
  }

  getInitialState() {
    return {
      old: -1,
      currentPos: { x: 0 },
      itemsAmount: this.$els.items.length,
      current: this.options.startFrom,
      prev: this.options.startFrom - 1,
      next: this.options.startFrom + 1,
      totalWidth: 0,
      isFirstAnim: false
    }
  }

  init() {
    super.init()

    var xPosition = T.viewportSize().x * this.getState('current')

    this.setState('totalWidth', this.$els.items.length * this.gridWidth)

    gsap.set(this.$els.container, {
      width: this.getState('totalWidth'),
      x: -xPosition
    })

    /*this.cursor.init()*/
    this.setTo()
  }

  resize() {
    var xPosition = T.viewportSize().x * this.getState('current')

    this.gridWidth = T.viewportSize().x
    this.setState('totalWidth', this.$els.items.length * this.gridWidth)

    gsap.set(this.$els.container, {
      width: this.getState('totalWidth'),
      x: -xPosition
    })
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

  start() {
    //var xPosition = T.viewportSize().x * this.getState('current')

    this.slideTo(this.getState('current'), true)

    //left make more code
  }

  updateIndexes(index) {
    var self = this

    if (!(this.getState('next') < 0 || this.getState('next') > this.getState('itemsAmount') - 1)) {
      var direction = index < this.getState('current') ? 'left' : 'right'

      this.setState('direction', direction)
      this.setState('current', index)
      this.setState('prev', index === 0 ? 0 : index - 1)
      this.setState('next', index + 1 === this.getState('itemsAmount') ? index : index + 1)
      for (var f = 0; f < this.$els.items.length; f++) {
        self.$els.items[f].removeAttribute('data-active')
      }
      this.currentEl = this.$els.items[this.getState('current')]
      this.currentEl.setAttribute('data-active', '')
    }
  }

  slideTo(current) {
    var start = arguments.length > 1 && undefined !== arguments[1] && arguments[1]

    this.updateIndexes(current)
    this.animate(start)
  }

  animate(animate) {
    var self = this

    this.setState('animating', true)
    //this.getState('isFirstAnim', )
    this.emit('animation:first')

  }

  updateFocus() {
    var section = T.qs('[data-namespace="product"]', this.currentEl)

    section && section.focus()
  }
}