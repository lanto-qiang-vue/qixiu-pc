<template>

<Modal
    v-model="showModal"
    title="绑定他人车辆"
    width="90"
    :scrollable="true"
    :transfer= "false"
    :footer-hide="false"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    class="table-modal-detail"
    :transition-names="['', '']">
        <div style="height: 100%;overflow: auto;">
        
        <Form :label-width="80" ref="search" :rules="ruleValidate"  :model="search">
            <FormItem label="车主手机号:" style="width: 300px;" prop="telephone">
                <Input type="text" v-model="search.telephone" placeholder=""></Input>
            </FormItem>
            <FormItem label="车牌号:" style="width: 300px;" prop="vehicleNumber">
                <Input type="text" v-model="search.vehicleNumber" placeholder=""></Input>
            </FormItem>
            <FormItem label="与车主关系" style="width: 300px;" prop="relation">
                <Select v-model="search.relation" >
                    <Option v-for="item in searchSelectOption" :value="item.value" :key="item.index">{{ item.name }}</Option>
                </Select>
            </FormItem>
        </Form>

        
        </div>
        <div slot="footer">
            <Button  @click="authorize('search')" size="large" type="success"  style="margin-right: 10px;">提交</Button>
            <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
        </div>
        <Modal
    
    title="请填写验证码"
    width="30"
    v-model="showCaptcha"
    :mask-closable="false"
   >
        <Form :label-width="80" ref="searchArr" :rules="ruleValidate1"  :model="searchArr">
            <FormItem label="验证码:" style="width: 300px;" prop="captcha">
                <Input type="text" v-model="searchArr.captcha" placeholder=""></Input>
            </FormItem>
            
        </Form>
        <div slot="footer">
            <Button  @click="authorize1('searchArr')" size="large" type="success"  style="margin-right: 10px;">提交</Button>
            <Button  size="large" type="default" style="margin-right: 10px;" @click="showCaptcha=false;">返回</Button>
        </div>
</Modal>
  </Modal>
  
</template>

<script>

export default {
	name: "bind-other-car",
    props:['showDetail', 'detailData'],
    data(){
        return{
            showModal:false,
            showCaptcha:false,
            search:{
                
                "relation": '1',
                "telephone": "",
                "vehicleNumber": ""
            },
            searchArr:{
                "captcha": "",
            },
            searchSelectOption:[
                {value:"1",name:'家人'},
                {value:"2",name:'亲戚'},
                {value:"3",name:'朋友'},
                {value:"4",name:'同事'},
            ],
            ruleValidate: {
                relation:[
                    { required: true, message: '必选', },
                ],
                telephone: [
                    { required: true,  message: '必选',}
                ],
                vehicleNumber: [
                    { required: true, message: '必选',},
                ]
            },//规则验证
            ruleValidate1: {
                captcha:[
                    { required: true, message: '必选', },
                ],
            },//规则验证

        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            for(let i in this.search){
                this.search[i]='';
            }
            this.search['relation']='1';
            this.searchArr['captcha']='';
        },
    },
    mounted () {
      
    },
    // beforeMount(){
    //   this.$axios.post('/menu/list', {
    //     "pageNo": 1,
    //     "pageSize": 10,
    //   })
    // },
    methods:{
        //监听界面变化--------
        visibleChange(status){
            if(status === false){
                this.handleReset("search");
                this.handleReset("searchArr");
            }
        },
        //清除规则验证-------------
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        authorize(name){
            this.$refs[name].validate((valid) => {
              if (valid) {
                  this.$axios.post('/scan/authorize', {
                        "captcha": this.searchArr.captcha,
                        "relation": this.search.relation,
                        "telephone": this.search.telephone,
                        "vehicleNumber": this.search.vehicleNumber,

                    }).then( (res) => {
                        if(res.data.code=='0'){
                            this.showCaptcha=true;
                        }else{
                            this.$Message.info(res.data.status)
                        }
                })

              }
          });
            
        },
        authorize1(name){
            this.$refs[name].validate((valid) => {
              if (valid) {
                  this.$axios.post('/scan/authorize', {
                        "captcha": this.searchArr.captcha,
                        "relation": this.search.relation,
                        "telephone": this.search.telephone,
                        "vehicleNumber": this.search.vehicleNumber,

                    }).then( (res) => {
                        if(res.data.code=='0'){
                            this.showCaptcha=false;
                            this.showModal=false;
                            this.$emit('closeDetail');
                            this.$Message.info('绑定成功')
                        }else{
                            this.$Message.info(res.data.status)
                        }
                })

              }
          });
        },
        
    },
}
</script>

<style scoped lang="less">
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
</style>
