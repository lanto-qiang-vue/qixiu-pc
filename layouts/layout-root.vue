<template>
<div class="layout-root">
  <nuxt v-if="isKeepAlive" keep-alive/>
  <nuxt v-else/>
</div>
</template>


<script>
export default {
  computed:{
    isKeepAlive(){
      // console.log('isKeepAlive',this.$route)
      return this.$route.name== 'index'
    }
  }
}
</script>
