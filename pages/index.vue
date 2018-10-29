<template>
<div class="index">
<div class="content">
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
        <img src="../assets/img/index/qrcode_app.png" style="display: none;">
      </a>
      <div class="wx">
        <p>关注微信</p>
        <img src="../assets/img/index/qrcode_weixin.jpg" style="display: none;">
      </div>
      <a href="/czzn"><img class="czzn" src="../assets/img/index/czzn.png" title="操作指南"></a>
    </div>
    <div class="login unLogin" style="font-size: 16px; display: none;">
      <span style="color: #d1d1d2;">您好，欢迎光临本站！</span>
      <a href="/toLogin"><img src="../assets/img/index/login.png">登录</a>|
      <a href="/toLogin?type=register">注册</a>
    </div>
    <div class="login isLogin">
      <span class="nick-name">我是领导</span>
      <a href="/center/manageHome" class="center">管理中心</a>
      |<span onclick="logout()" class="logout">注销</span>
    </div>
  </div>
  <div class="banner" v-if="showSwiper">
    <swiper :options="swiperOption" ref="mySwiper" class="banner-swiper" >
      <!-- slides -->
      <swiper-slide v-for="(item, index) in banners" :key="index">
        <div class='dummy'></div>
        <div class='content'>
          <a :href="item.url" class="banner-body">
            <img :src="item.img">
          </a>
        </div>
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
        <li class="owner-center"><img style="width: 70px;" src="/img/menu-icon/车主服务中心.png"><p>车主服务中心</p></li>
        <li class="com-center"><img style="width: 50px" src="/img/menu-icon/汽修企业服务中心.png"><p>汽修企业</p><p>服务中心</p></li>
        <li class="gover-center"><img style="width: 40px;" src="/img/menu-icon/政务服务中心.png"><p>政务服务中心</p></li>
        <li class="relate-center"><img style="width: 70px;margin-top: 30px" src="/img/menu-icon/汽修相关产业服务中心.png"><p>汽修相关产业</p><p>服务中心</p></li>
        <li class="association-center"><img style="width: 70px" src="/img/menu-icon/协会服务中心.png"><p>协会服务中心</p></li>
        <li class="talent-center"><img style="width: 70px" src="/img/menu-icon/人才服务中心.png"><p>人才服务中心</p></li>
        <li class="supervise-center"><img style="width: 50px;margin-bottom: 5px" src="/img/menu-icon/公共监督服务中心.png"><p>公众监督</p></li>
        <li class="business-center"><img style="width: 50px" src="/img/menu-icon/商务服务中心.png"><p>商务服务中心</p></li>
        <li class="data-center"><img style="width: 70px" src="/img/menu-icon/大数据服务中心.png"><p>大数据</p><p>服务中心</p></li>
      </ul>
      <div class="record" onclick="goToPage('/center/repairInfo')"><img src="/img/menu-icon/电子健康档案系统.png">电子健康档案系统</div>
    </div>
    <div class="right">
      <div class="title"><div><h1>维修服务查询</h1><p>快速定位，为您提供满意的服务</p></div></div>
      <div class="query">
        <div><Input v-model="search.q" size="large" placeholder="输入维修企业名称/地址" /></div>
        <div class="select">
          <Select v-model="search.sort" size="large" placeholder="企业排序" style="width:19%;">
            <Option value="">全部</Option>
          </Select>
          <Select v-model="search.sort" size="large" placeholder="企业类型" style="width:19%;">
            <Option value="">全部</Option>
          </Select>
          <Select v-model="search.sort" size="large" placeholder="企业区域" style="width:19%;">
            <Option value="">全部</Option>
          </Select>
          <Select v-model="search.sort" size="large" placeholder="热门搜索" style="width:19%;">
            <Option value="">默认</Option>
          </Select>
          <Button size="large" type="primary" style="">查询</Button>
        </div>
      </div>
      <div class="msg">
        <div class="owner">
          <div class="tit">
            <img src="../assets/img/index/person.png">
            <p>车主</p>
            <p>服务</p>
            <p>中心</p>
          </div>
          <ul>
            <li onclick="goToPage('/center/applyList', false, [1,2,3,4,5,6,7])"><a>爱车档案</a></li>
            <li onclick="goToPage('/center/myOrders', false, [1,2,3,4,5,6,7])"><a>我的预约服务</a></li>
            <li onclick="goToPage('/center/myQuestions', false, [1,2,3,4,5,6,7])"><a>我的咨询</a></li>
            <li><a href="/statics/tips.pdf" target="_blank">爱车小贴士</a></li>
          </ul>
        </div>
        <div class="doctor">
          <div class="tit"><p>车大夫门诊</p></div>
          <ul class="tag">
            <li class="button active">问题集锦</li>
            <li class="button">专家团</li>
            <li class="cdf" style="background-color: #e86d1c;">
              <a href="/cdf" target="_blank">在线咨询</a>
            </li>
          </ul>
          <div class="doctor_content active" id="gather_content">
            <ul>

              <li onclick="goToPage('/cdf/answerQuestion?id=113', true)">大祥是不是猪</li>

              <li onclick="goToPage('/cdf/answerQuestion?id=94', true)">测试123765</li>

              <li onclick="goToPage('/cdf/answerQuestion?id=93', true)">好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好</li>

              <li onclick="goToPage('/cdf/answerQuestion?id=92', true)">好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好</li>

              <li onclick="goToPage('/cdf/answerQuestion?id=91', true)">好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好好GVvVB好不好</li>

            </ul>
            <a onclick="goToPage('/cdf', true)" class="list_button">浏览更多</a>
          </div>








          <div class="doctor_content" id="professor_content">
            <ul>

              <li onclick="goToPage('/cdf/expert/1', true)">洪永楠</li>

              <li onclick="goToPage('/cdf/expert/2', true)">李丕毅</li>

              <li onclick="goToPage('/cdf/expert/7', true)">陈洪山</li>

              <li onclick="goToPage('/cdf/expert/8', true)">冯骅</li>

              <li onclick="goToPage('/cdf/expert/16', true)">黄晓懿</li>

            </ul>
            <a onclick="goToPage('/specialist', true)" class="list_button">浏览更多</a>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="news">
    <div class="block block1" v-if="showSwiper">
      <div class="title"><h1>新闻动态</h1><a href="/government/10281019">更多</a></div>
      <swiper :options="swiperOption" ref="mySwiper" class="news-swiper" >
        <!-- slides -->
        <swiper-slide v-for="(item, index) in banners" :key="index">
          <div class='dummy'></div>
          <div class='content'>
            <a :href="item.url" class="news-swiper-body">
              <div>{{item.img}}</div>
              <img :src="item.img">
            </a>
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

      <div class="title"><h1>管理动态</h1><a href="/government/10281020">更多</a></div>

      <div class="best best1">
        <div class="left">最新</div>
        <ul><a href="/government/detail/185">121test</a><a href="/government/detail/146">市汽修协会工作动态</a><a href="/government/detail/91">上海市汽车维修行业协会近期工作总结</a><a href="/government/detail/160">2017年工作总结和2018年工作意见</a><a href="/government/detail/166">加强与保险行业信息共享 促进事故车维修服务质量</a><a href="/government/detail/162">2018年汽车维修质量服务月活动情况总结</a><a href="/government/detail/169">道路运输车辆综合性能检验报告单申领办事指南</a></ul>
      </div>
      <div class="best best2">
        <div class="left hot">最热</div>
        <ul><a href="/government/detail/169">道路运输车辆综合性能检验报告单申领办事指南</a><a href="/government/detail/160">2017年工作总结和2018年工作意见</a><a href="/government/detail/185">121test</a><a href="/government/detail/146">市汽修协会工作动态</a><a href="/government/detail/91">上海市汽车维修行业协会近期工作总结</a><a href="/government/detail/162">2018年汽车维修质量服务月活动情况总结</a><a href="/government/detail/166">加强与保险行业信息共享 促进事故车维修服务质量</a></ul>
      </div>
    </div>
    <div class="block block3">

      <div class="title"><h1>行业监管</h1><a href="/government/10281001">更多</a></div>

      <a class="article article1" href="/government/detail/121">
        <h3>管理职责</h3>
        <p>



          管理职责





          上海市城市交通运输管理处负责具体实施本市机动车维修行业的日常管理和监督工作。


          1、负责管辖的机动车维修行业行政事项核查工作，负责审核企业经营许可事项的申请、变更、终止等相关工作，并建立行政许可档案；


          2、负责行业精神文明建设，做好管辖的机动车维修经营企业的诚信考核工作，建立诚信考核档案；指导和监督经营者建立质量信誉诚信档案；




        </p>
      </a>
      <a class="article article2" href="/government/detail/164">
        <h3>2017年度全市机动车维修企业诚信考核等级</h3>
        <p>1、负责管辖的机动车维修行业行政事项核查工作，负责审核企业经营许可事项的申请、变更、终止等相关工作，并建立行政许可档案；


          2、负责行业精神文明建设，做好管辖的机动车维修经营企业的诚信考核工作，建立诚信考核档案；指导和监督经营者建立质量信誉诚信档案；

        </p>
      </a>
      <a class="article article3" href="/government/detail/138">
        <h3>2017年机动车维修企业整改通报</h3>
        <p>1、负责管辖的机动车维修行业行政事项核查工作，负责审核企业经营许可事项的申请、变更、终止等相关工作，并建立行政许可档案；


          2、负责行业精神文明建设，做好管辖的机动车维修经营企业的诚信考核工作，建立诚信考核档案；指导和监督经营者建立质量信誉诚信档案；

        </p>
      </a>
    </div>
  </div>
  <ul class="cooperator">
    <li><a class="guide">指导部门：上海市城市交通运输管理处</a></li>
    <li><a class="hold">主办单位：上海市汽车维修行业协会</a></li>
    <li><a class="us" href="/aboutUs">承办单位：上海蓝速汽车技术有限公司</a></li>
  </ul>
