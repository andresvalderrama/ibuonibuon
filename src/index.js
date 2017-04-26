/*import exe from './yy'
var P = undefined

document.addEventListener('DOMContentLoaded', function () {
  var t = undefined
  var e = undefined

  new exe('#loader')
})*/

//import * as contacts from './modules/contacts'
//import * as about from './modules/about'
import * as slides from './modules/slides'

import newArray from './modules/new-array'

import Y from './modules/Y'
var P = undefined

document.addEventListener('DOMContentLoaded', function () {

  P = [].concat(newArray(slides.slides))
  new Y('#loader').init(P).then(function () {
    console.log('init then promise')
  })
})