<template>
<div :class="['login-status', {'is-index': isIndex}]">
  <div class="login unLogin" v-show="!isLogin">
    <span class="nick-name">您好，欢迎光临本站！</span>
    <nuxt-link tag="a" to="/login">
      <!--<img src="../assets/img/index/login.png" v-show="isIndex">-->
      <Icon type="md-power" size="20" v-show="isIndex" style="vertical-align: text-top"/>
      登录</nuxt-link>|
    <nuxt-link tag="a" to="/login">注册</nuxt-link>
  </div>
  <div class="login isLogin" v-show="isLogin">
    <span class="nick-name">{{nickName}}</span>
    <nuxt-link tag="a" :to="centerHref" class="center">{{roleName}}中心</nuxt-link>
    |<a @click="logout" class="logout">注销</a>
  </div>
</div>
</template>

<script>
import mixin from '~/components/home-path-mixin.js'
export default {
  name: "login-status",
  props: ['isIndex'],
  mixins: [mixin],
  computed:{
    isLogin(){
      return this.$store.state.user.token? true: false
    },
    nickName(){
      return this.$store.state.user.userInfo?this.$store.state.user.userInfo.nickname:''
    },
    // roleName(){
    //   let sortRoles= this.sortRole(true), roleName= ''
    //   for(let i in sortRoles){
    //     roleName= sortRoles[i].name
    //   }
    //   return roleName
    // },
    // centerHref(){
    //   let sortRoles= this.sortRole(false)
    //   return sortRoles.length? sortRoles[sortRoles.length-1].path: ''
    // }
  },
  methods:{
    // sortRole(flag){
    //   let roles= this.$store.state.user.userInfo.roles, sortRoles=[]
    //   let order=[
    //     {code:'chezhu', path: '/center/my-car-record'},
    //     {code:'weixiuqiye', path: '/center/company-home'},
    //     {code:'zhuanjia', path: '/center/answer-questions'},
    //     {code:'xiehui', path: '/center/account-info'},
    //     {code:'guanlibumen', path: '/center/gov-home'},
    //     {code:'yunying', path: '/center'},
    //     {code:'admin', path: '/center'},
    //   ]
    //   for (let i in order){
    //     for (let j in roles){
    //       if(order[i].code== roles[j].code){
    //         flag? sortRoles.push(roles[j]) :sortRoles.push(order[i])
    //       }
    //     }
    //   }
    //   return sortRoles
    // },
    logout(){
      this.$Modal.confirm({
        title: '确定退出登录吗？',
        content:'',
        onOk: ()=> {
          this.$axios.$get('/user/useraccount/logout').then(res => {
            localStorage.removeItem('ACCESSTOKEN')
            localStorage.removeItem('ACCESSMENU')
            localStorage.removeItem('USERINFO')
            this.$store.commit('user/setToken', '')
            this.$store.commit('user/setMenu', '')
            this.$store.commit('user/setUser', '')
            this.$router.push({
              path: '/login',
              // query: { redirect: route.fullPath }
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-status{
  height: 40px;
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  .login {
    font-size: 16px;
    color: #2d8cf0;
    >*{
      height: 40px;
      line-height: 40px;
      display: inline-block;
      vertical-align: middle;
    }
    a{
      padding: 0 10px;
      img{
        width: 18px;
        height: 18px;
        vertical-align: text-bottom;
      }
    }
    .nick-name{
      color: black;
    }
    .center{
      padding: 0 10px;
      color: white;
      background-color: #6091b7;
    }
    .center:hover{
      background-color: #0c6dbe;
    }
  }
}
.login-status.is-index{
  top: auto;
  bottom: 10px;
  .login {
    color: white;
    .nick-name{
      color: #d1d1d2;
    }
    a{
      color: white;
    }
  }
}

</style>
