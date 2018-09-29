const pkg = require('./package')
const webpack = require('webpack')

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
    ]
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
    '~/plugins/axios'
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
    '/proxy': {
      // target: 'http://api.test.shanghaiqixiu.org/',
      target: 'http://api.qixiu.hoxiuxiu.com/',
      pathRewrite: {'^/proxy': ''},
      secure: false
    }
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
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
      })
    ],
    vendor: ['iview']
  }
}
