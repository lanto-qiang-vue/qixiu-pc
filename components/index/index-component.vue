<template>

<div class="index-content">
  <slot></slot>
  <div class="head">
    <div class="title">
      <img src="~@/assets/img/login_img/logo.png">
      <div>
        <h1>上海市机动车维修公共服务平台</h1>
        <span style="font-size: 16px">Shanghai Automobile Maintenance Public Service Platform</span>
      </div>
    </div>
    <div class="right">
      <span class="tel">400-663-8210</span>
      <a href="http://www.lantoev.com/android/DownLoad.html" target="_blank" class="app">
        <p>下载APP</p>
        <img src="~@/assets/img/index/qrcode_app.png">
      </a>
      <div class="wx">
        <p>关注微信</p>
        <img src="~@/assets/img/index/qrcode_weixin.jpg">
      </div>
      <nuxt-link tag="a" to="/article/guide">
        <img class="czzn" src="~@/assets/img/index/czzn.png" title="操作指南"></nuxt-link>
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
  <slot name="service"></slot>
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
  <slot name="cooperator"></slot>
</div>

</template>

<script>
import LoginStatus from '~/components/login-status.vue'
export default {
  name: "index-component",
  props:['banners', 'swiperOption', 'showSwiper', 'area', 'questionList', 'cdfList', 'articleBanner',
    'articleMiddle', 'articleRight'],
  components: { LoginStatus },
  computed:{
    areaShanghai(){
      return process.env.config.areaName=='shanghai'
    },
    conf(){
      return process.env.config
    }
  },
  methods:{
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
}
</script>

<style scoped lang="less">
  .index-content{
    text-align: left;
    width: 100%;
    max-width: 1200px;
    min-width: 900px;
    display: inline-block;
    position: relative;
    /*padding: 0 10px;*/
    .head{
      padding: 20px 10px;
      background-color: #6091b7;
      position: relative;
      .title{
        display: inline-block;
        img{
          width: 80px;
          float: left;
        }
        div {
          float: left;
          color: white;
          /*margin-top: 5px;*/
          h1{
            font-size: 32px;
            font-weight: 400;
          }
        }
      }
      .right{
        display: inline-block;
        float: right;
        font-size: 13px;
        *{
          color: white;
          display: inline-block;
          vertical-align: middle;
        }
        >*{
          margin-left: 10px;
          position: relative;
          overflow: visible;
        }
        .tel{
          padding-left: 18px;
          background: url('~@/assets/img/index/tel.png') no-repeat left center;
          background-size: 13px;
        }
        .app{
          padding-left: 15px;
          background: url('~@/assets/img/index/app.png') no-repeat left center;
        }
        .wx{
          padding-left: 20px;
          background: url('~@/assets/img/index/wechat.png') no-repeat left center;
          cursor: pointer;
        }
        .app img, .wx img{
          display: none;
          width: 75px;
          position: absolute;
          z-index: 9;
          left: 0;
        }
        .app:hover img, .wx:hover img{
          display: block;
        }
        .czzn{
          width: 40px;
        }
      }
      .login {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: white;
        font-size: 16px;
        >*{
          height: 40px;
          line-height: 40px;
          display: inline-block;
        }
        .nick-name{
          color: #d1d1d2;
        }
        .center{
          padding: 0 10px;
          color: white;
        }
        .center:hover{
          background-color: #0c6dbe;
        }
        .logout{
          margin-left: 10px;
        }
      }
    }
    .banner{
      .banner-swiper{
        .dummy{
          margin-top: 25%;
        }
        .content {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          .banner-body{
            width: 100%;
            height: 100%;
            div{
              margin: 20px 0;
              height: 20px;
              line-height: 20px;
              padding-left: 10px;
              border-left: 2px solid #999999;
              font-size: 16px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            img{

              width: 100%;
              height: 100%;
            }
          }
        }


      }
    }
    .news {
      margin-top: 30px;
      position: relative;
      background-color: white;
      opacity: .8;
      padding: 15px;
      overflow: hidden;
      .block {
        width: 33%;
        float: left;
        overflow: hidden;
        .title {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #999999;
          h1 {
            font-size: 20px;
            color: #1c6c93;
            font-weight: 400;
            display: inline-block;
          }
          a {
            font-size: 14px;
            color: #999999;
            float: right;
            margin-right: 5px;
          }
          a:after {
            display: inline-block;
            width: 7px;
            height: 7px;
            border-top: 2px solid #999999;
            border-right: 2px solid #999999;
            transform: rotate(45deg);
            content: '';
            margin-bottom: 2px;
          }
        }
      }
      .block1 {
        padding-right: 15px;
        .news-swiper{
          .swiper-button-prev, .swiper-button-next{
            margin-top: 0;
          }
          .dummy{
            /*margin-top: 80%;*/
          }
          .content {
            /*position: absolute;*/
            /*left: 0;*/
            /*right: 0;*/
            /*top: 0;*/
            /*bottom: 0;*/
            .news-swiper-body{
              width: 100%;
              height: 100%;
              div{
                margin: 20px 0;
                height: 20px;
                line-height: 20px;
                padding-left: 10px;
                border-left: 2px solid #999999;
                font-size: 16px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #333;
              }
              img{
                width: 100%;
                height: 240px;
              }
            }
          }
        }

      }
      .block2 {
        padding: 0 15px;
        .best {
          margin-top: 25px;
          height: 130px;
          position: relative;
          overflow: hidden;
          .left {
            width: 60px;
            height: 125px;
            line-height: 128px;
            font-size: 14px;
            padding-left: 25px;
            border-right: 1px solid #999999;
            position: absolute;
            background: url(~@/assets/img/index/new.png) no-repeat left center;
            background-size: 20px;
          }
          .hot {
            background: url(~@/assets/img/index/hot.png) no-repeat left center;
          }
          ul {
            padding-left: 70px;
            a {
              height: 35px;
              line-height: 25px;
              color: black;
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              display: block;
            }
            a:hover{
              color: #e86d1c;
            }
          }
        }
      }
      .block3 {
        padding-left: 15px;
        .article {
          margin-top: 20px;
          height: 80px;
          display: block;
          overflow: hidden;
          h3 {
            padding-left: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
            color: #1c6c93;
            position: relative;
          }
          h3:before {
            height: 0;
            width: 0;
            border-top: 5px solid transparent;
            border-left: 5px solid #1c6c93;
            border-bottom: 5px solid transparent;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto 0;
            content: "";
          }
          p {
            font-size: 12px;
            line-height: 20px;
            padding-left: 20px;
            color: #b5b6b6;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
             -webkit-line-clamp: 3;
          }
        }
      }
    }
    .news{
      margin-left: 10px;
      margin-right: 10px;
    }
  }
</style>
