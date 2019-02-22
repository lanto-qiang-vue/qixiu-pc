<template>
<basic-container>
  <Layout style="flex-direction: row;">
    <Sider hide-trigger class="common-sider">
      <side-menu v-show="showMenu" :accordion="false" ref="sideMenu" :active-name="$route.path" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList" :openNames="setOpenedNames">
        <div class="logo-con">
          <p>{{pageName || roleName+'中心'}}</p>
        </div>
      </side-menu>
    </Sider>
    <Content class="common-content">
      <div class="sub-title">
        <my-bread-crumb :name="pageName"></my-bread-crumb>
      </div>

      <nuxt-child v-if="keepAlive" keep-alive/>
      <nuxt-child v-else/>
    </Content>
  </Layout>
  <butt-joint :type="showType" :dataInit="dataInit" :stage="1"></butt-joint>
</basic-container>
</template>

<script>
import BasicContainer from '~/components/basic-container.vue'
import SideMenu from './menu/side-menu.vue'
import MyBreadCrumb from '~/components/bread-crumb.vue'
import buttJoint from '~/components/butt-joint.vue'
import {  getMenuByRouter2 } from '@/static/util'
import mixin from '~/components/home-path-mixin.js'
import router from '@/static/router'

export default {
  name: "common-main",
  layout: "layout-root",
  // layout: 'common',
  components: {
    BasicContainer,
    SideMenu,
    MyBreadCrumb,
    buttJoint
  },
  mixins: [mixin],
  props: ['paraMenu', 'pageName'],
  fetch ({ store ,isClient}) {

  },
  data () {
    return {
      dataInit:null,
      showType:false,
      collapsed: false,
      showMenu: true
    }
  },
  computed: {
    menuList () {
      // console.log('router', router)
      // console.log('getMenuByRouter2', getMenuByRouter2(router, this.$store.state.user.accessMenu))
      let list= getMenuByRouter2(router, this.$store.state.user.accessMenu)
      // console.log('this.$store.state.user.accessMenu', this.$store.state.user.accessMenu )
      // console.log('menuList', list )
      return this.paraMenu|| list
    },
    setOpenedNames(){
      let list= this.menuList
      let arr=[]
      for (let i in list){
        if(list[i].children){
          arr.push(list[i].meta.accessId.toString())
        }
      }
      // this.openedNames= arr
      return arr
    },
    keepAlive(){
      return this.$route.meta.keepAlive
    }
  },
  mounted(){
    // console.log('main-mounted', this.$route)
    let roles= this.$store.state.user.userInfo.roles;
    if(this.$route.path != '/center/company-home'){
      for(let i in roles){
        if(roles[i].code == 'weixiuqiye'){
          this.checkButt();
          break;
        }
      }
    }

  },
  methods: {
     checkButt(){
       this.$axios.get('/monitoring/config/company-docking/query/companyCode').then((res) => {
         if(res.data.content &&res.data.content.length == 0){
           this.showType = true;
         }else if(res.data.code=='1000'){
           this.$router.push('/')
         }
       })
     },
    turnToPage (name, meta) {
      // console.log('click', name, meta)
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }

      if(meta && (meta.href || meta.extInfo=='target=_blank')){
        // window.location.href= name
        window.open(meta.href)
      }else{
        this.$router.push({
          path: name
        })
      }

    },
  }
}
</script>

<style scoped lang="less">
.common-sider{
  background-color: white;
  .logo-con{
    margin-top: 10px;
    padding: 0 10px;
    p{
      background: url(../assets/img/center/menu-bg.png) no-repeat center center;
      background-size: 100% auto;
      position: relative;
      color: #FFF;
      font-size: 16px;
      padding-left: 40px;
      height: 45px;
      line-height: 40px;
    }
    p::after {
      content: "";
      background: url(../assets/img/center/menu-head-icon.png) no-repeat left center;
      width: 24px;
      height: 24px;
      position: absolute;
      left: 10px;
      top: 8px;
    }
  }

}
  .common-content{
    min-height: 70vh;
    padding: 10px;
    .sub-title{
      line-height: 38px;
      padding: 0 10px;
      background-color: white;
      border-bottom: 2px solid #4ba7f5;
    }
    >div:not(.sub-title){
      min-height: calc(100% - 40px);
      overflow: hidden;
      background-color: white;
    }
  }
</style>
<style lang="less">
  .common-sider{
    .ivu-menu-item:hover, .ivu-menu-submenu-title:hover{
      background-color: #f1f1f1;
    }
  }
</style>
