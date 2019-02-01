<template>
  <!--组件先放这里先-->
  <div>
  <Modal
    v-model="commentModal"
    title="请先填写平台对接人"
    width="525"
    :scrollable="true"
    :closable="closableType"
    :transfer="false"
    :footer-hide="false"
    :mask-closable="false"

    :transition-names="['', '']">
    <Form :label-width="140" ref="formData" :model="formData" :rules="rules" style="width:400px;">
      <FormItem label="平台对接人:" prop="contactName">
        <Input type="text" v-model="formData.contactName"  placeholder="请输入平台对接人名称"></Input>
      </FormItem>
      <FormItem label="手机号码:" prop="contactMobile">
        <Input type="text" v-model="formData.contactMobile" placeholder="请输入手机号码"></Input>
      </FormItem>
    </Form>
    <div v-show="showErcode">
      <div style="width:485px;height:90px;background:#FFFBE6;border:1px solid #FFE58F;margin-left:5px;">
        <div style="float:left;width:54px;height:100%;">
          <img src="/img/garage-info/hint.png" style="float:right;padding-top:7px;height:30px;padding-right:15px;"/>
        </div>
        <div style="float:left;width:429px;">
          <div style="font-size:16px;padding-top:7px;"><b>提示!</b></div>
          <div style="width:373px;line-height:20px;">
           你输入的平台对接人或手机号码没有在平台注册,请用手机扫一扫关注并注册上海汽修平台后在进行填写对接人信息。
          </div>
        </div>
      </div>
    <div style="height:20px;width:100%;"></div>
    <div style="margin:0 auto;width:126px;"><img src="/img/garage-info/shqx_wx.png" style="height:126px;"></div>
    <div style="margin:0 auto;width:126px;text-align:center;font-size:14px;"><b>上海汽修平台公众号</b></div>
    </div>
      <!--<div v-show="showErcode">二维码</div>-->
    <div slot="footer">
      <Button  type="primary" @click="submit('formData')">保存 </Button>
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
        showErcode: false,
        formData:{contactMobile:'',contactName:''},
        formData2:{contactMobile:'',contactName:''},
        rules:{
          contactName:{required:true,message:'对接人必填'},
          contactMobile:{required:true,message:'填写正确的手机号', pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,},
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
           'z-index':1100,
            onOk:()=>{
              if(!this.closableType){
                this.$axios.post(url,this.formData).then((res) => {

                  if(res.data.code == 0){
                    this.$Message.success("保存成功");
                    this.commentModal = false;
                   if(this.stage == 1) this.$router.push({ path: '/center/company-home'});
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
                  }
                })
              }
            }
          });
           }else{
           this.$Message.errro("请检查红框信息");
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

<style scoped>

</style>
