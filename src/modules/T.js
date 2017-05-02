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