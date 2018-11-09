<template>
  <div class="container">
    <h1 v-if="error &&error.statusCode &&error.statusCode === 404">页面不存在</h1>
    <h1 v-else>应用发生错误异常</h1>
    <!--<nuxt-link to="/">首 页</nuxt-link>-->
  </div>
</template>

<script>
	export default {
		name: "error",
    props: ['error'],
    layout: 'common',
    mounted(){
		  console.log('error:',{...this.error})
    }
	}
</script>

<style scoped>

</style>
