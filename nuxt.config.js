const pkg = require('./package')
const webpack = require('webpack')
import router from './static/router'
import allcConfig from './config.js'


const areaName= process.env.area|| 'shanghai'
const shanghai= areaName== 'shanghai'
let config= allcConfig[areaName]


let conf= {
  mode: 'universal',
  env:{config: config},
  server: {
    port: config.port ,
    host: '0.0.0.0',
  },
  /*
  ** Headers of the page
  */
  head: {
    title: config.zhName+'机动车维修公共服务平台',
    meta: [
      { charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'user-scalable=no' },
      { name: 'keywords', content: shanghai?'上海市机动车维修公共服务平台,上海汽修平台,汽车维修,汽车养护,汽车保险,上海汽修平台app,上海汽车维修,上海汽车维修保养,上海汽车保养': `${config.zhName}机动车维修公共服务平台,${config.zhName}汽修平台,汽车维修,汽车养护` },
      { hid: 'description', name: 'description', content: `${config.zhName}汽修平台是为${config.zhName}车主打造的一款手机汽车服务客户端,软件提供汽车维修、汽车养护、汽车保险等一站式服务，${config.zhName}汽修平台app立足提升行业监管效能、提升公共服务水平，提高行业监管数字化、维修数据档案化、服务质量透明化、诚信经营公开化的目标建设本区域机动车维修行业网站。` }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { type: 'text/javascript', src: "/libs/jquery-3.3.1.min.js"},
      { type: 'text/javascript', src: "/other.js"},
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
    '~assets/font-awesome/css/font-awesome.min.css',
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
    { src: '~/plugins/browser-preprocess', ssr: false },
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
    '/staticArticle': {
      target: config.articlePath,
      pathRewrite: {'^/staticArticle': ''},
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
    loaders: {
      less: {
        javascriptEnabled: true
      },
    },
    extend(exconfig, ctx) {
      exconfig.resolve['alias']['vue$']= 'vue/dist/vue.esm.js'
    },
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     '$': 'jquery',
    //   })
    // ],
  },

  router:{
    middleware: ['set-store', 'check-auth', 'company-sign-in'],
    extendRoutes (routes,resolve) {
      if(areaName!='shanghai'){
        let arr=[]
        for(let i in routes){
          if(routes[i].name.indexOf('cdf')<0){
            arr.push(routes[i])
          }
        }
        routes= arr
      }
      // console.log(routes)
      routes.push(...router)
      return routes
    }
  }
}
if( process.env.NODE_ENV==='development'){
  conf.axios.port= config.port
}

module.exports =conf
