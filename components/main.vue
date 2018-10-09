<template>
  <Layout>
    <Sider hide-trigger class="common-sider">
      <side-menu v-show="showMenu" accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <div class="logo-con">
          <p  style="font-size: 24px">管理中心</p>
        </div>
      </side-menu>
    </Sider>
    <Content class="common-content">
      <nuxt-child/>
    </Content>
  </Layout>
</template>

<script>
import SideMenu from './menu/side-menu.vue'
import { setToken, getToken, setUser, getUser, setMenu, getMenu, getMenuByRouter } from '@/static/util'
import router from '@/static/router'
export default {
  name: "common-main",
  layout: 'common',
  components: {
    SideMenu,
  },
  fetch ({ store, params }) {
    return new Promise(function(resolve, reject) {
      store.commit('user/setToken', getToken()|| '')
      store.commit('user/setMenu', getMenu()|| '')
      store.commit('user/setUser', getUser()|| '')
      resolve();
    })
  },
  data () {
    return {
      collapsed: false,
      showMenu: true
    }
  },
  computed: {
    menuList () {
      return getMenuByRouter(router, this.$store.state.user.accessMenu)
    },
  },
  methods: {
    turnToPage (name) {
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name: name
      })
    },
  }
}
</script>

<style scoped lang="less">
.common-sider{
  background-color: white;
}
  .common-content{
    min-height: 500px;
  }
</style>
