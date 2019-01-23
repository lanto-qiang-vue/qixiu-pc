<template>
<basic-container>
	<div class="parking">
    <div class="center">
      <img src="~/assets/img/build.png"/>
      <div class="right">
        <h2>停车找我正在建设中…</h2>
        <p>精彩内容，敬请期待！</p>
        <Button type="primary" @click="$router.go(-1)">返回</Button>
      </div>
    </div>
  </div>
</basic-container>
</template>

<script>
  import BasicContainer from '~/components/basic-container.vue'
	export default {
		name: "parking",
    layout: 'layout-root',
    components: {
      BasicContainer,
    },
	}
</script>

<style scoped lang="less">
.parking{
  height: 60vh;
  min-height: 600px;
  position: relative;
  .center{
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 550px;
    font-size: 0;
    img{
      width: 300px;
      vertical-align: middle;
    }
    .right{
      vertical-align: middle;
      width: 250px;
      display: inline-block;
      padding-left: 20px;
      h2{
        font-size: 20px;
        font-weight: 600;
      }
      p{
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
