import * as gsap from 'gsap'

import BootstrapComponent from './BootstrapComponent'
import * as utils from './utils'

export default class SliderNavigator extends BootstrapComponent {
  constructor(DomSelector, options = {}) {
    super(DomSelector, options)

    this.$els.container = utils.qs(this.options.containerClass, this.$el)

    console.log(this)
  }

  getDefaultOptions() {
    return {
      containerClass: '.c-navigator__container',
      itemsClass: 'c-navigator__item'
    }
  }

  getInitialState() {
    return {
      rotation: 0,
      current: 0
    }
  }

  init() {
    super.init()

    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)

    for (var f = 0; f < this.options.items.length; f++) {
      var element = this.options.items[f]
      var title = element.getAttribute('data-title')
      var newLi = utils.stringToDOM(
        `<li class="${this.options.itemsClass}" data-hide-cursor>
          <span>${title}</span>
        </li>` )

      this.$els.container.appendChild(newLi)

      if (f === this.options.items.length - 1) {
        this.$els.items = utils.qsa(` .${this.options.itemsClass}` , this.$el)
      }
    }

    gsap.set(this.$els.container, {
      display: 'block',
      opacity: 0
    })

    var radius = 1.5 * this.$els.items.length / 8
    var radians = this.setState('radius', radius * Math.PI)
    this.setState('steps', -radians / this.$els.items.length)

    this.distributeAround()
  }

  resize() {
    this.distributeAround()
  }

  distributeAround() {
    var radians = utils.radians(90)
    var halfContainer = this.$els.container.clientWidth / 2
    var steps = this.getState('steps')

    for (var i = 0; i < this.$els.items.length; i++) {
      var element = this.$els.items[i]
      var x = Math.round(halfContainer + (halfContainer * Math.cos(radians) - element.clientWidth / 2))
      var y = Math.round(halfContainer + (halfContainer * Math.sin(radians) - element.clientHeight / 2))

      gsap.set(element, {
        position: 'absolute',
        left: x,
        top: y,
        rotationZ: utils.degress(radians) - 90
      })

      radians += steps
    }
  }

  start(xSliderPos, current, sliderWidth) {
    this.calculateRotation(xSliderPos, current, sliderWidth)

    gsap.fromTo(this.$els.container, 1.2, {
      display: 'block',
      yPercent: -50,
      opacity: 1
    }, {
      display: 'block',
      yPercent: 0
    })
  }

  calculateRotation(xSliderPos, current, sliderWidth) {
    var radians = xSliderPos * this.getState('radius') / sliderWidth * -1

    this.setState('current', current)
    this.animate(radians)
  }

  animate(radians) {
    var element = null
    for (var i = 0; i < this.$els.items.length; i++) {
      element = this.$els.items[i]

      element.removeAttribute('data-current-nav')
      if (this.getState('current') === i) {
        element.setAttribute('data-current-nav', '')
      }

      gsap.set(this.$els.container, {
        rotation: utils.degress(radians)
      })
    }
  }
}
