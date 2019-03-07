<template>
<div class="home">
  <index-component  class="index-component" :banners="banners" :swiperOption="swiperOption"
                   :showSwiper="showSwiper" :area="area" :questionList="questionList" :cdfList="cdfList"
                   :articleBanner="articleBanner" :articleMiddle="articleMiddle" :articleRight="articleRight">
    <div class="head" slot="header">
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
    <div class="service" slot="service">
      <div class="left">
        <div class="title"><h1>系统介绍</h1></div>
        <swiper :options="swiperOption" ref="mySwiper" class="system-swiper" v-if="showSwiper">
          <swiper-slide v-for="(item, index) in systemArticle" :key="index">
            <div class='content'>
              <img :src="item.photo || '/img/default-car.png'">
              <p style="-webkit-box-orient: vertical;">{{item.text}}<span>详情</span></p>
            </div>
          </swiper-slide>

          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>

        </swiper>
      </div>
      <div class="center">
        <div class="query">
          <div class="sub-title"><img src="~@/assets/img/index/glass.png"><div><h1>维修服务查询</h1><p>快速定位，为您提供满意的服务</p></div></div>
          <div class="select justify top">
            <Select v-model="search.sort" size="large" placeholder="企业排序" clearable
                    transfer style="width:24%;">
              <Option v-for="(item, index) in sort" :value="item.value" :key="index">{{item.name}}</Option>
            </Select>
            <Select v-model="search.is4s" size="large" placeholder="企业类型" clearable
                    transfer style="width:24%;">
              <Option v-for="(item, index) in maintainType" :value="item.value" :key="index">{{item.name}}</Option>
            </Select>
            <Select v-model="search.area" size="large" placeholder="企业区域" clearable
                    transfer style="width:24%;">
              <Option v-for="(item, index) in area" :value="item.code" :key="index">{{item.name}}</Option>
            </Select>
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
          <a class="b1"><img style="width: 27px" src="~@/assets/img/index/icon-维修记录.png"/><span>维修记录</span></a>
          <a class="b2"><img style="width: 28px" src="~@/assets/img/index/icon-维修点评.png"/><span>维修点评</span></a>
          <a class="b3"><img style="width: 30px" src="~@/assets/img/index/icon-爱车小贴士.png"/><span>爱车小贴士</span></a>
        </div>
      </div>
      <div class="right">
        <div class="title"><h1>通知公告</h1><nuxt-link :to="'/gov-article/10281001'">更多</nuxt-link></div>
        <ul>
          <nuxt-link tag="a" :to="'/gov-article/10281020/'+item.id" v-for="item in articleMiddle.latest" :key="'articleMiddle-latest'+item.id">{{item.title}}</nuxt-link>
          <nuxt-link tag="a" :to="'/gov-article/10281020/'+item.id" v-for="item in articleMiddle.latest" :key="'articleMiddle-latest'+Math.random()">{{item.title}}</nuxt-link>
        </ul>
      </div>
    </div>
    <ul class="cooperator" slot="cooperator">

    </ul>
  </index-component>
</div>
</template>

<script>
import IndexComponent from '~/components/index/index-component.vue'
import LoginStatus from '~/components/login-status.vue'
import IndexMixin from '~/components/index/index-mixin.js'
export default {
  name: "ver-others",
  components: { IndexComponent, LoginStatus},
  mixins: [IndexMixin],
  data(){
    return{
      systemSwiper: true,
      systemArticle: [
        {text: '管理职责管理职责上海市城市交通运输管理处负责具体实施本市机动车维修行业的日常管理和监督工作。1、负责管辖的机动车维修行业行政事项核查工作，负责审核企业经营许可事项的申请、变更、终止等相关工作，并建立行政许可档案；2、负责行业精神文明建设，做好管辖的机动车维修经营企业的诚信考核工作，建立诚信考核档案；指导和监督经营者建立质量信誉诚信档案；3、负责管辖的机动车维修行业的经营者聘用的持有从业资格证人员的审核和日'},
        {text: '管理职责管理职责上海市城市交通运输管理处负责具体实施本市机动车维修行业的日常管理和监督工作。1、负责管辖的机动车维修行业行政事项核查工作，负责审核企业经营许可事项的申请、变更、终止等相关工作，并建立行政许可档案；2、负责行业精神文明建设，做好管辖的机动车维修经营企业的诚信考核工作，建立诚信考核档案；指导和监督经营者建立质量信誉诚信档案；3、负责管辖的机动车维修行业的经营者聘用的持有从业资格证人员的审核和日'},
        {text: '管理职责管理职责上海市城市交通运输管理处负责具体实施本市机动车维修行业的日常管理和监督工作。1、负责管辖的机动车维修行业行政事项核查工作，负责审核企业经营许可事项的申请、变更、终止等相关工作，并建立行政许可档案；2、负责行业精神文明建设，做好管辖的机动车维修经营企业的诚信考核工作，建立诚信考核档案；指导和监督经营者建立质量信誉诚信档案；3、负责管辖的机动车维修行业的经营者聘用的持有从业资格证人员的审核和日'},
      ]
    }
  }
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
  .service{
    margin-top: 30px;
    margin-left: 10px;
    margin-right: 10px;
    /*padding: 0 15px;*/
    overflow: hidden;
    >div{
      float: left;
      overflow: hidden;
    }
    .title{
      border-bottom: 1px solid #C4C4C4;
      h1{
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
        height: 38px;
      }
      .select.top{
        margin-top: 40px;
      }
      .button{
        margin-top: 10px;
        height: 60px;
        a{
          display: inline-block;
          height: 60px;
          line-height: 60px;
          text-align: center;
          width: 32%;
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
          line-height: 35px;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-left: 10px;
          position: relative;
          white-space: nowrap;
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
}
</style>
<style lang="less">

</style>
