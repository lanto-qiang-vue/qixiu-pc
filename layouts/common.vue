<template>
  <div>
    <!--页头-->
    <header>

      <div class="top center">
        <a class="title" href="javascript:void(0);">
            <img src="../assets/img/login_img/logo.png">
            <div style="text-align: left;">
                <h1 style="font-size: 32px">上海市机动车维修公共服务平台</h1>
                <span style="font-size: 16px">Shanghai Automobile Maintenance Public Service Platform</span>
            </div>
        </a>
        <div class="login unLogin" style="font-size: 16px">
            <span style="color: black;">您好，欢迎光临本站！</span><router-link tag="a" to="/login">登录</router-link>|<a @click='testLogout'>注册</a>
        </div>
        <div class="login isLogin" style="display: none;font-size: 16px">
            <span class="nickName" style="color: black;"></span>
            <div class="switch">
                <a href="javascript:void(0);" class="loginButton show"></a>
                <a href="javascript:void(0);" class="goOwner">车主中心</a>
            </div>
            |<span onclick="logout()" style="cursor: pointer;margin-left: 10px">注销</span>
        </div>
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
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                <!--</MenuGroup>-->
                <!--<MenuGroup title="留存">-->
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                <!--</MenuGroup>-->
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

     <nuxt />
    <!--页脚-->
    <common-footer></common-footer>
    <!--页脚end-->

  </div>
</template>

<script>
  import CommonFooter from '~/components/common-footer.vue'
	export default {
		name: "common",
    components: {
      CommonFooter
    },
    data () {
        return {
    }
    },
    beforeMount(){
      let token = localStorage.getItem('ACCESSTOKEN')
      if(!this.$store.state.user.token && token){
        this.$store.commit('user/setToken', token)
        this.$store.commit('user/setMenu', JSON.parse(localStorage.getItem('ACCESSMENU')))
        this.$store.commit('user/setUser', JSON.parse(localStorage.getItem('USERINFO')))
      }
    },
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

.top .login{
    position: absolute;
    top: 25px;
    right: 10px;
    height: 40px;
    line-height: 40px;
    color: #4285f4;
}
.top .login a{
    padding: 0 10px;
    color: #4285f4;
}

.top .login .switch{
    display: inline-block;
    position: relative;
}
.top .login .switch a{
    display: none;
    position: absolute;
    top: 38px;
    background-color: #f5f5f5;
    color: #6091b7;
    z-index: 1;
    width: 100px;
    text-align: center;
}
.top .login .switch a.show{
    position: static;
    display: block;
    color: white;
    background-color: #6091b7;
}
.top .login .switch a:hover{
    background-color: #0c6dbe;
    color: white;
}
.top .login .switch:hover a{
    display: block;
}

/*.nav_top {*/

    /*width: 100%;*/
    /*overflow: initial;*/
    /*min-width: 800px;*/
    /*text-align: center;*/

/*}*/

/*.nav_in_top {*/
    /*margin: 0 auto;*/
    /*overflow: initial;*/
    /*max-width: 1200px;*/
    /*position: relative;*/
    /*display: inline-block;*/
    /*text-align: left;*/
/*}*/
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
