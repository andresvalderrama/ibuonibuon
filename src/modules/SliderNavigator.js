import * as T from './T'

import * as gsap from 'gsap'

import BootstrapComponent from './BootstrapComponent'

export default class SliderNavigator extends BootstrapComponent {
  constructor(id, options) {
    super(id, options)

    this.$els.container = T.qs(this.options.containerClass, this.$el)

    console.log('this', this)
  }

  getDefaultOptions() {
    return {
      startFrom: 0,
      containerClass: '.c-navigator__container',
      itemsClass: 'c-navigator__item',
      currentEl: '[data-current-nav]'
    }
  }

  getInitialState() {
    return {
      prev: null,
      current: 0,
      next: 1,
      rotation: 0
    }
  }

  init() {
    var self = this

    super.init()

    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)

    for (var f = 0; f < this.options.items.length; f++) {
      var element = self.options.items[f]
      var title = element.getAttribute('data-title')
      var li = T.stringToDOM(
        `<li class="${self.options.itemsClass}" data-hide-cursor>
        <span>${title}</span>
      </li>` )

      self.$els.container.appendChild(li)
      if (f === self.options.items.length - 1) { self.$els.items = T.qsa(` .${self.options.itemsClass}`, self.$el) }
    }

    gsap.set(this.$els.container, {
      display: 'block',
      opacity: 0
    })

    var n = 1.5 * this.$els.items.length / 8
    var r = this.setState('radius', n * Math.PI)

    this.setState('steps', -r / this.$els.items.length)
    this.distributeAround()
  }

  resize() {
    this.distributeAround()
  }

  start(xPosition, current, totalWidth) {
    this.calculateRotation(xPosition, current, totalWidth)

    gsap.fromTo(this.$els.container, 1.2, {
      display: 'block',
      yPercent: -50,
      opacity: 1
    }, {
      display: 'block',
      yPercent: 0
    })
  }

  distributeAround() {
    var radians = T.radians(90)
    var clientWidth = this.$els.container.clientWidth
    var halfClienteWidth = clientWidth / 2
    var steps = this.getState('steps')

    for (var i = 0; i < this.$els.items.length; i++) {
      var element = this.$els.items[i]
      var x = Math.round(halfClienteWidth + (halfClienteWidth * Math.cos(radians) - element.clientWidth / 2))
      var y = Math.round(halfClienteWidth + (halfClienteWidth * Math.sin(radians) - element.clientHeight / 2))

      gsap.set(element, {
        position: 'absolute',
        left: x,
        top: y,
        rotationZ: T.degress(radians) - 90
      })

      radians += steps
    }
  }

  calculateRotation(xPos, current, width) {
    var radians = xPos * this.getState('radius') / width * -1

    this.setState('current', current)
    this.animate(radians)
  }

  animate(radians) {
    var self = this

    for(var i = 0; i < this.$els.items.length; i++) {
      var element = this.$els.items[i]

      element.removeAttribute('data-current-nav')
      if (self.getState('current') === i) {
        element.setAttribute('data-current-nav', '')
      }

      gsap.set(this.$els.container, {
        rotation: T.degress(radians)
      })
    }
  }
}