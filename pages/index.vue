<template>
<div class="index">
<div class="content">
  <img class="new-text temp" src="~@/assets/img/temp-red/new-text.png"/>
  <img class="lantern-left temp" src="~@/assets/img/temp-red/lantern01.png"/>
  <img class="lantern-right  temp" src="~@/assets/img/temp-red/lantern02.png"/>
  <div class="head">
    <div class="title">
      <img src="../assets/img/login_img/logo.png">
      <div>
        <h1>上海市机动车维修公共服务平台</h1>
        <span style="font-size: 16px">Shanghai Automobile Maintenance Public Service Platform</span>
      </div>
    </div>
    <div class="right">
      <span class="tel">400-663-8210</span>
      <a href="http://www.lantoev.com/android/DownLoad.html" target="_blank" class="app">
        <p>下载APP</p>
        <img src="../assets/img/index/qrcode_app.png">
      </a>
      <div class="wx">
        <p>关注微信</p>
        <img src="../assets/img/index/qrcode_weixin.jpg">
      </div>
      <nuxt-link tag="a" to="/article/guide">
        <img class="czzn" src="../assets/img/index/czzn.png" title="操作指南"></nuxt-link>
    </div>

    <login-status :isIndex="true"></login-status>
  </div>
  <div class="banner" v-if="showSwiper">
    <swiper :options="swiperOption" ref="mySwiper" class="banner-swiper" >
      <!-- slides -->
      <swiper-slide v-for="(item, index) in banners" :key="index">
        <div class='dummy'></div>
        <ul class='content'>
          <li class="banner-body" :style="(item.linkUrl&&item.linkUrl!='/')?'cursor: pointer;':''"
             @click="clickBanner(item.linkUrl, item.linkTarget)">
            <img :src="item.imageUrl">
          </li>
        </ul>
      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </swiper>
  </div>
  <div class="service">
    <div class="left">
      <ul>
        <li class="owner-center" icon-block-type="1">
          <img style="width: 70px;" src="/img/menu-icon/车主服务中心.png"><p>车主服务中心</p>
        </li>
        <li class="com-center" icon-block-type="2">
          <img style="width: 50px" src="/img/menu-icon/汽修企业服务中心.png"><p>汽修企业</p><p>服务中心</p>
        </li>
        <li class="gover-center" icon-block-type="3">
          <img style="width: 40px;" src="/img/menu-icon/政务服务中心.png"><p>政务服务中心</p>
        </li>
        <li class="relate-center" icon-block-type="4">
          <img style="width: 70px;margin-top: 30px" src="/img/menu-icon/汽修相关产业服务中心.png"><p>汽修相关产业</p><p>服务中心</p>
        </li>
        <li class="association-center" icon-block-type="5">
          <img style="width: 70px" src="/img/menu-icon/协会服务中心.png"><p>协会服务中心</p>
        </li>
        <li class="talent-center" icon-block-type="6">
          <img style="width: 70px" src="/img/menu-icon/人才服务中心.png"><p>人才服务中心</p>
        </li>
        <li class="supervise-center" icon-block-type="7">
          <img style="width: 50px;margin-bottom: 5px" src="/img/menu-icon/公共监督服务中心.png"><p>公众监督</p>
        </li>
        <li class="business-center" icon-block-type="8">
          <img style="width: 50px" src="/img/menu-icon/商务服务中心.png"><p>商务服务中心</p>
        </li>
        <li class="data-center" icon-block-type="9">
          <img style="width: 70px" src="/img/menu-icon/大数据服务中心.png"><p>大数据</p><p>服务中心</p>
        </li>
      </ul>
      <nuxt-link class="record" tag="div" to="/center/my-car-record"><img src="/img/menu-icon/电子健康档案系统.png">电子健康档案系统</nuxt-link>
      <icon-block :type="iconBlockType" :left="iconBlockLeft" :show="iconBlockShow"></icon-block>
    </div>
    <div class="right">
      <div class="title"><div><h1>维修服务查询</h1><p>快速定位，为您提供满意的服务</p></div></div>
      <div class="query">
        <div><Input v-model="search.q" size="large" placeholder="输入维修企业名称/地址"
                    @on-enter="query" @on-change="$refs.hot.clearSingleSelect()"/></div>
        <div class="select">
          <Select v-model="search.sort" size="large" placeholder="企业排序" clearable style="width:19%;">
            <Option v-for="(item, index) in sort" :value="item.value" :key="index">{{item.name}}</Option>
          </Select>
          <Select v-model="search.is4s" size="large" placeholder="企业类型" clearable style="width:19%;">
            <Option v-for="(item, index) in maintainType" :value="item.value" :key="index">{{item.name}}</Option>
          </Select>
          <Select v-model="search.area" size="large" placeholder="企业区域" clearable style="width:19%;">
            <Option v-for="(item, index) in area" :value="item.code" :key="index">{{item.name}}</Option>
          </Select>
          <Select v-model="search.hot" size="large" placeholder="热门搜索" clearable style="width:19%;" ref="hot"
                  @on-change='selectHot' >
            <Option v-for="(item, index) in hot" :value="item.value" :key="index">{{item.name}}</Option>
          </Select>
          <Button size="large" type="primary" style="" @click="query">查询</Button>
        </div>
      </div>
      <div class="msg">
        <div class="owner">
          <div class="tit">
            <!--<img src="../assets/img/index/person.png">-->
            <img class="temp" src="~@/assets/img/temp-red/icon-service.png">
            <p>车主</p>
            <p>服务</p>
            <p>中心</p>
          </div>
          <ul>
            <nuxt-link tag="li" :to="'/center/my-car-record'"><a>爱车档案</a></nuxt-link>
            <nuxt-link tag="li" :to="'/center/my-order'"><a>我的预约服务</a></nuxt-link>
            <nuxt-link tag="li" :to="'/center/my-questions'"><a>我的咨询</a></nuxt-link>
            <li><a href="/file/tips.pdf" target="_blank">爱车小贴士</a></li>
          </ul>
        </div>
        <div class="doctor">
          <div class="tit"><p>车大夫门诊</p></div>
          <ul class="tag">
            <li class="button" @mouseover="showCdfFlag=true">问题集锦</li>
            <li class="button" @mouseover="showCdfFlag=false">专家团</li>
            <li class="cdf">
              <a href="/cdf">在线咨询</a>
            </li>
          </ul>
          <div class="doctor_content active" id="gather_content" v-show="showCdfFlag">
            <ul>
              <!--<nuxt-link tag="a" :to="centerHref" class="center">{{roleName}}中心</nuxt-link>-->
              <nuxt-link tag="li" v-for="item in questionList" :key="'questionList-'+item.id" :to="'/cdf/'+item.id">{{item.content}}</nuxt-link>
            </ul>
            <nuxt-link class="list_button" tag="a" :to="'/cdf'">浏览更多</nuxt-link>
          </div>

          <div class="doctor_content" id="professor_content" v-show="!showCdfFlag">
            <ul>
              <!--<li v-for="item in cdfList" :key="'cdfList-'+item.id">{{item.name}}</li>-->
              <nuxt-link tag="li" v-for="item in cdfList" :key="'cdfList-'+item.id" :to="'/cdf/expert/'+item.id">{{item.name}}</nuxt-link>
            </ul>
            <nuxt-link tag="a" :to="'/article/specialist'" class="list_button">浏览更多</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="news">
    <div class="block block1" >
      <div class="title"><h1>新闻动态</h1><nuxt-link tag="a" :to="'/gov-article/10281019/'">更多</nuxt-link></div>
      <swiper :options="swiperOption" ref="mySwiper" class="news-swiper" v-if="showSwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in articleBanner" :key="index">
          <div class='dummy'></div>
          <div class='content'>
            <!--<a :href="item.id" class="news-swiper-body">-->
              <!--<div>{{item.title}}</div>-->
              <!--<img :src="item.photo || '/img/default-car.png'">-->
            <!--</a>-->

          <nuxt-link tag="a" :to="'/gov-article/10281019/'+item.id" class="news-swiper-body">
            <div>{{item.title}}</div>
            <img :src="item.photo || '/img/default-car.png'">
          </nuxt-link>
          </div>
        </swiper-slide>

        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
      </swiper>
    </div>
    <div class="block block2">

      <div class="title"><h1>管理动态</h1><nuxt-link tag="a" :to="'/gov-article/10281020'">更多</nuxt-link></div>

      <div class="best best1">
        <div class="left">最新</div>
        <ul>
          <nuxt-link tag="a" :to="'/gov-article/10281020/'+item.id" v-for="item in articleMiddle.latest" :key="'articleMiddle-latest'+item.id">{{item.title}}</nuxt-link>
        </ul>
      </div>
      <div class="best best2">
        <div class="left hot">最热</div>
        <ul>
          <!--<a v-for="item in articleMiddle.hottest" :key="'articleMiddle-hottest'+item.id">{{item.title}}</a>-->
          <nuxt-link v-for="item in articleMiddle.hottest" :key="'articleMiddle-hottest'+item.id" :to="'/gov-article/10281020/'+item.id">{{item.title}}</nuxt-link>
        </ul>
      </div>
    </div>
    <div class="block block3">
      <div class="title"><h1>行业监管</h1><nuxt-link :to="'/gov-article/10281001'">更多</nuxt-link></div>
      <ul>
        <nuxt-link class="article" v-for="item in articleRight" :key="'articleRight'+item.id" :to="'/gov-article/10281001/'+item.id">
          <h3>{{item.title}}</h3>
          <p style="-webkit-box-orient: vertical;">{{item.meno | FormatArticle(item.title)}}</p>
        </nuxt-link>
      </ul>
    </div>
  </div>
  <ul class="cooperator">
    <li><a class="guide" style="cursor:Default;">指导部门：上海市城市交通运输管理处</a></li>
    <li><a class="hold" style="cursor:Default;">主办单位：上海市汽车维修行业协会</a></li>
    <li><a class="us" href="/partner">承办单位：上海蓝速汽车技术有限公司</a></li>
  </ul>
