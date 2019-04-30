<template>
<div class="home">
  <index-component :banners="banners" :swiperOption="swiperOption" :showSwiper="showSwiper"
                   :information="information">
    <!--<img class="new-text temp" src="~@/assets/img/temp-red/new-text.png"/>-->
    <!--<img class="lantern-left temp" src="~@/assets/img/temp-red/lantern01.png"/>-->
    <!--<img class="lantern-right  temp" src="~@/assets/img/temp-red/lantern02.png"/>-->
    <nuxt-link tag="div" class="float-icon" to="/center/staff-query">
      <Icon type="ios-people" size="40" style="line-height: 50px"/>
      <p>企业员工信息</p>
    </nuxt-link>




    <div class="head" slot="header">
      <div class="title">
        <img src="/img/logo-shanghai.png">
        <div>
          <h1>上海市机动车维修公共服务平台</h1>
          <span style="font-size: 16px">Shanghai Automobile Maintenance Public Service Platform</span>
        </div>
      </div>
      <div class="right">
        <span class="tel">400-663-8210</span>
        <a href="/download-app" target="_blank" class="app">
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

      <login-status :isIndex="true" theme="white"></login-status>



    </div>

    <div class="service" slot="service">
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
              <img src="~@/assets/img/index/person.png">
              <!--<img class="temp" src="~@/assets/img/temp-red/icon-service.png">-->
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
                <nuxt-link tag="li" v-for="item in information.questionList" :key="'questionList-'+item.id" :to="'/cdf/'+item.id">{{item.content}}</nuxt-link>
              </ul>
              <nuxt-link class="list_button" tag="a" :to="'/cdf'">浏览更多</nuxt-link>
            </div>

            <div class="doctor_content" id="professor_content" v-show="!showCdfFlag">
              <ul>
                <!--<li v-for="item in cdfList" :key="'cdfList-'+item.id">{{item.name}}</li>-->
                <nuxt-link tag="li" v-for="item in information.cdfList" :key="'cdfList-'+item.id" :to="'/cdf/expert/'+item.id">{{item.name}}</nuxt-link>
              </ul>
              <nuxt-link tag="a" :to="'/article/specialist'" class="list_button">浏览更多</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>
    <ul class="cooperator" slot="cooperator">
      <li><a class="guide" style="cursor:Default;">指导部门：上海市城市交通运输管理处</a></li>
      <li><a class="hold" style="cursor:Default;">主办单位：上海市汽车维修行业协会</a></li>
      <li><a class="us" href="/partner">承办单位：上海蓝速汽车技术有限公司</a></li>
    </ul>
  </index-component>
</div>
</template>

