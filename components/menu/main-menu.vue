<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" :active-name="activeName" :open-names="openNames" :accordion="accordion" :theme="theme" width="200">
      <template v-for="(item, key) in menuList">
          <main-submenu v-if="showSubmenu(item)" :key="key" :item="item"></main-submenu>
          <MenuItem v-else-if="item.meta && !item.meta.hideMenu" :name="item.uri" :key="key" @click.native="clickMenu(item)">
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
    menuList: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'light'
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  },
}
</script>
<style lang="less">
@import './main-menu.less';
</style>
