import localForage from 'localforage'

const store = localForage.createInstance({
  name: 'app'
})

const mapStateForCache = state => {
  // Your business logic here
  return state
}

export const setState = state => {
  const cachedState = mapStateForCache(state)
  return store.setItem('state', cachedState)
}

export const getState = () => store.getItem('state')

export const deleteState = () => store.removeItem('state')