</div>
<common-footer></common-footer>
</div>
</template>

<script>
import CommonFooter from '~/components/common-footer.vue'
export default {
  components: {
    CommonFooter
  },
  data () {
    return {
      banners:[
        {url: '/', img: '/img/banner/banner-4.jpg'},
        {url: '/', img: '/img/banner/banner-5.jpg'},
        {url: '/', img: '/img/banner/banner-6.jpg'},
        {url: '/', img: '/img/banner/banner-7.jpg'},
        {url: '/', img: '/img/banner/banner-8.jpg'},
      ],
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
        q: '',

      }
    }
  },
  beforeMount(){
  },
  mounted(){
    this.showSwiper= true
  }
}
</script>

<style lang="less" scoped>
.index{
  text-align: center;
  background: url('../assets/img/index/index-bg.jpg') no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
  a{
    color: white;
  }
  >.content{
    text-align: left;
    width: 100%;
    max-width: 1200px;
    min-width: 900px;
    display: inline-block;
    position: relative;
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
          }
          .tel{
            padding-left: 18px;
            background: url('../assets/img/index/tel.png') no-repeat left center;
            background-size: 13px;
          }
          .app{
            padding-left: 15px;
            background: url('../assets/img/index/app.png') no-repeat left center;
          }
          .wx{
            padding-left: 20px;
            background: url('../assets/img/index/wechat.png') no-repeat left center;
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
    .service{
      margin-top: 30px;
      position: relative;
      overflow: hidden;
      .left {
        width: 400px;
        float: left;
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
            margin-bottom: 5px;
            border-radius: 10px;
            overflow: hidden;
            font-size: 16px;
            cursor: pointer;
            display: inline-block;
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
            background: url(../assets/img/index/glass.png) no-repeat left center;
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
              background: url(../assets/img/index/vertical-line.png) no-repeat 10px center;
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
                background: url(../assets/img/index/work-box.png) no-repeat left center;
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
              display: none;
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
            .doctor_content.active {
              display: block;
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
          border-bottom: 2px solid #1c6c93;
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
            margin-bottom: 1px;
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
            margin-top: 80%;
          }
          .content {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
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
            padding-left: 20px;
            border-right: 1px solid #999999;
            position: absolute;
            background: url(../assets/img/index/new.png) no-repeat left center;
            background-size: 20px;
          }
          .hot {
            background: url(../assets/img/index/hot.png) no-repeat left center;
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
            -webkit-box-orient: vertical;
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
        }
        .guide{
          padding-left: 25px;
          background: url(../assets/img/index/logo_guide.png) no-repeat left center;
        }
        .hold{
          padding-left: 80px;
          background: url(../assets/img/index/logo_hold.png) no-repeat left center;
        }
        .us{
          padding-left: 25px;
          background: url(../assets/img/login_img/logo.png) no-repeat left center;
          background-size: 22px auto;
        }
      }
    }
  }
}
</style>
<style lang="less">
.index{
  .swiper-pagination .swiper-pagination-bullet-active{
    background: white;
  }
  .swiper-button-prev, .swiper-button-next{
    background-size: 20px auto;
  }
}
</style>
