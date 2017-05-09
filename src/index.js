import newArray from './modules/utils/newArray.js'

//sections content
import { slidesHome as home } from './modules/home'
import { slidesAbout as about } from './modules/about'
import { slidesContacts as contacts } from './modules/contact'

import Loader from './modules/Loader'

var sectionFiles = undefined

document.addEventListener('DOMContentLoaded', function () {
  sectionFiles = [].concat(newArray(home), newArray(about), newArray(contacts))

  new Loader('#loader').init(sectionFiles).then(function () {
    console.log('loader done')
  })
})
