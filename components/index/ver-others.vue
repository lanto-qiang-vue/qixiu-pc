<template>
<div class="home">
  <index-component  class="index-component" :banners="banners" :swiperOption="swiperOption"
                   :showSwiper="showSwiper"  :information="information">
    <div class="head" slot="header">
      <div class="title">
        <img :src="'/img/logo-'+env.areaName+'.png'">
        <div>
          <h1>{{env.zhName}}机动车维修公共服务平台</h1>
          <span style="font-size: 16px">{{env.areaName.charAt(0).toUpperCase() + env.areaName.slice(1)}} Automobile Maintenance Public Service Platform</span>
        </div>
      </div>
      <div class="right">
        <span class="tel"><Icon type="ios-call" size="20"/>400-663-8210</span>
        <!--<a href="/download-app" target="_blank" class="app">-->
          <!--<p>下载APP</p>-->
          <!--<img src="~@/assets/img/index/qrcode_app.png">-->
        <!--</a>-->
        <!--<div class="wx">
          <i class="fa fa-weixin" style="font-size: 16px"></i>
          <p>关注微信</p>
          <img src="~@/assets/img/index/qrcode_weixin.jpg">
        </div>-->
      </div>

      <login-status :isIndex="true"></login-status>
      <!--<nuxt-link tag="a" to="/article/guide">
        <img class="czzn" src="~@/assets/img/index/czzn.png" title="操作指南"></nuxt-link>-->
    </div>
    <div class="service" slot="service">
      <div class="left">
        <div class="title"><h1>系统介绍</h1></div>
        <swiper :options="swiperOption" ref="mySwiper" class="system-swiper" v-if="showSwiper">
          <swiper-slide v-for="(item, index) in information.systemList" :key="index">
            <nuxt-link tag="div" :to="'/article/'+item.id" class='content'>
              <img :src="item.photo || '/img/default-car.png'">
              <p style="-webkit-box-orient: vertical;">{{editLength(item.content)| FormatArticle(editLength(item.title))}}<span>详情>></span></p>
            </nuxt-link>
          </swiper-slide>

          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>

        </swiper>
      </div>
      <div class="center">
        <div class="query">
          <div class="sub-title"><img src="~@/assets/img/index/glass.png"><div><h1>查选维修</h1><p>快速查找附近正规维修企业</p></div></div>
          <div class="select justify top justify-left">
            <!--<Select v-model="search.sort" size="large" placeholder="企业排序" clearable
                    transfer style="width:24%;">
              <Option v-for="(item, index) in sort" :value="item.value" :key="index">{{item.name}}</Option>
            </Select>-->
            <Select v-model="search.is4s" size="large" placeholder="企业类型" clearable
                    transfer style="width:24%;">
              <Option v-for="(item, index) in maintainType" :value="item.value" :key="index">{{item.name}}</Option>
            </Select>
            <!--<Select v-model="search.area" size="large" placeholder="企业区域" clearable-->
                    <!--transfer style="width:24%;">-->
              <!--<Option v-for="(item, index) in area" :value="item.code" :key="index">{{item.name}}</Option>-->
            <!--</Select>-->

            <area-select :change-on-select="true" :transfer="true" placeholder="企业区域" size="large"
                         @changeCascader="changeCascader" style="width:24%;display: inline-block;"
            ></area-select>
            <Select v-model="search.hot" size="large" placeholder="热门搜索" clearable
                    transfer style="width:24%;" ref="hot" @on-change='selectHot' >
              <Option v-for="(item, index) in hot" :value="item.value" :key="index">{{item.name}}</Option>
            </Select>
          </div>
          <div class="select justify">
            <Input v-model="search.q" size="large" placeholder="输入维修企业名称/地址"
                   @on-enter="query" @on-change="$refs.hot.clearSingleSelect()" style="width:74%;"/>
            <Button size="large" type="primary" style="width:24%;" @click="query">查询</Button></div>

        </div>
        <div class="button justify">
          <nuxt-link to="/center/my-car-record" class="b1">
            <img style="width: 27px" src="~@/assets/img/index/icon-维修记录.png"/><span>维修记录</span></nuxt-link>
          <!--<nuxt-link to="/center/my-car-record" class="b2">
            <img style="width: 28px" src="~@/assets/img/index/icon-维修点评.png"/><span>维修点评</span></nuxt-link>
          <a href="/file/tips.pdf" target="_blank" class="b3">
            <img style="width: 30px" src="~@/assets/img/index/icon-爱车小贴士.png"/><span>爱车小贴士</span></a>-->
        </div>
      </div>
      <div class="right">
        <div class="title"><h1>通知公告</h1><nuxt-link :to="'/gov-article/10281039'">更多</nuxt-link></div>
        <ul>
          <nuxt-link tag="a" :to="'/gov-article/10281039/'+item.id" v-for="(item, key ) in information.noticeList" :key="key">{{item.title}}</nuxt-link>

        </ul>
      </div>
    </div>
    <ul class="cooperator" slot="cooperator">

    </ul>
  </index-component>

  <!--<div ref="qrfloar" style="padding: 10px;position: fixed;right: 10px;bottom: 30%;background-color: #8ACFFF;color: #2E5F96;text-align: center;width: 120px;z-index: 1">
    <Icon type="ios-close-circle-outline" size="18" style="position: absolute;top: 5px;right: 5px;color: #2E5F96;cursor: pointer" @click="$refs.qrfloar.style.display='none'"/>
    <p>欢迎关注</p>
    <p>{{env.zhName}}汽修平台</p>
    <p>微信公众号</p>
    <img src="~@/assets/img/index/qrcode_weixin.jpg" style="margin-top: 10px;width: 100%">
  </div>-->
