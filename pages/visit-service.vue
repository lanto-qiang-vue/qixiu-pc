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
    <Form class="common-form" :label-width="120" style="padding-top:20px;">
      <FormItem label="车主姓名:" style="width:70%;">
        <Input placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="联系方式:" style="width:70%;">
        <Input placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="地址:" style="width:70%;">
        <Input placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="服务内容:" style="width:80%;">
        <CheckboxGroup v-model="checkId">
          <Checkbox v-for="item in checkBoxList" :label="item.id">
            <span>{{item.title}}</span>
          </Checkbox>
        </CheckboxGroup>
      </FormItem>
      <div style="clear:both;"></div>
      <FormItem>
        <Button type="primary">提交</Button>
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
  data(){
    return {
      checkId:[],
      checkBoxList:[
        {id:"300001",title:'上门故障诊断'},
        {id:"300002",title:'上门取送车服务'},
        {id:"300003",title:'上门更换备胎'},
        {id:"300004",title:'上门更换灯泡'},
        {id:"300005",title:'上门更换雨刮器'},
        {id:"300006",title:'上门泵电'},
        {id:"300007",title:'其它'},
      ],
    }
  }
}
</script>

<style scoped lang="less">

</style>
