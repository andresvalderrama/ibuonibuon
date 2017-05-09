import EventEmitter from 'events'

export default class BootstrapComponent extends EventEmitter {
  constructor (domSelector, options = {}) {
    super()

    this.setMaxListeners(0)

    this.el = this.$el = ('string' === typeof domSelector)
      ? document.querySelector(domSelector) 
      : domSelector

    /** revisar ???
      if (no es un dom element) {
        console.warn('el elemento'+ this.el +' no es un dom element')
      }     
    */

    this.$els = {}
    this.options = Object.assign({}, this.getDefaultOptions(), options)
  }
}
