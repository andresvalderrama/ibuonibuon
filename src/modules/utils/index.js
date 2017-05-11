export function qs(selector, dom = document) {
  return dom.querySelector(selector)
}

export function viewportSize() {
  var viewportInfo = {
    x: window.innerWidth,
    y: window.innerHeight,
    ratio: window.innerWidth / window.innerHeight
  }

  window.addEventListener('resize', function () {
    viewportInfo = {
      x: window.innerWidth,
      y: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight
    }
  })

  return viewportInfo
}

export function qsa(selector, dom = document) {
  return Array.from(dom.querySelectorAll(selector))
}

export function stringToDOM(stringElement = '') {
  var docFrag = document.createDocumentFragment()
  var divElement = docFrag.appendChild(document.createElement('div'))

  divElement.innerHTML = stringElement.trim()
  return divElement.children[0]
}

export function radians(degress) {
  return degress * Math.PI / 180
}

export function degress(radians) {
  return 180 * radians / Math.PI
}
