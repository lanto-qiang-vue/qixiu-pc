<!--车大夫问题详情  2018-11-01  -->
<template>
<Modal
    v-model="showModal"
    title="回答问题"
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
            <FormItem label="问题分类:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.categoryName" placeholder=""></Input>
            </FormItem>
            <FormItem label="问题内容:" style="width: 80%;">

                <Input v-model="listSearch.content" disabled type="textarea" :rows="4" placeholder="" />
            </FormItem>
            <FormItem label="问题图片:" style="width: 80%;">
                <Card class="pic-card" v-for="item in listSearch.questionPhoto">
                    <div class="pic-body">
                        <img  class="pic" :src="item"
                            @click="showImg(item)"/>
                    </div>
                    
                </Card>
            </FormItem>
            <FormItem label="回答内容:" style="width: 80%;" prop="answerdata">
                <Input v-model="answerDetail.answerdata" type="textarea" :rows="4" placeholder="" />
            </FormItem>
            <FormItem style="width: 80%;" :label-width="0">
                <div><h2>其他共0回答</h2></div>
                <Divider />
            </FormItem>

            <FormItem style="width: 80%;" :label-width="0" v-for="item in listSearch.answerDetailDtos">
                <div>
                    <div class="content-list"><img :src="item.answerHeadPhoto" alt=""><h3>{{item.answerName}}</h3><span>{{item.answerTime}}</span></div>
                    <p class="content-p">{{item.answerContent}}</p>
                </div>
                <Divider />
            </FormItem>
        </Form>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div slot="footer">
        <Button size="large" type="primary" style="margin-right: 10px;" @click="addanswerFun('answerDetail')">提交回答内容</Button>
        <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
import { formatDate } from '@/static/tools.js'
export default {
	name: "note-audit-detail",
    props:['showDetail', 'detailData'],
    data(){
		return{
            spinShow:false,
            showModal:false,
            collapse: '1',
            listSearch:{
                questionPhoto:"",
                content:"",
                categoryName:"",
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
            this.getDetail();
        },
    },
    methods:{
        getDetail(){
            this.spinShow=true;
            this.$axios.get('/QxwCdf/article/detail/'+this.detailData.id,{
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
            this.$axios.post('/QxwCdf/addanswer',{

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
