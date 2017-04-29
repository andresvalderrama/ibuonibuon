import { EventEmitter } from 'events'

export default class WW extends EventEmitter {
  constructor (selector, state = {}) {
    super()

    this.setMaxListeners(0)
    this.el = this.$el = 'string' == typeof selector ? document.querySelector(selector) : selector

    /** revisar ???
      if () {
      }     
    */    

    this.$els = {}
    this.$refs = {}
    this.options = Object.assign({}, this.getDefaultOptions(), state)

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
