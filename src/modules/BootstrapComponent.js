//n(96)

import { EventEmitter } from 'events'
import * as g from './g'

export default class BootstrapComponent extends EventEmitter {
  constructor(selector, options = {}) {
    super()

    this.setMaxListeners(0)
    this.el = 'string' == typeof selector ? document.querySelector(selector) : selector
    this.$el = 'string' == typeof selector ? document.querySelector(selector) : selector

    /** revisar ???
      if () {
      }     
    */

    this.$els = {}
    this.$refs = {}
    this.options = Object.assign({}, this.getDefaultOptions(), options)

    //var a = new d.default(i.$el, i)

    this.delegate = function () { }
    this.undelegate = function () { }
    this.state = new Map
  }

  setRef(selector, Class) {

    //var self = this
    var params = arguments.length
    var arrayParams = Array(params > 2 ? params - 2 : 0)

    for (var s = 2; s < params; s++) {
      arrayParams[s - 2] = arguments[s]
    }

    var a = Class instanceof BootstrapComponent ? Class : new (Function.prototype.bind.apply(Class, [null].concat(arrayParams)))
    var ref = this.$refs[selector]

    this.$refs[selector] = a

    ref ? ref.destroy().then(function () { console.log('todo') }) : Promise.resolve(a.init())
  }

  init(state = {}) {
    var self = this

    if (this.$el.getAttribute('data-ui-uid')) {
      console.log(` Element ${this.$el.getAttribute('data-ui-uid')} is already created `, this.$el)
      return this
    }
    this._uid = g.nextUid()
    this.$el.setAttribute('data-ui-uid', this._uid)
    this.$el.id || (this.$el.id = ` component${this._uid}`)

    this.beforeInit()

    var stateEvents = this.bindStateEvents()
    Object.keys(stateEvents).forEach(function (event) {
      self.on('change' + event, stateEvents[event].bind(self))
    })


    var initialState = Object.assign({}, this.getInitialState(), state)
    Object.keys(initialState).forEach(function (state) {
      self.setState(state, initialState[state])
    })

    this._active = false
  }

  getState(state) {
    return this.state.get(state)
  }

  setState(state, value) {
    var n = arguments.length > 2 && undefined !== arguments[2] && arguments[2]
    var currentState = this.state.get(state)
    var newValue = value

    if (currentState !== newValue) {
      this.state.set(state, value)
      n || this.emit('change:' + state, value, currentState)

      return value
    }
  }

  bindStateEvents() {
    return {}
  }

  getInitialState() {
    return {}
  }

  getDefaultOptions() {
    return {}
  }

  beforeInit() { }

  closeRefs() {
    var self = this

    return Promise.all(Object.keys(this.$refs).map(function (element) {
      return self.$refs[element].destroy()
    })).then(function () {
      self.$refs = {}
    }).catch(function (error) {
      console.log('close refs', error)
    })
  }

  destroy() {
    var self = this

    this.emit('destroy')

    //this.undelegate() ???
    this.removeAllListeners()
    this.$el.removeAttribute('data-ui-uid')
    this.closeRefs().then(function () {
      self._active = false
    }).catch(function (error) {
      console.log('destroy catch', error)
    })

  }
}