<script>
import LoginStatus from '~/components/login-status.vue'
import IndexComponent from '~/components/index/index-component.vue'
import IconBlock from '~/components/menu/icon-block.vue'
import IndexMixin from '~/components/index/index-mixin.js'
export default {
  name: "ver-shanghai",
  components: { IndexComponent, IconBlock, LoginStatus},
  mixins: [IndexMixin],
  data(){
    return{
      iconBlockType: 0,
      iconBlockLeft: 128,
      iconBlockShow: false,
      showCdfFlag: true,
      area: [],
      timer:null
    }
  },
  mounted(){
    let self= this




    // $('body').on('mouseover', ".service .left ul li, .service .left .icon-block")
    $(".service .left ul li, .service .left .icon-block").hover( function() {
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

    this.getArea()
  },
  methods:{
    getArea(){
      this.$axios.$get('/area/query').then( (res) => {
        this.area= res.items
      })
    },
  }
}
</script>

<style lang="less" scoped>
  .home{
    text-align: center;
    background: url('~@/assets/img/index/index-bg.jpg') no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
    .head{
      padding: 20px 10px;
      background-color: #6091b7;
      position: relative;
      .title{
        display: inline-block;
        img{
          padding: 6px;
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
      .login-status{
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }
  }
.float-icon{
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 60px;
    right: 20px;
    z-index: 1000;
    color: white;
    text-align: center;
    cursor: pointer;
    background-color: orangered;
    border-radius: 100%;
    p{
      color: orangered;
    }
}
.service{
  margin-top: 30px;
  position: relative;
  overflow: visible;
  .left {
    width: 400px;
    /*float: left;*/
    position: relative;
    ul{
      text-align: justify;
      height: 420px;
      li{
        width: 32%;
        height: 130px;
        line-height: 22px;
        text-align: center;
        background-color: #5f90b7;
        color: white;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        /*overflow: hidden;*/
        overflow: visible;
        font-size: 16px;
        cursor: pointer;
        display: inline-block;
        position: relative;
        vertical-align: top;
        img{
          margin-top: 15px;
          margin-bottom: 5px;
        }
      }
    }
    ul:after{
      content:"";
      display:inline-block;
      width:100%;
    }
    .record {
      background-color: #e86d1c;
      border-radius: 10px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: white;
      font-size: 20px;
      cursor: pointer;
      img{
        width: 25px;
        margin-right: 10px;
        vertical-align: middle;
      }
    }
  }
  .right {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin-left: 400px;
    padding-left: 20px;
    .title {
      text-align: center;
      div {
        display: inline-block;
        padding-left: 155px;
        background: url(~@/assets/img/index/glass.png) no-repeat left center;
        background-size: 130px;
        h1 {
          font-size: 42px;
          color: #e76d1c;
        }
        p {
          font-size: 18px;
          color: #787777;
        }
      }
    }
    .query {
      background-color: #c3c4c5;
      padding: 10px 20px;
      margin-top: 10px;
      .select{
        margin-top: 10px;
        text-align: justify;
        height: 40px;
        button{
          width: 20%; background-color: #e86d1c; border-color: #e86d1c
        }
      }
      .select:after{
        content:"";
        display:inline-block;
        width:100%;
      }
    }
    .msg {
      background-color: white;
      padding: 10px 20px;
      margin-top: 10px;
      height: 245px;
      position: relative;
      .owner {
        width: 50%;
        float: left;
        padding: 10px 0;
        .tit {
          width: 40%;
          float: left;
          text-align: center;
          img {
            width: 80px;
            margin-bottom: 15px;
          }
          p {
            font-size: 26px;
            line-height: 28px;
            font-weight: 400;
            color: #e86d1c;
          }
        }
        ul {
          width: 60%;
          height: 200px;
          float: left;
          padding-left: 20px;
          background: url(~@/assets/img/index/vertical-line.png) no-repeat 10px center;
          background-size: 10px 80%;
          li {
            height: 40px;
            line-height: 40px;
            color: white;
            background-color: #b5b6b6;
            text-align: center;
            border-radius: 10px;
            font-size: 18px;
            margin-top: 8px;
            cursor: pointer;
          }
        }
      }
      .doctor {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin-left: 50%;
        padding: 10px;
        height: 245px;
        .tit {
          text-align: center;
          p {
            font-size: 26px;
            height: 50px;
            line-height: 50px;
            font-weight: 400;
            color: #e86d1c;
            display: inline-block;
            padding-left: 70px;
            background: url(~@/assets/img/index/work-box.png) no-repeat left center;
            background-size: 60px;
          }
        }
        .tag {
          margin-top: 5px;
          text-align: justify;
          height: 30px;
          padding: 0 15px;
          li {
            display: inline-block;
            width: 31%;
            text-align: center;
            background-color: #b4b5b6;
            color: white;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            border-radius: 10px;
            cursor: pointer;
          }
          .cdf{
            background-color: #e86d1c;
          }
        }
        .tag:after{
          content: "";
          display: inline-block;
          width: 100%;
        }
        .doctor_content{
          /*display: none;*/
          height: 150px;
          position: relative;
          overflow: hidden;
          ul {
            height: 125px;
            overflow: hidden;
            li {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              padding-left: 10px;
              height: 25px;
              line-height: 25px;
              font-size: 12px;
              cursor: pointer;
              width: 100%;
              position: relative;
            }
            li:before{
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              width: 0;
              height: 0;
              border-width: 4px;
              border-style: solid;
              border-color:  transparent transparent transparent #b4b5b6;
            }
            li:hover{
              color: #e86d1c;
            }
            li:hover:before{
              border-color:  transparent transparent transparent #e86d1c;
            }
          }
          .list_button{
            display: block;
            position: absolute;
            width: 70px;
            text-align: center;
            margin: 0 auto;
            bottom: 5px;
            left: 0;
            right: 0;
            padding: 1px 0;
            font-size: 12px;
            color: #070707;
            border: 1px solid #070707;
            border-radius: 5px;
            cursor: pointer;
          }
          .list_button:hover{
            color: #e86d1c;
            border-color: #e86d1c;
          }
        }
        /*.doctor_content.active {*/
        /*display: block;*/
        /*}*/
      }
    }
  }
}
.cooperator{
  font-size: 14px;
  margin: 30px 0;
  background-color: white;
  overflow: hidden;
  padding: 20px 0;
  li {
    width: 33%;
    float: left;
    text-align: center;
    a{
      color: black;
      line-height: 24px;
      display: inline-block;
      white-space: nowrap;
    }
    .guide{
      padding-left: 25px;
      background: url(~@/assets/img/index/logo_guide.png) no-repeat left center;
    }
    .hold{
      padding-left: 80px;
      background: url(~@/assets/img/index/logo_hold.png) no-repeat left center;
    }
    .us{
      padding-left: 25px;
      background: url(/img/logo-shanghai.png) no-repeat left center;
      background-size: 22px auto;
    }
  }
}
.service, .cooperator{
  margin-left: 10px;
  margin-right: 10px;
}
  /*@import "./index-red.less";*/
</style>
<style lang="less">

</style>

