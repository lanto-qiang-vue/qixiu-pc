<template>
<basic-container>
  <div class="single-page">
    <div class="center">
      <div class="sub-title">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/service-map">公众监督</BreadcrumbItem>
          <BreadcrumbItem>维修反馈</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <div style="padding:10px 0 10px 20px;font-size:18px;"><b>反馈电话:</b></div>
        <div style="float:left;font-size:16px;padding-left:20px;">
          <label>市民热线：</label><span style="font-style: italic;color:#03a9f4;margin-right:60px;font-size:20px;"><b>12345</b></span>
        </div>
        <div style="float:left;font-size:16px;">
          <label>城建热线：</label><span style="font-style: italic;color:#03a9f4;margin-right:60px;font-size:20px;"><b>12319</b></span>
        </div>
        <div style="float:left;font-size:16px;">
          <label>全国运输客服电话：</label><span style="font-style: italic;color:#03a9f4;margin-right:60px;font-size:20px;"><b>12328</b></span>
        </div>
      </div>
    </div>
  </div>
</basic-container>
</template>

<script>
  import BasicContainer from '~/components/basic-container.vue'
  export default {
    name: "feedback",
    layout: 'layout-root',
    components: {
      BasicContainer
    },
    data(){
      return {

      }
    }
  }
</script>

<style scoped lang="less">

</style>
