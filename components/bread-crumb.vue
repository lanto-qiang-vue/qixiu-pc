<template>
<div class="bread-crumb">
  <Breadcrumb>
    <BreadcrumbItem :to="centerHref">首页</BreadcrumbItem>
    <BreadcrumbItem>{{$route.meta.title}}</BreadcrumbItem>
  </Breadcrumb>
</div>
</template>

<script>
import mixin from '~/components/home-path-mixin.js'
export default {
  name: "bread-crumb",
  mixins: [mixin],
  mounted(){
    console.log(this.$route)
  }
}
</script>

<style scoped>

</style>
