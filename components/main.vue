<template>
<basic-container>
  <Layout style="flex-direction: row;">
    <Sider hide-trigger class="common-sider">
      <main-menu :para-menu="paraMenu">
        <div class="logo-con">
          <p v-if="pageName">{{pageName}}</p>
          <p v-else>{{ showNowRole}}中心</p>
        </div>
      </main-menu>
    </Sider>
    <Content class="common-content">
      <div class="sub-title">
        <my-bread-crumb :name="pageName"></my-bread-crumb>
      </div>

      <nuxt-child v-if="keepAlive" keep-alive/>
      <nuxt-child v-else/>
    </Content>
  </Layout>
  <extra></extra>
</basic-container>
</template>

<script>
import BasicContainer from '~/components/basic-container.vue'
import MainMenu from './menu/main-menu.vue'
import MyBreadCrumb from '~/components/bread-crumb.vue'
import Extra from '~/components/extra/extra.vue'
import mixin from '~/components/home-path-mixin.js'

export default {
  name: "common-main",
  layout: "layout-root",
  components: {
    BasicContainer,
    MainMenu,
    MyBreadCrumb,
    Extra,
  },
  mixins: [mixin],
  props: ['paraMenu', 'pageName'],
  // data () {
  //   return {
  //
  //   }
  // },
  computed: {
    keepAlive(){
      return this.$route.meta.keepAlive
    },
    showNowRole(){
      let name= ''
      for(let i in this.sortRole){
        if(this.rule==  this.sortRole[i].code){
          name= this.sortRole[i].name
        }
      }
      return name
    },
  },
  // mounted(){
  //   console.log(this.$route)
  // },
  methods: {

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
