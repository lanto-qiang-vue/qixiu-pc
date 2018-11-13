<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <!--<common-icon :type="parentItem.icon || ''" :custom="parentItem.custom"/>-->
      <Icon :type="parentItem.icon || ''" :custom="parentItem.custom" v-if="parentItem.custom ||parentItem.icon"/>
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.meta.accessId}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].meta.accessId}`">
          <!--<common-icon :type="item.children[0].icon || ''" :custom="item.children[0].custom"/>-->
          <Icon :type="item.children[0].icon || ''" :custom="item.children[0].custom" v-if="item.children[0].custom ||item.children[0].icon"/>
          <span>{{ showTitle(item.children[0]) }}</span></menu-item>
      </template>
      <template v-else>
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.meta.accessId}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.meta.accessId}`">
          <!--<common-icon :type="item.icon || ''" :custom="item.custom"/>-->
          <Icon :type="item.icon || ''" :custom="item.custom" v-if="item.custom ||item.icon"/>
          <span>{{ showTitle(item) }}</span></menu-item>
      </template>
    </template>
  </Submenu>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
export default {
  name: 'SideMenuItem',
  mixins: [ mixin, itemMixin ]
}
</script>
