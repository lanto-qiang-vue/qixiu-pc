<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu v-if="show" ref="menu" :active-name="meta.accessId|| $route.path" :open-names="openNames" :accordion="true" theme="light" width="200">
      <template v-for="(item, key) in menuList" >
          <main-submenu v-if="showSubmenu(item)" :key="key" :item="item"
                        v-show="showByRole(item.roleCodes)"></main-submenu>
          <MenuItem v-else-if="item.meta && !item.meta.hideMenu" :name="item.uri" :key="key"
                    v-show="showByRole(item.roleCodes)" @click.native="clickMenu(item)">
            <!--<Icon v-if="item.icon" :type="item.icon || ''" />-->
            <menu-icon :item="item"></menu-icon>
            <span>{{ showTitle(item) }}</span>
          </MenuItem>
      </template>
    </Menu>
  </div>
</template>
<script>
import MainSubmenu from './main-submenu.vue'
import { getUnion } from '~/static/tools'
import { deepClone } from '~/static/util'
import mixin from './mixin'

export default {
  name: 'main-menu',
  mixins: [ mixin ],
  components: {
    MainSubmenu,
  },
  props: {
    paraMenu: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      openNames: [],
      show: false
    }
  },
  computed:{
    meta(){
      return this.$route.meta ||{}
    },
    menuList () {
      let list= this.$store.state.user.accessMenu
      let l1= this.paraMenu.length, l2=list.length
      return l1? this.paraMenu : (l2? list: [])
    },
    accessMenu(){
      return this.$store.state.user.accessMenu
    },
    nowAccessId(){
      return this.$route.meta.accessId
    },
  },
  mounted () {
    if(this.$store.state.user.token){
      let openName= this.calcOpenNames(this.nowAccessId, this.accessMenu)
      this.openNames=[openName]
      this.show= true
    }else{
      this.show= true
    }
  },
  methods: {
    calcOpenNames(id, menu){
      let name= ''
      for(let i in menu){
        if(id ==menu[i].uri){
          name= menu[i].uri
          break
        }else if(menu[i].children && menu[i].children.length){
          if(this.calcOpenNames(id, menu[i].children)){
            name= menu[i].uri
            break
          }
        }
      }
      return name
    }
  },
}
</script>
<style lang="less">
@import './main-menu.less';
</style>