</div>
<common-footer></common-footer>

  <nuxt-link tag="div" class="float-icon" to="/center/staff-query">
    <Icon type="ios-people" size="40" style="line-height: 50px"/>
    <p>企业员工信息</p>
  </nuxt-link>

  <!--<div id="float-survey">-->
    <!--<p class="close">关闭</p>-->
    <!--<a href="http://dh3t.cn/ys6RSb" target="_blank">-->
      <!--<img src="/img/temp/float-survey.png"/>-->
    <!--</a>-->
  <!--</div>-->
  <!--<style>-->
    <!--#float-survey{-->
      <!--z-index: 999999999;-->
      <!--width: 100px;-->
      <!--position: fixed;-->
      <!--right: 5px;-->
      <!--bottom: 30%;-->
      <!--overflow: hidden;-->
    <!--}-->
    <!--#float-survey .close{-->
      <!--padding: 5px 10px;-->
      <!--float: right;-->
      <!--cursor: pointer;-->
    <!--}-->
    <!--#float-survey a{-->
      <!--display: block;-->
      <!--overflow: hidden;-->
      <!--width: 100%;-->
    <!--}-->
    <!--#float-survey a img{-->
      <!--width: 100%;-->
    <!--}-->
  <!--</style>-->
</div>
</template>

