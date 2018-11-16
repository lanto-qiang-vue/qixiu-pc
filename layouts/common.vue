<template>
  <div>
    <!--页头-->
    <header>
      <div class="top center">
        <nuxt-link tag="a" class="title" to="/">
            <img src="../assets/img/login_img/logo.png">
            <div style="text-align: left;">
                <h1 style="font-size: 32px">上海市机动车维修公共服务平台</h1>
                <span style="font-size: 16px">Shanghai Automobile Maintenance Public Service Platform</span>
            </div>
        </nuxt-link>

        <login-status :isIndex="false"></login-status>
    </div>
  </header>
  <!--导航菜单-->
  <!--<div class="nav_top">-->
      <!--<div class="nav_in_top">-->
          <Menu mode="horizontal" theme="primary" active-name="1" style="z-index: 1000">
            <MenuItem name="1">
                首页
            </MenuItem>
            <Submenu name="2">
                <template slot="title">
                    服务中心
                </template>
                <!--<MenuGroup title="使用">-->
                    <MenuItem name="3-1" to="/gov-article">政务文章</MenuItem>
                    <MenuItem name="3-2" to="/guild-article">协会文章</MenuItem>
                    <MenuItem name="3-3" to="/article">单篇文章</MenuItem>

            </Submenu>
            <MenuItem name="3">
                电子健康档案系统
            </MenuItem>
            <MenuItem name="4">
                车大夫门诊
            </MenuItem>
            <MenuItem name="5">
                上门服务
            </MenuItem>
            <MenuItem name="6">
                预约维修
            </MenuItem>
            <MenuItem name="7">
                维修反馈
            </MenuItem>
          </Menu>
      <!--</div>-->
  <!--</div>-->

     <nuxt keep-alive/>
    <!--页脚-->
    <common-footer></common-footer>
    <!--页脚end-->

  </div>
</template>

<script>
import CommonFooter from '~/components/common-footer.vue'
import LoginStatus from '~/components/login-status.vue'
import mixin from '~/static/page-mount-mixin.js'
export default {
  name: "common",
  components: {
    CommonFooter,
    LoginStatus
  },
  mixins: [mixin],
  data () {
    return {
    }
  },
  // beforeMount(){

  // },
  methods:{
      testLogout(){

          this.$axios.get('/user/useraccount/logout')
          .then(function (response) {
              if(response.data.code==='0'){

          this.$router.push('/login')
        }
          })
      }
  }


}
</script>

<style scoped lang="less">

.top{
    width: 100%;
    height: 90px;
    border-bottom: 1px solid #f1f1f1;
    text-align: center;
    padding: 10px;
    /*overflow: hidden;*/
    background-color: white;
    position: relative;
}

.top .title{
    float: left;
    /*width: 100%;*/
}
.top .title img{
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
}
.ivu-menu li{
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
}
.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item-selected{
  color: #fff;
  background-color: #2b85e4;
}


</style>
