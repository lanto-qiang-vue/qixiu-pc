<template>
<basic-container>
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
    <Form class="common-form" :model="formData" :rules="rules" ref="formData" :label-width="120" style="padding-top:20px;">
      <FormItem label="车主姓名:" style="width:70%;" prop="ownerName">
        <Input placeholder="请输入" v-model="formData.ownerName"></Input>
      </FormItem>
      <FormItem label="联系方式:" style="width:70%;" prop="contactMobile">
        <Input placeholder="请输入" v-model="formData.contactMobile"></Input>
      </FormItem>
      <FormItem label="地址:" style="width:70%;" prop="contactAddress">
        <Input placeholder="请输入" v-model="formData.contactAddress"></Input>
      </FormItem>
      <FormItem label="服务内容:" style="width:80%;" >
        <CheckboxGroup v-model="checkId">
          <Checkbox v-for="(item, key) in checkBoxList" :label="item.id" :key="key">
            <span>{{item.title}}</span>
          </Checkbox>
        </CheckboxGroup>
      </FormItem>
      <div style="clear:both;"></div>
      <FormItem>
        <Button type="primary" @click="submit('formData')">提交</Button>
      </FormItem>
    </Form>
    </div>
  </div>
</div>
</basic-container>
</template>

<script>
import BasicContainer from '~/components/basic-container.vue'
export default {
  name: "visit-service",
  layout: "layout-root",
  components: {
    BasicContainer
  },
  data(){
    return {
      checkId:[],
      formData:{
        companyId:null,
        contactAddress:'',
        contactMobile:'',
        ownerName:'',
        serviceType:'',
      },
      rules:{
        ownerName:[{required:true,message:'联系人必填'}],
        contactAddress:[{required:true,message:'联系地址必填'}],
        contactMobile:[{required: true, pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入有效手机号码', trigger: 'change,blur'}],
      },
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
  },
  mounted(){
    this.$refs.formData.resetFields();
    this.formData.companyId = this.$route.query.id || null;
  },
  activated(){
    this.$refs.formData.resetFields();
    this.formData.companyId = this.$route.query.id || null;
  },
  methods:{
    submit(name){
      let serviceType = this.checkId.join(',');
      this.formData.serviceType = serviceType;
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Modal.confirm({
            title: '系统提示',
            content: '确认提交吗?',
            onOk: () => {
              this.$axios.post('/service/add', this.formData).then((res) => {
                if(res.data.code == 0){
                  window.location.href = "/center/my-visit";
                }else{
                  setTimeout(()=>{
                    this.$Modal.error({
                      title:'系统提示',
                      content:res.data.status
                    });
                  },200);
                }
              })
            }
          })
        } else {
          this.$Message.error('请校对红框信息')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
