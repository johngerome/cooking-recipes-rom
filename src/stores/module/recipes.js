import { setState } from '@/plugins/localstorage.js'

const shouldSkipCache = mutation => {
  if (mutation.type === 'loadStateFromCache') {
    return true
  }
  // Your business logic here
  return false
}

const plugin = store => {
  store.subscribe((mutation, state) => {
    if (!shouldSkipCache(mutation)) {
      console.log('cache state')
      setState(state).catch(err => console.warn('failed to cache state', err))
    }
  })
}

export default plugin