<script>
import CommonFooter from '~/components/common-footer.vue'
import IconBlock from '~/components/menu/icon-block.vue'
import LoginStatus from '~/components/login-status.vue'
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
    search:{
      type: '164',
      q: '',
      sort:'',
      area: '',
      is4s: '',
      hot: '',
    },
    area: [],
    sort:[
      {name: '默认', value: ''},
      {name: '距离优先', value: 'distance'},
      {name: '好评优先', value: 'rating desc,distance asc'},
    ],
    maintainType:[
      {name: '全部', value: ''},
      {name: '4S店', value: 'yes'},
      {name: '维修厂', value: 'no'},
    ],
    hot:[
      {name: '默认', value: ''},
      {name: '宝马', value: '宝马'},
      {name: '奥迪', value: '奥迪'},
      {name: '迈巴赫', value: '迈巴赫'},
      {name: '保时捷', value: '保时捷'},
      {name: '玛莎拉蒂', value: '玛莎拉蒂'},
      {name: '年检', value: '年检'},
      {name: '保养', value: '保养'},
      {name: '车轮', value: '车轮'},
      {name: '发动机', value: '发动机'},
      {name: '汽车美容', value: '汽车美容'},
    ],
    iconBlockType: 0,
    iconBlockLeft: 128,
    iconBlockShow: false,
    showCdfFlag: true,

    questionList: [],
    cdfList: [],
    articleBanner: [],
    articleMiddle: {
      latest: [],
      hottest: [],
    },
    articleRight: [],
    error: null,
    isGetData: false
  }
}

