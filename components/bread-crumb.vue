<template>
<div class="bread-crumb">
  <Breadcrumb v-if="show">
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
  data(){
    return{
      show: false
    }
  },
  mounted(){
    this.show= true
    // console.log(this.$route)
  }
}
</script>

<style scoped>

</style>
