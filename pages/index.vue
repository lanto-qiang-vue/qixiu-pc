<template>
<div>
  <ver-shanghai :banners="banners" :swiperOption="swiperOption" :showSwiper="showSwiper"
                :information="information" v-if="isShanghai"></ver-shanghai>
  <ver-others :banners="banners" :swiperOption="swiperOption" :showSwiper="showSwiper"
              :information="information" v-else></ver-others>
<!--<common-footer></common-footer>-->
</div>
</template>

<script>
import VerShanghai from '~/components/index/ver-shanghai.vue'
import VerOthers from '~/components/index/ver-others.vue'
// import CommonFooter from '~/components/common-footer.vue'
// import CommonFooter from '~/components/common-footer.vue'
// import IconBlock from '~/components/menu/icon-block.vue'
// import LoginStatus from '~/components/login-status.vue'
import { deepClone } from '~/static/util.js'
import mixin from '~/components/page-mount-mixin.js'

if(!thisData) {
  var thisData= {
    banners:[],
    swiperOption: {
      // slidesPerView : 3,
      centeredSlides : true,
      loop : true,
      // loopAdditionalSlides: 3,
      // loopedSlides: 3,

      // width: window.innerWidth*2.4,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
    },
    showSwiper: false,

    information:{},


    error: null,
    isGetData: false
  }
}

export default {
  name: 'index',
  layout: 'layout-root',
  components: {VerShanghai, VerOthers},
  mixins: [mixin],
  asyncData ({ app, env, error }) {
    // console.log('env', env)
    if(process.client && thisData && thisData.isGetData) {
      console.log('cache')
      return thisData
    }

    let homeArticles= new Promise((resolve, reject) => {
      app.$axios.$get('/infopublic/home/all').then(res => {
        if (res.code === '0') {
          resolve( res.item)
        } else reject( res)
      },err => {
        reject(err)
      })
    })

    let questionList= ()=>{
      return new Promise((resolve, reject) => {
        app.$axios.$post('/question/nostate/list',{
          "pageNo": 1,
          "pageSize": 5,
        }).then(res => {
          if (res.code === '0') {
            resolve( res.items)
          } else reject( res)
        },err => {
          reject(err)
        })
      })
    }
    let cdfList= ()=>{
      return new Promise((resolve, reject) => {
        app.$axios.$get('/expert/nostate/list' ).then(res => {
          if (res.code === '0') {
            resolve( res.items)
          } else reject( res)
        },err => {
          reject(err)
        })
      })
    }
    let articles= (type, limit)=>{
      return new Promise((resolve, reject) => {
        app.$axios.$post('/infopublic/home/all',{
          infoType: type,
          pageNo: 1,
          pageSize: limit
        }).then(res => {
          if (res.code === '0') {
            resolve( res.items)
          } else reject( res)
        },err => {
          reject(err)
        })
      })
    }

    let errFun= (errData)=>{
      return (err)=>{

        console.log('is-err',err)


        let setData= errData

        // if(err.response && err.response.config && err.response.data){
        //   console.log('err',err.response)
        if(err.response){
          setData.error=  {
            url: err.response.config?err.response.config.url: '',
            // headers: JSON.stringify(err.response.config.headers),
            status: err.response.status,
            statusText: err.response.statusText,
            headers: err.response.config?err.response.config.headers: '',
            data: err.response.config.data,
            response: JSON.stringify(err.response.data),
            // response: err.response.data
          }
        }else{
          setData.error= err
        }

        return setData
      }
    }


    let shanghai=()=>{
      // console.log('in.shanghai')
      return Promise.all([
      questionList(),
      cdfList(),
      homeArticles

    ]).then(([resQuestion, resCdf, resArticle ]) => {
      let latest= resArticle.middle10281020
      let hottest= deepClone(latest)
      // latest.sort(function (a,b) {
      //   return (new Date(a.createTime|| 0) > new Date(b.createTime || 0))? -1: 1
      // })
      for (let i in hottest){
        let temp={}
        let randomIndex = Math.floor(Math.random()*(hottest.length-1));
        temp= hottest[i]
        hottest[i]= hottest[randomIndex]
        hottest[randomIndex]= temp
      }
      return {
        information:{
          questionList: resQuestion,
          cdfList: resCdf,
          articleBanner: resArticle.left10281019.concat(resArticle.middle10281013),
          articleMiddle: {
            latest: latest,
            hottest: hottest,
          },
          articleRight: [resArticle.right10281006, resArticle.right10281016, resArticle.right10281017],
        },
        isGetData: true
      }
    }, errFun({
      information:{
        questionList: [],
        cdfList: [],
        articleBanner: [],
        articleMiddle: {
          latest: [],
          hottest: [],
        },
        articleRight: [],
      }
    }))
    }

    let other= ()=>{
      // console.log('in.other')
      return Promise.all([
      homeArticles,
      articles( '10281038', 10),
      articles( '10281039', 10)
    ]).then(([ resArticle, resSystem, resNotice ]) => {
      let latest= resArticle.middle10281020
      let hottest= deepClone(latest)
      // latest.sort(function (a,b) {
      //   return (new Date(a.createTime|| 0) > new Date(b.createTime || 0))? -1: 1
      // })
      for (let i in hottest){
        let temp={}
        let randomIndex = Math.floor(Math.random()*(hottest.length-1));
        temp= hottest[i]
        hottest[i]= hottest[randomIndex]
        hottest[randomIndex]= temp
      }
      return {
        information:{
          systemList: resSystem,
          noticeList: resNotice,
          articleBanner: resArticle.left10281019.concat(resArticle.middle10281013),
          articleMiddle: {
            latest: latest,
            hottest: hottest,
          },
          articleRight: [resArticle.right10281006, resArticle.right10281016, resArticle.right10281017],
        },
        isGetData: true
      }
    }, errFun({
        information:{
        systemList: [],
        noticeList: [],
        articleBanner: [],
        articleMiddle: {
          latest: [],
          hottest: [],
        },
        articleRight: [],
      }
    }))
    }

    // console.log('env.config.areaName=="shanghai"', env.config.areaName=="shanghai")

    return env.config.areaName=='shanghai'? shanghai(): other()
  },
  data () {
    return thisData
  },
  computed:{
    isShanghai(){
      return process.env.config.areaName=='shanghai'
    },
    conf(){
      return process.env.config
    }
  },
  mounted(){
    // console.log('process.env.config', process.env.config)

    // let self= this
    if(!this.banners.length){
      this.getBanner()
    }
    // if(!this.area.length){
    //   this.getArea()
    // }


    this.error? console.error('error: ', this.error) : console.log('no-error')


  },
  methods:{
    // getArea(){
    //   this.$axios.$get('/area/query').then( (res) => {
    //     this.area= res.items
    //   })
    // },
    getBanner(){
      this.$axios.$post('/banner/query', {
        terminal: 'P'
      }).then( (res) => {
        this.banners= res.items
        this.showSwiper= true
      })
    },

  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    thisData= this.$data
    // console.log('beforeRouteLeave:', thisData)
    next()
  }
}
</script>

<style lang="less">

  @he: ~`process.env.area`;
  body{
    area: @he;
  }
  .Nav-Main();
  @Nav-Main: ~`process.env.area ? 'off': 'on'`;
  .Nav-Main () when (@Nav-Main = off) {
    /*@import "./red-index.less";*/
  }
</style>
