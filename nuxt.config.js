const pkg = require('./package')
const webpack = require('webpack')
import router from './static/router'

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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
    '~/plugins/fliters',
    { src: '~/plugins/browser-util.js', ssr: false },
    { src: '~/plugins/swiper', ssr: false },
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
    // baseURL: '/proxy/',
    prefix: '/proxy/',
    proxy: true,
    // headers:{'Content-Type': "application/json; charset=utf-8"}
    // headers:{'Content-Type': "application/x-www-form-urlencoded"}
  },
  proxy: {
    '/repair': {
      target: 'http://115.159.101.204:7210/',
      // target: 'http://api.qixiu.hoxiuxiu.com/',
      pathRewrite: {'^/repair': ''},
      secure: false
    },
    '/proxy': {
      target: 'http://192.168.169.190:8888/',
      // target: 'http://api.qixiu.hoxiuxiu.com/',
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
    middleware: ['set-store'],
    extendRoutes (routes,resolve) {
      // routes.splice(0,routes.length, ...routers)
      routes.push(...router)
      // console.log(routes)
    }
  }
}
