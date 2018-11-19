<template>
<div class="single-page">
  <div class="center">
    <div class="sub-title">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/service-map">维修查选</BreadcrumbItem>
        <BreadcrumbItem>上门服务</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div>
    <Form class="common-form" :label-width="120">
      <FormItem label="车主姓名:" style="width:70%;">
        <Input placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="联系方式:" style="width:70%;">
        <Input placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="地址:" style="width:70%;">
        <Input placeholder="请输入"></Input>
      </FormItem>
    </Form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "visit-service",
  layout: 'common',
}
</script>

<style scoped lang="less">

</style>
