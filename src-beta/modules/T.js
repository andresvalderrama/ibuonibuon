//n(14)

export function viewportSize() {
  var t = {
    x: window.innerWidth,
    y: window.innerHeight,
    ratio: window.innerWidth / window.innerHeight
  }
  window.addEventListener('resize', function () {
    t = {
      x: window.innerWidth,
      y: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight
    }
  })

  return t
}

export function qs(selector, dom = document) {
  return dom.querySelector(selector)
}

export function qsa(selector, dom = document) {
  return Array.from(dom.querySelectorAll(selector))
}

export function data(data, element) {
  return element.hasAttribute('data-' + data) ? element.getAttribute('data-' + data) : ''
}

export function stringToDOM(stringElement = '') {
  var docFrag = document.createDocumentFragment()
  var element = docFrag.appendChild(document.createElement('div'))

  element.innerHTML = stringElement.trim()
  return element.children[0]
}

export function radians(degress) {
  return degress * Math.PI / 180
}

export function degress(radians) {
  return 180 * radians / Math.PI
}

export function handleEvent(event, options = {}) {

  var element = options.onElement
  var callback = options.withCallback
  var capture = options.useCapture

  var s = undefined !== capture && capture
  var a = arguments[2]
  var domElement = element || document.documentElement

  function handleEvent(event) {
    if ('function' == typeof callback) {
      callback.call(a, event)
    }
  }

  handleEvent.destroy = function () {
    return domElement.removeEventListener(event, handleEvent, s)
  }
  domElement.addEventListener(event, handleEvent, s)

  return handleEvent
}