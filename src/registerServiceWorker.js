/* eslint-disable no-console */

import { register } from 'register-service-worker'

window.cookingRecipesApp_SWorker = {
  type: '',
  msg: ''
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
      // window.cookingRecipesApp_SWorker = {
      //   type: 'registered',
      //   msg: 'Service worker has been registered.'
      // }
    },
    cached () {
      console.log('Content has been cached for offline use.')
      // window.cookingRecipesApp_SWorker = {
      //   type: 'cached',
      //   msg: 'Content has been cached for offline use.'
      // }
    },
    updatefound () {
      console.log('New content is available; please refresh.')
      window.cookingRecipesApp_SWorker = {
        type: 'updatefound',
        msg: 'New content is available; please refresh.'
      }
    },
    updated () {
      console.log('Content up-to-date')
      // window.cookingRecipesApp_SWorker = {
      //   type: 'updated',
      //   msg: 'New content is available; please refresh.'
      // }
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
      window.cookingRecipesApp_SWorker = {
        type: 'offline',
        msg: 'No internet connection found. App is running in offline mode.'
      }
    },
    error (error) {
      console.error('Error during service worker registration:', error)
      window.cookingRecipesApp_SWorker = {
        type: 'error',
        msg: 'Error during service worker registration:' + error
      }
    }
  })
}
