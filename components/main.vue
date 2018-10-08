<template>
  <Layout>
    <Sider hide-trigger class="common-sider"></Sider>
    <Content class="common-content">
      <nuxt-child/>
    </Content>
  </Layout>
</template>

<script>
	export default {
		name: "common-main",
    layout: 'common',
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
