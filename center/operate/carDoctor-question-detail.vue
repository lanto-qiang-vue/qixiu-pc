<!--车大夫问题管理详情  2018-11-02  -->
<template>
<Modal
    v-model="showModal"
    title="问题详情"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <div style="height: 100%;overflow: auto;">
        <Form :label-width="120" class="common-form">
            <FormItem label="问题状态:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.status.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="问题分类:" style="width: 80%;">

                <Input type="text" disabled v-model="listSearch.categoryName" placeholder=""></Input>
            </FormItem>
            <FormItem label="提问时间:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.createTime" placeholder=""></Input>
            </FormItem>
            <FormItem label="回答时间:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.answerTime" placeholder=""></Input>
            </FormItem>
            <FormItem label="问题内容:" style="width: 80%;">
                <Input v-model="listSearch.content" disabled type="textarea" :rows="4" placeholder="" />
            </FormItem>
            <FormItem label="问题图片:" style="width: 80%;">
                <Card class="pic-card" v-for="item in listSearch.questionPhoto" :key="item">
                    <div class="pic-body">
                        <img  class="pic" :src="item"
                            @click="showImg(item)"/>
                    </div>
                    
                </Card>
            </FormItem>
            
            
        </Form>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div slot="footer">
        <Button size="large" type="primary" :disabled="listButton.edit" @click="updateStatus(2)" v-if="accessBtn('audit')">审核通过</Button>
        <Button size="large" type="primary" :disabled="listButton.out" @click="updateStatus(3)" v-if="accessBtn('audit')">驳回</Button>
        <Button  size="large" type="default" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "carDoctor-question-detail",
    props:['showDetail', 'detailData'],
    mixins: [funMixin],
    data(){
		return{
            spinShow:false,
            showModal:false,
            collapse: '1',
            listSearch:{
                questionPhoto:"",
                content:"",
                categoryName:"",
                createTime:"",
                answerTime:"",
                status:{name:''},
            },
            listButton:{
                edit:true,
                out:true,
            }
        
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            this.getDetail();
            if(this.detailData.status.id==1){
                this.listButton.edit=false;
                this.listButton.out=false;
            }else if(this.detailData.status.id==2){
                this.listButton.edit=true;
                this.listButton.out=false;
            }else if (this.detailData.status.id==3){
                this.listButton.edit=true;
                this.listButton.out=true;
            }

        },
    },
    methods:{
        getDetail(){
            this.spinShow=true;
            this.$axios.get('/question/audit/detail/'+this.detailData.id,{
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.spinShow=false;
                    this.listSearch=res.data.item;
                }else{
                    // this.$Message.error(res.data.status);
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
        //审核通过--
        updateStatus(status){
            this.$axios.get('/question/audit/manage/'+this.detailData.id+'/'+status,{
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.$Message.info('修改审核成功');
                    this.showModal=false;
                }else{
                    // this.$Message.error(res.data.status);
                }
            })
        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
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
