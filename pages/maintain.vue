<template>
  <div class="single-page">
    <div class="center">
      <div class="sub-title">
        <Breadcrumb>
          <BreadcrumbItem>在线预约维修</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <Form class="common-form" :label-width="120" style="padding-top:20px;">
          <FormItem label="预约公司名称:" style="width:70%;">
            <Input placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="车主姓名:" style="width:70%;">
            <Input placeholder="请输入(必填)"></Input>
          </FormItem>
          <FormItem label="联系方式:" style="width:70%;">
            <Input placeholder="请输入(必填)"></Input>
          </FormItem>
          <FormItem label="预约时间:" style="width:70%;">
            <Col span="12" style="width:100%;">
              <DatePicker type="date" style="width:100%;"></DatePicker>
            </Col>
          </FormItem>
          <FormItem label="预约维修内容:" style="width:70%;">
            <Input type="textarea" placeholder="请输入内容(可选)"></Input>
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