</div>
</template>

<script>
import IndexComponent from '~/components/index/index-component.vue'
import AreaSelect from '~/components/area-select.vue'
import LoginStatus from '~/components/login-status.vue'
import IndexMixin from '~/components/index/index-mixin.js'
export default {
  name: "ver-others",
  components: { IndexComponent, LoginStatus, AreaSelect},
  mixins: [IndexMixin],
  data(){
    return{
      systemSwiper: true,
    }
  },
  computed:{
    env(){
      return process.env.config
    },
  },
}
</script>

<style scoped lang="less">
.home{
  text-align: center;
  /*background: url('~@/assets/img/index/index-bg.jpg') no-repeat center center;*/
  /*background-size: 100% 100%;*/
  background:linear-gradient(180deg, #D9F3FC 0%, white 100%);
  overflow: hidden;
  .index-component{
    background-color: white;
  }
  .head{
    padding: 20px 10px;
    background-color: white;
    position: relative;
    .title{
      display: inline-block;
      img{
        width: 80px;
        float: left;
        padding: 6px;
      }
      div {
        float: left;
        color: #333333;
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
      line-height: 40px;
      *{
        color:  #333333;
        display: inline-block;
        vertical-align: middle;
      }
      >*{
        margin-left: 20px;
        position: relative;
        overflow: visible;
      }
      .tel{
        /*padding-left: 18px;*/
        /*background: url('~@/assets/img/index/tel.png') no-repeat left center;*/
        background-size: 13px;
      }
      .app{
        padding-left: 15px;
        background: url('~@/assets/img/index/app.png') no-repeat left center;
      }
      .wx{
        /*padding-left: 20px;*/
        /*background: url('~@/assets/img/index/wechat.png') no-repeat left center;*/
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
    }
    .login-status{
      position: absolute;
      bottom: 10px;
      right: 0;
    }
    .czzn{
      position: absolute;
      bottom: 18px;
      right: 10px;
      width: 22px;
    }
  }
  .service{
    margin: 30px 10px;
    /*padding: 0 15px;*/
    overflow: hidden;
    >div{
      float: left;
      overflow: hidden;
    }
    .title{
      border-bottom: 1px solid #C4C4C4;
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
    .left{
      width: 21%;
      .system-swiper{
        margin-top: 10px;
        .swiper-button-prev, .swiper-button-next{
          display: none;
        }
        .content{
          height: 200px;
          cursor: pointer;
          img{
            width: 100%;
            height: 130px;
          }
          p{
            margin-top: 5px;
            position: relative;
            color: #333333;
            font-size: 14px;
            text-indent: 2em;
            height: 60px;
            overflow: hidden;
            line-height: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            span{
              color: #FF0200;
              margin-left: 10px;
            }
          }
        }
        .swiper-pagination{
          top: 110px;
          bottom: auto;
        }
      }
    }
    .center{
      width: 48%;
      /*min-width: 450px;*/
      padding-left: 15px;
      .query{
        background-color: #FAFCFF;
        border: 1px solid #BCD4F0;
        border-radius: 2px;
        position: relative;
        margin-top: 30px;
        padding: 0 15px 15px;
        .sub-title{
          position: absolute;
          left: 30px;
          top: 0;
          transform: translateY(-50%);
          &:before{
            content: '';
            width: 80%;
            height: 3px;
            background-color: #FAFCFF;
            position: absolute;
            left: -5px;
            top: 50%;
            transform: translateY(-50%);
            z-index: -1;
          }
          >*{
            display: inline-block;
            vertical-align: top;
          }
          img{
            width: 80px;
            margin-right: 5px;
          }
          div{
            h1{
              font-size: 24px;
              color: #4A90E2;
            }
            p{
              font-size: 16px;
              color: #9FB2C8;
            }
          }
        }
      }
      .select{
        margin-top: 10px;
        height: 42px;
      }
      .select.top{
        margin-top: 40px;
      }
      .button{
        margin-top: 10px;
        height: 60px;
        a{
          display: inline-block;
          height: 40px;
          line-height: 40px;
          text-align: center;
          width: 100%;
          border-radius: 3px;
          >*{
            vertical-align: middle;
            color: white;
            font-weight: 600;
            font-size: 18px;
          }
          span{
            padding-left: 5px;
          }
        }
        .b1{
          background-color: #F47E72;
        }
        .b2{
          background-color: #F9AB74;
        }
        .b3{
          background-color: #5FA4F5;
        }
      }
    }
    .right{
      width: 30%;
      padding-left: 15px;
      ul{
        margin-top: 10px;
        height: 210px;
        overflow: hidden;
        font-size: 14px;
        color: #333333;
        a{
          display: block;
          line-height: 20px;
          min-height: 35px;
          padding-top: 7px;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-left: 10px;
          position: relative;
          /* white-space: nowrap; */
          &:after{
            content: '';
            width: 4px;
            height: 4px;
            background-color: #8C9699;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 100%;
          }
        }
      }
    }
  }
  .justify{
    text-align: justify;
    &:after{
      content: "";
      display: inline-block;
      width: 100%;
    }
  }
  .justify-left{
    text-align: left;
  }
}
</style>
<style lang="less">

</style>
