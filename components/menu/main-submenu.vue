<template>
  <Submenu :name="item.uri">
    <template slot="title">
      <menu-icon :item="item"></menu-icon>
      <!--<Icon :type="item.icon || ''" :custom="item.custom||''" v-if="item.custom ||item.icon"/>-->
      <span>{{ showTitle(item) }}</span>
    </template>
    <template v-for="(citem, key) in children">
      <main-submenu v-if="showSubmenu(citem)" :key="key" :item="citem"></main-submenu>
      <MenuItem v-else-if="citem.meta &&!citem.meta.hideMenu" :name="citem.uri" :key="key" @click.native="clickMenu(citem)">
        <!--<Icon v-if="item.icon" :type="item.icon || ''" />-->
        <menu-icon :item="citem"></menu-icon>
        <span>{{ showTitle(citem) }}</span>
      </MenuItem>
    </template>
  </Submenu>
</template>
<script>
import mixin from './mixin'
export default {
  name: 'main-submenu',
  mixins: [ mixin ],
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    theme: String,
    iconSize: Number
  },
  computed: {
    children () {
      return this.item.children
    },
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  }
}
</script>
