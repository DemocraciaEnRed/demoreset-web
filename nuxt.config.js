import i18n from './locales/i18n'

export default {
  // target: 'static', // Default: 'server'
  // // ssr: false,
  // router: {
  //   base: '/demoreset-web/'
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Demo.Reset - Deliberation in the Global South',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://demoreset.democraciaenred.org/' },
      { property: 'og:image', content: 'https://demoreset.democraciaenred.org/sharer01.jpg' },
      { property: 'twitter:card', content: 'We connect experiences of political innovation around the globe, transforming the landscape of democracy in the Global South. . We are looking for you to be part of the new wave of deliberative democracy in the Global South!' },
      { property: 'twitter:url', content: 'https://demoreset.democraciaenred.org/' },
      { property: 'twitter:image', content: 'https://demoreset.democraciaenred.org/sharer01.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://fonts.googleapis.com', crossorigin: 'crossorigin', rel: 'preconnect' },
      { href: 'https://fonts.gstatic.com', rel: 'preconnect' },
      { href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap', rel: 'stylesheet' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css', rel: 'stylesheet', integrity: 'sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==', crossorigin: 'anonymous', referrerpolicy: 'no-referrer' }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '@/assets/scss/main.scss', lang: 'sass' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/graphql.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/init.js', mode: 'client' }
  ],
  // env: {
  //   apiUrl: process.env.API_URL || 'https://content.demoreset.democraciaenred.org',
  //   EXPRESS_API: process.env.EXPRESS_API,
  // },
  publicRuntimeConfig: {
    EXPRESS_API: 'http://localhost:4000/api',
    API_URL: 'https://content.demoreset.democraciaenred.org'
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/matchmaking',
    '~/components/matchmaking/filters',
    '~/components/matchmaking/manage'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources'
    // '@nuxt/postcss8'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', { css: false }],
    // https://github.com/nuxt-community/style-resources-module
    // '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://i18n.nuxtjs.org/setup
    '@nuxtjs/i18n'
  ],
  styleResources: {
    // your settings here
    scss: ['~assets/scss/_variables.scss'],
    hoistUseStatements: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseUrl: process.env.API_URL || 'https://content.demoreset.democraciaenred.org',
    prefix: '/graphql',
    credentials: true
  },
  i18n: {
    /* module options */
    // baseUrl: 'https://takeaction.ccijustice.org',
    locales: [{
      code: 'en',
      iso: 'en-US',
      name: 'English'
      // file: 'en.js'
    },
    {
      code: 'es',
      iso: 'es-ES',
      name: 'Español'
      // file: 'es.js'
    }],
    // lazy: true,
    // langDir: '~/locales',
    defaultLocale: 'en',
    vueI18n: i18n
  },
  loading: {
    color: '#000000',
    height: '5px'
  }
  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {
  //   postcss: false
  // }
}
