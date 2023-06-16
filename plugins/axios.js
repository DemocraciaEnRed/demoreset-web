// axios plugin

export default function ({ $axios, store, app, $config }) {
  // Add a request interceptor
  $axios.interceptors.request.use(function (config) {
    // if the hostname of the request is localhost:4000
    console.log('$config.EXPRESS_API FROM AXIOS PLUGIN: ' + $config.EXPRESS_API)
    // console.log('2FROM AXIOS PLUGIN: ' + config.EXPRESS_API)
    console.log('process.env.EXPRESS_API FROM AXIOS PLUGIN: ' + process.env.EXPRESS_API)
    if (config.url.includes(`${$config.EXPRESS_API}`)) {
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
