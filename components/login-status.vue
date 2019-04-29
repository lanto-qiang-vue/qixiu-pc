<template>
<div :class="['login-status', {'is-index': isIndex}, [theme||'']]">
  <div class="login unLogin" v-show="!isLogin">
    <nuxt-link tag="a" to="/login"><Icon type="md-power" size="20"  style="vertical-align: text-top"/>登录</nuxt-link>|
    <nuxt-link tag="a" to="/login">注册</nuxt-link>
  </div>
  <div class="login isLogin" v-if="isLogin">
    <span class="nick-name"><nuxt-link tag="a" to="/center/account-info">{{nickName}}</nuxt-link></span>
    <a @click="goMainPath" class="center" v-if="isIndex">{{mainRole.name}}中心</a>

    <Select :value="rule" class="rule-select" transfer size="small" placeholder="角色菜单" v-else
            @on-change="selectRule">
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
  props: ['isIndex', 'theme'],
  mixins: [mixin],
  computed:{

    nickName(){
      return this.$store.state.user.userInfo?this.$store.state.user.userInfo.nickname:''
    },
    mainRole(){
      return this.sortRole[0]
    }
  },
  watch:{
    nowAccessId(val){
      let nowRule= this.getNowRole(this.getRoleCodes(this.accessMenu))
      if(nowRule!= this.rule) this.$store.commit('user/setNowRule', nowRule)
    }
  },
  mounted(){
    if(this.isLogin){
      let nowRule= this.getNowRole(this.getRoleCodes(this.accessMenu))
      this.$store.commit('user/setNowRule', nowRule)
    }
  },
  methods:{
    goMainPath(){
      this.$store.commit('user/setNowRule',  this.mainRole.code)
      this.$router.push({path: this.mainRole.path})
    },
    selectRule(val){
      this.$store.commit('user/setNowRule',  val)
      let path= ''
      for(let i in this.sortRole){
        if(val==  this.sortRole[i].code){
          path= this.sortRole[i].path
        }
      }
      this.$router.push({path: path})
    },
    getRoleCodes(list){
      //匹配当前路径的菜单参数
      let menu= list|| [], rule=[]
      if(menu.length && this.nowAccessId){
        for(let i in menu){
          if(menu[i].uri== this.nowAccessId){
            if(menu[i].roleCodes && menu[i].roleCodes.length){
              rule= menu[i].roleCodes
            }
            break
          }else if(menu[i].children && menu[i].children.length ){
            rule= this.getRoleCodes(menu[i].children)
            if(rule.length) break
          }
        }
      }
      return rule
    },
    getNowRole(list){
      //判断菜单的角色
      let role= '', sortRole= this.sortRole, nowRole= this.rule;
      for(let i in list){
        if(nowRole== list[i]) {
          role= nowRole
          break
        }
        for(let j in sortRole){
          if(list[i].indexOf(sortRole[j].code)>=0){
            role= sortRole[j].code
            break
          }
        }
      }
      return role
    },
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
      /*color: white;*/
      /*background-color: #6091b7;*/
    }
    .center:hover{
      color: white;
      background-color: #0c6dbe;
    }
  }

}
.login-status.is-index.white{
  .login {
    color: white;
    .nick-name{
      color: #d1d1d2;
    }
    a{
      color: white;
    }
    .center{
      /*padding: 0 10px;*/
      color: white;
      background-color: #6091b7;
    }
    .center:hover{
      background-color: #0c6dbe;
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