export default {
  name: 'index',
  layout: 'layout-root',
  components: {
    CommonFooter,
    IconBlock,
    LoginStatus
  },
  mixins: [mixin],
  asyncData ({ app, error }) {
    if(process.client && thisData && thisData.isGetData) {
      console.log('cache')
      return thisData
    }
    // let getNews= (infoType, pageSize) => {
    //   return new Promise((resolve, reject) => {
    //     app.$axios.$post('/infopublic/home/all',{
    //       "infoType": infoType,
    //       "pageNo": 1,
    //       "pageSize": pageSize,
    //     }).then(res => {
    //       if (res.code === '0') {
    //         resolve(res.items)
    //       } else reject( res)
    //     },err => {
    //       reject(err)
    //     })
    //   })
    // }
    let articles= new Promise((resolve, reject) => {
      app.$axios.$get('/infopublic/home/all').then(res => {
        if (res.code === '0') {
          resolve( res.item)
        } else reject( res)
      },err => {
        reject(err)
      })
    })

    let questionList= new Promise((resolve, reject) => {
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
    let cdfList= new Promise((resolve, reject) => {
      app.$axios.$get('/expert/nostate/list' ).then(res => {
        if (res.code === '0') {
          resolve( res.items)
        } else reject( res)
      },err => {
        reject(err)
      })
    })

    // //文章banner
    // let article10281019= getNews('10281019', 5)
    //
    // //中间文章
    // let article10281013= getNews('10281013', 5)
    // let article10281020= getNews('10281020', 5)
    //
    // //右边三篇
    // let article10281006= getNews('10281006', 1)
    // let article10281016= getNews('10281016', 1)
    // let article10281017= getNews('10281017', 1)

    // return {
    //   questionList: [],
    //   cdfList: [],
    //   articleBanner: [],
    //   articleMiddle: {
    //     latest: [],
    //     hottest: [],
    //   },
    //   articleRight: []
    // }
    return Promise.all([
      questionList,
      cdfList,
      articles
      // article10281019,
      // article10281013,
      // article10281020,
      // article10281006,
      // article10281016,
      // article10281017,
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
        questionList: resQuestion,
        cdfList: resCdf,
        articleBanner: resArticle.left10281019.concat(resArticle.middle10281013),
        articleMiddle: {
          latest: latest,
          hottest: hottest,
        },
        articleRight: [resArticle.right10281006, resArticle.right10281016, resArticle.right10281017],
        isGetData: true
      }
    },(err)=>{

      console.log('is-err',err)
      // for(let key in err){
      //   console.log('err:',key)
      // }
      // for(let key in err.response){
      //   console.log('err.response:',key)
      // }

      let setData={
        questionList: [],
        cdfList: [],
        articleBanner: [],
        articleMiddle: {
          latest: [],
          hottest: [],
        },
        articleRight: [],
        height: 100
      }

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
    })
  },
  data () {
    return thisData
  },
  beforeMount(){
  },
  mounted(){
    // //问卷浮窗
    // $(" #float-survey .close").click(function () {
    //   $(" #float-survey").hide()
    // })

    // console.log('index.mounted', this.$route)
    let self= this
    if(!this.banners.length){
      this.getBanner()
    }
    if(!this.area.length){
      this.getArea()
    }

    $(".service .left ul li, .service .left .icon-block").hover(function () {
      self.iconBlockShow= true
      let type= parseInt($(this).attr('icon-block-type') ||0)
      if (type){
        self.iconBlockType= type
        switch (type % 3){
          case 1: self.iconBlockLeft= 128; break;
          case 2: self.iconBlockLeft= 260; break;
          case 0: self.iconBlockLeft= 390; break;
        }
      }
    })
    $(".service .left ul li, .service .left .icon-block").mouseleave(function () {
      self.iconBlockShow= false
    })

    // console.log('error: ', this.error? {
    //   status: this.error.status,
    //   statusText: this.error.statusText,
    //   url: this.error.url,
    //   headers: this.error.headers,
    //   data: this.error.data,
    //   response: this.error.response,
    // }: 'no error')


    this.error? console.error('error: ', this.error) : console.log('no-error')


  },
  methods:{
    query(){
      this.$router.push({path:'/service-map', query: this.search})
    },
    selectHot(val){
      if(val) this.search.q= val
    },
    getArea(){
      this.$axios.$get('/area/query').then( (res) => {
        this.area= res.items
      })
    },
    getBanner(){
      this.$axios.$post('/banner/query', {
        terminal: 'P'
      }).then( (res) => {
        this.banners= res.items
        this.showSwiper= true
      })
    },
    clickBanner(url, target){
      if(url){
        if(url=='/'){
          return
        }else{
          if(target== '_blank'){
            window.open(url, "_blank")
          }else if(url.indexOf('http')>=0){
            window.location.href= url
          }else{
            this.$router.push(url)
          }
        }
      }
    }
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

<style lang="less" scoped>
@import "./index.less";
@import "./red-index.less";
@heiagh: ~`(process.env.area!='shandong'? 100: 200)+ 'px'`;
.head{
  height: @heiagh;
}
</style>
<style lang="less">
.index{
  .swiper-pagination .swiper-pagination-bullet-active{
    background: white;
  }
  .swiper-button-prev, .swiper-button-next{
    /*background-size: 20px auto;*/
    /*background: none;*/
    background-color: rgba(0, 0, 0, 0.2);
    background-image: none;
    &:before{
      content: '';
      width: 20px;
      height: 20px;
      border-top: 2px solid rgba(255, 255, 255, 0.5);
      border-left: 2px solid rgba(255, 255, 255, 0.5);
      position: absolute;
      top: 12px;
      left: 10px;
      transform: rotate(-45deg);
    }
  }
  .swiper-button-next:before{
    transform: rotate(135deg);
    left: -2px;
  }
}
@import "./red-index.less";
</style>
