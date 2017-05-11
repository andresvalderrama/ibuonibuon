import EventEmitter from 'events'
import uid from './utils/uid'

export default class BootstrapComponent extends EventEmitter {
  constructor(domSelector, options = {}) {
    super()

    if (undefined === domSelector) {
      return console.warn('domSelectort must be defined') // eslint-disable-line no-console
    }

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
    this.$refs = {}
    this.options = Object.assign({}, this.getDefaultOptions(), options)

    this.state = new Map
  }

  init(state = {}) {
    var self = this

    if (this.$el.getAttribute('data-ui-uid')) {
      console.log(` Element ${this.$el.getAttribute('data-ui-uid')} is already created `, this.$el) // eslint-disable-line no-console
      return this // ???
    }

    this._uid = uid.nextUid()
    this.$el.setAttribute('data-ui-uid', this._uid)
    if (!this.$el.id) {
      this.$el.id = ` component${this._uid}`
    }

    var stateEvents = this.bindStateEvents()
    Object.keys(stateEvents).forEach(function (event) {
      self.on(` change:${event}` , stateEvents[event].bind(self))
    })

    var initialState = Object.assign({}, this.getInitialState(), state)
    for (var i = 0; i < Object.keys(initialState).length; i++) {
      var key = Object.keys(initialState)[i]
      self.setState(key, initialState[key])
    }

    this._active = false
  }

  bindStateEvents() {
    return {}
  }

  setState(key, value) {
    var n = arguments.length > 2 && undefined !== arguments[2] && arguments[2] //???
    var currenState = this.state.get(key)

    if (currenState !== value) {
      this.state.set(key, value)
      n || this.emit(` change:${key}` , value, currenState) //???

      return value
    }
  }

  getState(key) {
    return this.state.get(key)
  }

  setRef(refId, Class) {
    var params = arguments.length
    var classParams = Array(params > 2 ? params - 2: 0)

    for (var s = 2; s < params; s++) {
      classParams[s - 2] = arguments[s]
    }

    console.log(Class instanceof BootstrapComponent)
    var refClass = Class instanceof BootstrapComponent
      ? Class
      : new (Function.prototype.bind.apply(Class, [null].concat(classParams)))

    var refExist = this.$refs[refId]
    this.$refs[refId] = refClass

    refExist
      ? refExist.destroy().then(function () { console.log('TODO')}) //TODO
      : Promise.resolve(refClass.init())
  }
}
