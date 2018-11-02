<!--车大夫管理增加弹出层  2018-11-02  -->
<template>
<Modal
    v-model="showModal"
    title="车大夫添加"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <div style="height: 100%;overflow: auto;">
        <Form ref="answerDetail" :rules="ruleValidate"  :model="answerDetail" :label-width="120" class="common-form">
            <FormItem label="姓名:" style="width: 45%;">
                <Input type="text" v-model="listSearch.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="性别:" style="width: 45%;">

                <RadioGroup v-model="listSearch.sex">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="身份证号:" style="width: 45%;">
                <Input v-model="listSearch.idNum" type="text" placeholder="" />
            </FormItem>
            <FormItem label="手机号:" style="width: 45%;">
                <Input type="text" v-model="listSearch.telphone" placeholder=""></Input>
            </FormItem>
            <FormItem label="出生日期:" style="width: 45%;">
                
                <DatePicker type="date" placeholder="Select date" style="width: 100%;" v-model="listSearch.birthDate"></DatePicker>
            </FormItem>
            <FormItem label="学历:" style="width: 45%;">
                <Input type="text"  v-model="listSearch.degree" placeholder=""></Input>
            </FormItem>
            <FormItem label="籍贯:" style="width: 45%;">
                <Input type="text"  v-model="listSearch.nativePlace" placeholder=""></Input>
            </FormItem>
            <FormItem label="就职企业:" style="width: 45%;">
                <Input type="text"  v-model="listSearch.empUnit" placeholder=""></Input>
            </FormItem>
            <FormItem label="职称:" style="width: 92%;">
                <Input type="text" v-model="listSearch.professor" placeholder=""></Input>
            </FormItem>
            <FormItem label="荣誉:" style="width: 92%;">
                <Input type="textarea" :rows="4" v-model="listSearch.honor" placeholder=""></Input>
            </FormItem>
            <FormItem label="擅长:" style="width: 92%;">
                <Input type="textarea" :rows="4"  v-model="listSearch.goodAt" placeholder=""></Input>
            </FormItem>
            <FormItem label="头像:" style="width: 80%;">
                <Card class="pic-card" >
                    <div class="pic-body">
                        <img  class="pic" :src="listSearch.photo"
                            @click="showImg(listSearch.photo)"/>
                    </div>
                    
                </Card>
            </FormItem>
            
        </Form>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div slot="footer">
        <Button size="large" type="primary" style="margin-right: 10px;" @click="addanswerFun('answerDetail')">提交</Button>
        <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
export default {
	name: "carDoctor-manage-add",
    props:['showDetail', 'detailData'],
    data(){
		return{
            spinShow:false,
            showModal:false,
            collapse: '1',
            listSearch:{
                "birthDate": "2018-11-02T10:19:32.846Z",
                "createDate": "2018-11-02T10:19:32.846Z",
                "degree": "string",
                "empUnit": "string",
                "expertId": 0,
                "goodAt": "string",
                "honor": "string",
                "idNum": "string",
                "name": "string",
                "nativePlace": "string",
                "photo": "string",
                "professor": "string",
                "sex": "string",
                "status": "string",
                "telphone": "string"
            },
            answerDetail:{
                answerdata:'',
            },
            ruleValidate: {
                answerdata:[
                    { required: true, message: '请填写', },
                ],
            },//规则验证
        
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            // this.getDetail();
        },
    },
    methods:{
        getDetail(){
            this.spinShow=true;
            this.$axios.post('/cdf/answer/detail/'+this.detailData.id,{
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.spinShow=false;
                    this.listSearch=res.data.item;
                }else{
                    this.$Message.error(res.data.status);
                }
            })
        },
        showImg(img){
            this.$Modal.info({
            width: 50,
            title: '查看',
            closable: true,
            content: '<img src="'+img+'" style="width: 100%"/>'
            })
        },
        //提交回答------
        addanswerFun(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                        this.$Modal.confirm({
                            title:"系统提示!",
                            content:"确定要提交吗？",
                            onOk:this.addanswer,
                        })
                }
            });
        },
        addanswer(){
            this.$axios.get('/QxwCdf/addanswer',{
                        "anonymous": false,
                        "content": this.answerDetail.answerdata,
                        "questionId": this.detailData.id,
                }).then( (res) => {
                    if(res.data.code=='0'){
                        this.$Message.info('提交成功');
                        this.showModal=false;
                    }else{
                        this.$Message.error(res.data.status);
                    }
            })
        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            this.$refs['answerDetail'].resetFields();
          }
        },
    },
}
</script>

<style scoped lang="less">
.content-list{
    width: 100%;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    img{
        width:40px;
        height:40px;
        border:1px solid #ccc;
        float: left;
    }
    h3{
        float: left;
        height: 45px;
        line-height: 45px;
        margin-left: 10px;
    }
    span{
        float: right;
    }
    
}
.content-p{
    padding-left: 55px;
}
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
  .r-list-search{
    width: 100%;
    padding: 10px 0;
    

  }

  .pic-card{
      display: inline-block;
      margin: 0 10px 10px 0;
      width: 200px;
      min-width: 200px;
      
      .red{
        color: red;
      }
      .pic-body{
        width: 100%;
        height: 150px;
        /*border: 1px solid #dcdee2;*/
        position: relative;
        .no-pic{
          width: 250px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
        }
        .pic{
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
          cursor: pointer;
        }
        .button{
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          text-align: center;
          > *{
            margin: 0 5px;
            vertical-align: top;
          }
          .up-img{
            display: inline-block;
            overflow: hidden;
            position: relative;
            .input{
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              font-size: 0;
              cursor: pointer;
            }
          }
        }
      }
    }
</style>
