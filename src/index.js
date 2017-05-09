import newArray from './modules/utils/newArray.js'

//sections content
import { slidesHome as home } from './modules/home'
import { slidesAbout as about } from './modules/about'
import { slidesContacts as contacts } from './modules/contact'

var files = undefined

document.addEventListener('DOMContentLoaded', function () {
  files = [].concat(newArray(home), newArray(about), newArray(contacts))
})
