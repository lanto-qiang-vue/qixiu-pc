<template>
  <!--组件先放这里先-->
  <div class="butt-joint">
<Modal
    v-model="showModal"
    title="请填写企业联系人"
    width="540"
    :scrollable="true"
    :closable="!newCreate"
    :transfer="false"
    :footer-hide="false"
    :mask-closable="false"
    :z-index="1000"
    :transition-names="['', '']">

    <p class="remark">注：企业联系人为维修企业日常经营负责人，用于接收汽修平台公众号通知。</p>
    <Form :label-width="140" ref="formData" :model="formData" :rules="rules" style="width:420px;">
      <FormItem label="企业联系人:" prop="contactName">
        <Input type="text" v-model="formData.contactName"  placeholder="请输入企业联系人"></Input>
      </FormItem>
      <FormItem label="手机号:" prop="contactMobile">
        <Input type="text" v-model="formData.contactMobile" :maxlength="11" placeholder="请输入手机号码"></Input>
      </FormItem>
    </Form>
    <div class="step">
      <h2>如果您填写的手机号还未注册并登录过汽修平台微信，请按以下步骤操作：</h2>
      <li><span>1. 打开微信扫一扫，关注“上海汽修平台”微信公众号。</span>
        <img src="/img/garage-info/shqx_wx.png" style="height:126px;">
        <div>上海汽修平台公众号</div>
      </li>
      <li>2. 关注微信公众号后，点击“我的”-“个人中心”。</li>
      <li>3. “点击登录”- 在“验证码登录”下输入企业联系人手机号，“验证并登录”后即完成登录。</li>
      <p class="red">完成登录后在本页面填写企业联系人及手机号后保存即可。</p>
    </div>
    <div slot="footer">
      <Button  type="primary" @click="submit">保存</Button>
    </div>

</Modal>
  </div>
  <!--组建结束-->
</template>

<script>
import { deepClone, reg } from '~/static/util.js'
export default {
    name: 'butt-joint',
    data(){
      return {
        formData:{contactMobile:'',contactName:''},
        rules:{
          contactName:{required:true,message:'联系人姓名不能为空'},
          contactMobile:[{required:true,message:'填写正确的手机号', pattern: reg.mobile,}, {
              validator: (rule, value, callback) => {
                if (value === this.$data.errorMobile) {
                  callback(new Error('您输入的手机号还未登录过汽修平台微信公众号'));
                } else {
                  callback();
                }
              }
            }],
        },
        errorMobile: '',
        type: '',
        newCreate: true,
        showModal:false,
      }
    },

    methods:{
      show(data, type){
        this.$refs.formData.resetFields();
        this.type= type
        if(data){
          this.newCreate= false
          this.formData = deepClone(data);
        }
        this.showModal = true;
      },
      submit(){
        this.errorMobile= ''
        this.$refs.formData.validate((valid) => {
           if(valid){
             let url = "/monitoring/config/company-docking", method='post';
             let oldTel= this.formData.contactMobile
              if(!this.newCreate){
                method= 'put'
                url+=("/"+this.formData.id)
              }
             this.$axios[method](url,this.formData).then((res) => {
               if(res.data.code == 0){
                 this.$Message.success("保存成功");
                 this.showModal = false;
                 this.$store.commit('app/setbuttRefresh')
               }
               if(res.data.code=='1000'){
                 this.errorMobile= oldTel
                 this.$refs.formData.validate()
               }
             })
           }
        });
      }
    },
  }
</script>

<style scoped lang="less">
.butt-joint{
  .remark{
    padding: 0 20px;
    color: #FF9738;
    font-size: 12px;
    margin-bottom: 20px;
  }
  .step{
    margin-top: 20px;
    padding: 0 20px;
    h2{
      font-size: 14px;
      font-weight: 600;
    }
    li{
      font-size: 12px;
      color: #666666;
      margin: 5px 0;
      img, div{
        display: block;
        margin: 0 auto;
        width:130px;
        text-align:center;
        font-size:13px;
        font-weight: 600;
      }
      img{
        margin-top: 15px;
      }
      div{
        margin-bottom: 15px;
      }
    }
    .red{
      color: #F4333C;
      font-size: 14px;
    }
  }
}
</style>
<style lang="less">
.butt-joint{
  .ivu-modal-mask,.ivu-modal-wrap{
    z-index: 1000!important;
  }
}
</style>
