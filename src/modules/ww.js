import { EventEmitter } from 'eventemitter2'

export default class WW extends EventEmitter {
  constructor (element, state = {}) {
    super()

    this.el = 'string' == typeof t ? document.querySelector(element) : element
    this.$el = 'string' == typeof t ? document.querySelector(element) : element
    this.setMaxListeners(0)
    

    this.$els = {}
    this.$refs = {}
    this.options = Object.assign({}, this.getDefaultOptions())

    //var a = new d.default(i.$el, i)

    this.delegate = function (  ) {}
    this.undelegate = function ( ) {}
    this.state = new Map
    
  }

  setRef () {
    console.log('setRef')
  }
  init () {
    console.log('init')
  }
  getDefaultOptions () {
    return {}
  }
  destroy () {
    console.log('destroy??? from WW.js')
  }
}
