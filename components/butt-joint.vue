<template>
  <!--组件先放这里先-->
  <div class="butt-joint">
<Modal
    v-model="commentModal"
    title="请填写企业联系人"
    width="525"
    :scrollable="true"
    :closable="closableType"
    :transfer="false"
    :footer-hide="false"
    :mask-closable="false"
    :z-index="1000"
    :transition-names="['', '']">

    <p class="remark">注：企业联系人为维修企业日常经营负责人，用于接收汽修平台公众号通知。</p>
    <Form :label-width="140" ref="formData" :model="formData" :rules="rules" style="width:400px;">
      <FormItem label="联系人姓名:" prop="contactName">
        <Input type="text" v-model="formData.contactName"  placeholder="请输入平台对接人名称"></Input>
      </FormItem>
      <FormItem label="联系人手机:" prop="contactMobile">
        <Input type="text" v-model="formData.contactMobile" maxlength="11" placeholder="请输入手机号码"></Input>
      </FormItem>
    </Form>
    <div v-show="showErcode" class="step">
      <h2>如果您填写的手机号还未登录过汽修平台微信，请按以下步骤操作：</h2>
      <li><span>1. 打开微信扫一扫，关注“上海汽修平台”微信公众号。</span>
        <img src="/img/garage-info/shqx_wx.png" style="height:126px;">
        <div>上海汽修平台公众号</div>
      </li>
      <li>2. 关注微信公众号后，点击“我的”-“个人中心”。</li>
      <li>3. “点击登录”- 在“验证码登录”下输入企业联系人手机号，“验证并登录”后即完成登录。</li>
      <p class="red">完成登录后在本页面填写企业联系人及手机号后保存即可。</p>
    </div>
    <div slot="footer">
      <Button  type="primary" @click="submit('formData')">保存</Button>
    </div>

</Modal>
  </div>
  <!--组建结束-->
</template>

<script>
  import { deepClone } from '../static/util'

  export default {
    name: 'butt-joint',
    props:['type','dataInit','stage'],
    data(){
      return {
        commentModal2:false,
        closableType:false,
        commentModal:false,
        showErcode: true,
        formData:{contactMobile:'',contactName:''},
        rules:{
          contactName:{required:true,message:'对接人必填'},
          contactMobile:[{required:true,message:'填写正确的手机号', pattern: /^1[3456789]\d{9}$/,}],
        },
      }
    },
    methods:{
      submit(name){
        let url = "/monitoring/config/company-docking";
        if(this.stage == 1) this.$router.push({ path: '/center/company-home',query:{refresh:Math.random()}});
        this.$refs[name].validate((valid) => {
           if(valid){
          this.$Modal.confirm({
            title:'系统提示',
            content:'确认保存吗?',
            onOk:()=>{
              if(!this.closableType){
                this.$axios.post(url,this.formData).then((res) => {

                  if(res.data.code == 0){
                    this.$Message.success("保存成功");
                    this.commentModal = false;
                    this.$emit('refresh');
                  }
                  if(res.data.code=='1000'){
                    this.showErcode= true
                  }
                })
              }else{
                this.$axios.put(url+"/"+this.formData.id,this.formData).then((res) => {
                  if(res.data.code == 0){
                    this.$Message.success("修改成功");
                    this.commentModal = false;
                    this.$emit('refresh');
                  }
                  if(res.data.code=='1000'){
                    this.showErcode= true
                    let oldTel= this.formData.contactMobile
                    this.rules.contactMobile.push({
                      validator: (rule, value, callback) => {
                        if (value === oldTel) {
                          callback(new Error('对不起，您输入的手机号还未登录过汽修平台微信'));
                        } else {
                          callback();
                        }
                      }
                    })
                    this.$refs.formData.validate()
                  }
                })
              }
            }
          });
           }else{
            // this.$Message.errro("请检查红框信息");
           }
        });
      }
    },
    watch:{
      type(){
        this.$refs.formData.resetFields();
        if(this.dataInit == null){
          this.formData = deepClone(this.formData2);
          this.closableType = false;
        }else{
          this.closableType = true;
          this.formData = deepClone(this.dataInit);
        }
        this.commentModal = true;
        // this.commentModal2 = true;
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
    margin-top: 10px;
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
