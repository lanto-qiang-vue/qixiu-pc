const pkg = require('./package')
const webpack = require('webpack')
import router from './static/router'
import config from './config.js'

module.exports = {
  mode: 'universal',

  server: {
    port: config.port,
    host: '0.0.0.0',
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '上海市机动车维修公共服务平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '机动车维修公共服务平台' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { type: 'text/javascript', src: "/libs/jquery-3.3.1.min.js"},
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    'iview/dist/styles/iview.css',
    { src: '~assets/css/common.less', lang: 'less' },
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/iview',
    '~/plugins/axios',
    '~/plugins/vue-api',
    // { src: '~/plugins/browser-util.js', ssr: false },
    { src: '~/plugins/swiper', ssr: false },
    { src: '~/plugins/lightbox', ssr: false },
    { src: '~/plugins/router-refresh', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: '/proxy/',
    proxy: true,
  },
  proxy: {
    '/repair': {
      target: config.repairUrl,
      pathRewrite: {'^/repair': ''},
      secure: false
    },
    '/proxy': {
      target: config.apiUrl,
      pathRewrite: {'^/proxy': ''},
      secure: false
    },
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    },
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     '$': 'jquery',
    //   })
    // ],
  },

  router:{
    middleware: ['set-store', 'check-auth'],
    extendRoutes (routes,resolve) {
      routes.push(...router)
    }
  }
}

