<template>
<div :class="['login-status', {'is-index': isIndex}]">
  <div class="login unLogin" v-show="!isLogin">
    <nuxt-link tag="a" to="/login"><Icon type="md-power" size="20"  style="vertical-align: text-top"/>登录</nuxt-link>|
    <nuxt-link tag="a" to="/login">注册</nuxt-link>
  </div>
  <div class="login isLogin" v-show="isLogin">
    <span class="nick-name"><nuxt-link tag="a" to="/center/account-info">{{nickName}}</nuxt-link></span>
    <!--<nuxt-link tag="a" :to="centerHref" class="center">{{roleName}}中心</nuxt-link>-->

    <Select v-model="rule" class="rule-select" transfer size="small">
      <Option v-for="(item, key) in sortRole" :value="item.code" :key="key">{{ item.name+'中心' }}</Option>
    </Select>

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
  data(){
    return {
      rule: ''
    }
  },
  computed:{
    isLogin(){
      return this.$store.state.user.token? true: false
    },
    nickName(){
      return this.$store.state.user.userInfo?this.$store.state.user.userInfo.nickname:''
    },
  },
  watch:{
    sortRole(val){
      this.rule= val[0].code
    }
  },
  methods:{
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
<style lang="less">
.login-status{
  .rule-select{
    display: inline-block;
    width: 100px;
    .ivu-select-selection{
      display: inline-block;
      width: 100%;
      vertical-align: middle;
    }
  }
}
</style>
