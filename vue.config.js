module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/cooking-recipes-rom/' : '/',
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
}
