<template>
  <div class="common-layout">
    <!--页头-->
    <header>
      <div class="top center">
        <nuxt-link tag="a" class="title" to="/">
            <img :src="'/img/logo-'+env.areaName+'.png'">
            <div style="text-align: left;">
                <h1 style="font-size: 32px">{{env.zhName}}机动车维修公共服务平台</h1>
                <span style="font-size: 16px">{{env.areaName.charAt(0).toUpperCase() + env.areaName.slice(1)}} Automobile Maintenance Public Service Platform</span>
            </div>
        </nuxt-link>

        <login-status :isIndex="false"></login-status>
    </div>
  </header>
  <!--导航菜单-->

          <Menu mode="horizontal" theme="primary" class="head-menu">
            <MenuItem name="head-menu-1" to="/">
                主页
            </MenuItem>
            <Submenu name="head-menu-2" v-if="isShanghai">
                <template slot="title">
                    服务中心
                </template>
                <ul class="ivu-menu-drop-list icon-menus">
                  <a class="ivu-menu-item" @click="$router.push('/center/my-car-record')"
                             @mouseover="iconBlockShow= false">电子健康档案系统</a>
                  <a class="ivu-menu-item" icon-block-type="1">车主服务中心</a>
                  <a class="ivu-menu-item" icon-block-type="2">汽修企业服务中心</a>
                  <a class="ivu-menu-item" icon-block-type="3">政务服务中心</a>
                  <a class="ivu-menu-item" icon-block-type="5">协会服务中心</a>
                  <a class="ivu-menu-item" icon-block-type="6">人才服务中心</a>
                  <a class="ivu-menu-item" icon-block-type="4">汽修相关产业服务中心</a>
                  <a class="ivu-menu-item" icon-block-type="8">商务服务中心</a>
                  <a class="ivu-menu-item" icon-block-type="7">公众监督服务中心</a>
                  <a class="ivu-menu-item" icon-block-type="9">大数据服务中心</a>
                  <icon-block :type="iconBlockType" :left="iconBlockLeft" :show="iconBlockShow"></icon-block>
                </ul>
            </Submenu>
            <MenuItem name="head-menu-3" to="/center/my-car-record">
                电子健康档案系统
            </MenuItem>
            <MenuItem name="head-menu-4" to="/cdf" v-if="isShanghai">
                车大夫门诊
            </MenuItem>
            <MenuItem name="head-menu-5" to="/visit-service" v-if="isShanghai">
              上门服务
            </MenuItem>
            <MenuItem name="head-menu-6" to="/service-map" v-if="isShanghai">
              预约维修
            </MenuItem>
            <MenuItem name="head-menu-7" to="/feedback">
              维修反馈
            </MenuItem>
          </Menu>

     <!--<nuxt />-->
     <!--<nuxt keep-alive/>-->
    <slot></slot>
    <!--页脚-->
    <common-footer></common-footer>
    <!--页脚end-->

  </div>
</template>

<script>
import CommonFooter from '~/components/common-footer.vue'
import LoginStatus from '~/components/login-status.vue'
import IconBlock from '~/components/menu/icon-block.vue'
import mixin from '~/components/page-mount-mixin.js'

export default {
  name: "common-layout",
  layout: 'layout-root',
  components: {
    CommonFooter,
    LoginStatus,
    IconBlock
  },
  mixins: [mixin],
  data () {
    return {
      iconBlockType: 0,
      iconBlockLeft: 170,
      iconBlockShow: false,
    }
  },
  computed:{
    isShanghai(){
      return process.env.config.areaName=='shanghai'
    },
    env(){
      return process.env.config
    },
  },
  mounted(){
    let self= this
    $(".icon-menus a, .icon-menus .icon-block").hover(function () {
      let type= parseInt($(this).attr('icon-block-type') ||0)
      if (type){
        self.iconBlockShow= true
        self.iconBlockType= type
      }
    })
    $(".icon-menus, .icon-menus .icon-block").mouseleave(function () {
      self.iconBlockShow= false
    })
  },
  methods:{

  }
}
</script>

<style scoped lang="less">
.common-layout{
  .top{
    width: 100%;
    height: 90px;
    border-bottom: 1px solid #f1f1f1;
    text-align: center;
    padding: 10px;
    /*overflow: hidden;*/
    background-color: white;
    position: relative;
    .login-status{
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .top .title{
    float: left;
    /*width: 100%;*/
  }
  .top .title img{
    padding: 6px;
    width: 70px;
    float: left;
  }
  .top .title div{
    float: left;
    color: #333333;
  }
  .top .title div h1{
    font-weight: 400;
    height: 45px;
    line-height: 45px;
  }


  .ivu-menu{
    min-width: 800px;
    height: 40px;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    .ivu-menu-submenu, .ivu-menu-item{
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      white-space: nowrap;
    }
  }
  .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item-selected{
    color: #fff;
    background-color: #2b85e4;
  }
  .icon-menus{
    overflow: visible;
    position: relative;
  }

}
</style>
<style lang="less">
.common-layout{
  .head-menu{
    z-index: 1000;
    .ivu-select-dropdown{
      overflow: visible;
    }
  }
  .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item{
    white-space: nowrap;
  }
}
</style>
