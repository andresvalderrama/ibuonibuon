import newArray from './modules/utils/newArray.js'


import Barba from 'barba.js'

//sections content
import { slidesHome as home } from './modules/home'
import { slidesAbout as about } from './modules/about'
import { slidesContacts as contacts } from './modules/contact'

import homepage from './modules/pages/homepage'  // eslint-disable-line no-unused-vars

import Loader from './modules/Loader'

var sectionFiles = undefined

document.addEventListener('DOMContentLoaded', function () {
  sectionFiles = [].concat(newArray(home), newArray(about), newArray(contacts))

  new Loader('#loader').init(sectionFiles).then(function () {
    Barba.Pjax.start() //initialize barba.js
    Barba.Prefetch.init() //prefetching the new page on the user's mouseover/touchstart on the link

    /**
     * The new container has been loaded and injected in the wrapper.
     * ${currentStus}
     * ${oldStatus}
     * ${HTMLElementContainer}
     * ${newPageRawHTML}
    */
    Barba.Dispatcher.on('newPageReady', function () {
      console.log('new Page Ready', arguments)
    })
  })
})


//TODO
//???