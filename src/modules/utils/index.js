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