// axios plugin

export default function ({ $axios, store, app }) {
  // Add a request interceptor
  $axios.interceptors.request.use(function (config) {
    // if the hostname of the request is localhost:4000
    if (config.url.includes('http://localhost:4000')) {
      // if there is in the state of the store a token, add it to the header of the request
      if (store.state.token) {
        console.log('axios.js: token found in store')
        config.headers.common['x-access-token'] = store.state.token
      } else {
        console.log('axios.js: no token found in store')
      }
      return config
    } else {
      return config
    }
  })
}
