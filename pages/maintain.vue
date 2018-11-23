<template>
  <div class="single-page">
    <div class="center">
      <div class="sub-title">
        <Breadcrumb>
          <BreadcrumbItem>在线预约维修</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div>
        <Form class="common-form" :label-width="120" ref="formData" :model="formData" :rules="rules" style="padding-top:20px;">
          <FormItem label="预约公司名称:" style="width:70%;">
            <Input placeholder="请输入" v-model="companyName"></Input>
          </FormItem>
          <FormItem label="车主姓名:" style="width:70%;" prop="ownerName">
            <Input placeholder="请输入(必填)" v-model="formData.ownerName"></Input>
          </FormItem>
          <FormItem label="联系方式:" style="width:70%;" prop="contactMobile">
            <Input placeholder="请输入(必填)" v-model="formData.contactMobile"></Input>
          </FormItem>
          <FormItem label="预约时间:" style="width:70%;" prop="onSiteTime">
              <DatePicker type="date" style="width:100%;" v-model="formData.onSiteTime"></DatePicker>
          </FormItem>
          <FormItem label="预约维修内容:" style="width:70%;">
            <Input type="textarea" placeholder="请输入内容(可选)" v-model="formData.serviceContent"></Input>
          </FormItem>
          <div style="clear:both;"></div>
          <FormItem>
            <Button type="primary" @click="submit('formData')">提交</Button>
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
    mounted(){
      this.companyName = this.$route.query.name || '';
      this.formData.companyId = this.$route.query.id || null;
    },
    data(){
      return {
        companyName:'',
        formData:{
          companyId:null,
          contactMobile:'联系电话',
          onSiteTime:'2018-11-06',
          ownerName:'联系人',
          serviceContent:'服务内容',
        },
        rules:{
          contactMobile:{required:true,message:'手机号必填'},
          onSiteTime:{required:true,message:'预约时间必填'},
          ownerName:{required:true,message:'联系人必填'},
        }
      }
    },
    methods:{
      submit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Modal.confirm({
              title: '系统提示',
              content: '确认提交吗?',
              onOk: () => {
                this.$axios.post('/service/order/add', this.formData).then((res) => {
                  if(res.data.code == 0){
                    window.location.href = "center/my-order";
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
