<template>
<div class="login-status">
  <div class="login unLogin" v-if="!isLogin">
    <span style="color: #d1d1d2;">您好，欢迎光临本站！</span>
    <nuxt-link tag="a" to="/login"><img src="../assets/img/index/login.png">登录</nuxt-link>|
    <nuxt-link tag="a" to="/login">注册</nuxt-link>
  </div>
  <div class="login isLogin" v-if="isLogin">
    <span class="nick-name">{{nickName}}</span>
    <a href="/center/manageHome" class="center">{{}}中心</a>
    |<span @click="logout" class="logout">注销</span>
  </div>
</div>
</template>

<script>
	export default {
		name: "login-status",
    computed:{
		  isLogin(){
		    return this.$store.state.user.token? true: false
      },
      nickName(){
        return this.$store.state.user.userInfo.nickname
      },
      role(){
        let sortRoles= this.sortRole(), roleName= ''
        for(let i in sortRoles){
          roleName= sortRoles[i].name
        }
        return roleName
      },
      centerHref(){

      }
    },
    methods:{
      sortRole(){
        let roles= this.$store.state.user.userInfo.roles, sortRoles=[]
        let order=['chezhu','weixiuqiye','zhuanjia','xiehui','guanlibumen','yunying','admin']
        for (let i in order){
          for (let j in roles){
            if(order[i]== roles[j].code){
              sortRoles.push(roles[j])
            }
          }
        }
        return sortRoles
      },
      logout(){

      }
    }
	}
</script>

<style scoped lang="less">
.login-status{
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

</style>
