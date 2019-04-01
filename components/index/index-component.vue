<template>

<div class="index-content">
  <slot></slot>
  <slot name="header"></slot>
  <div class="banner" v-if="showSwiper">
    <swiper :options="swiperOption" ref="mySwiper" class="banner-swiper" >
      <!-- slides -->
      <swiper-slide v-for="(item, index) in banners" :key="index">
        <div class='dummy'></div>
        <ul class='content'>
          <a v-if="bannerLink(item).outside" class="banner-body" :href="bannerLink(item).to"
             :target="bannerLink(item).target" :style="'cursor:'+ bannerLink(item).cursor">
            <img :src="item.imageUrl"></a>
          <nuxt-link v-else tag="a" :to="bannerLink(item).to" class="banner-body" :target="bannerLink(item).target"
                     :style="'cursor:'+ bannerLink(item).cursor">
            <img :src="item.imageUrl"></nuxt-link>
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
        <swiper-slide v-for="(item, index) in information.articleBanner" :key="index">
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
          <nuxt-link tag="a" :to="'/gov-article/10281020/'+item.id" v-for="item in information.articleMiddle.latest" :key="'articleMiddle-latest'+item.id">{{item.title}}</nuxt-link>
        </ul>
      </div>
      <div class="best best2">
        <div class="left hot">最热</div>
        <ul>
          <!--<a v-for="item in articleMiddle.hottest" :key="'articleMiddle-hottest'+item.id">{{item.title}}</a>-->
          <nuxt-link v-for="item in information.articleMiddle.hottest" :key="'articleMiddle-hottest'+item.id" :to="'/gov-article/10281020/'+item.id">{{item.title}}</nuxt-link>
        </ul>
      </div>
    </div>
    <div class="block block3">
      <div class="title"><h1>行业监管</h1><nuxt-link :to="'/gov-article/10281001'">更多</nuxt-link></div>
      <ul>
        <nuxt-link class="article" v-for="item in information.articleRight" :key="'articleRight'+item.id" :to="'/gov-article/10281001/'+item.id">
          <h3>{{item.title}}</h3>
          <p style="-webkit-box-orient: vertical;">{{item.meno | FormatArticle(item.title)}}</p>
        </nuxt-link>
      </ul>
    </div>
  </div>
  <slot name="cooperator"></slot>
  <common-footer></common-footer>
</div>

</template>

<script>
import CommonFooter from '~/components/common-footer.vue'
export default {
  name: "index-component",
  props:['banners', 'swiperOption', 'showSwiper', 'information'],
  components: {CommonFooter},
  computed:{
    areaShanghai(){
      return process.env.config.areaName=='shanghai'
    },
    conf(){
      return process.env.config
    }
  },
  methods:{
    bannerLink(item){
      let obj={
        cursor: 'default',
        target: '',
        to: '/',
        outside: false
      }
      if(item.linkUrl.indexOf('http')>=0){
        obj.outside= true
      }
      if(item.linkUrl!='/'){
        obj.cursor= 'pointer'
        obj.to= item.linkUrl
        if(item.linkTarget== '_blank'){
          obj.target= '_blank'
        }
      }
      return obj
    },
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
      margin: 30px 10px 0;
      position: relative;
      background-color: white;
      padding: 20px 0;
      overflow: hidden;
      .block {
        float: left;
        overflow: hidden;
        .title{
          border-bottom: 1px solid #C4C4C4;
          margin-left: 10px;
          h1{
            color: #333333;
            font-size: 20px;
            line-height: 20px;
            padding-left: 10px;
            border-left: 3px solid #4A90E2;
            margin-bottom: 5px;
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
        width: 33%;
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
        width: 36%;
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
        width: 30%;
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
  }
</style>
<style lang="less">
  .index-content{

  }
</style>
