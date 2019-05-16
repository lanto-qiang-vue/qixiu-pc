
<template>
<Modal
    v-model="showModal"
    title="合格证详情"
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
            <FormItem label="企业名称:" style="width: 45%;">
                <Input type="text" readonly v-model="listSearch.status.name" placeholder=""></Input>
                <div class="field" >dsfsadfas</div>
            </FormItem>
            <FormItem label="许可证号:" style="width: 45%;">
                <Input type="text" readonly v-model="listSearch.status.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="合格证编号:" style="width: 45%;">
                <Input type="text" readonly v-model="listSearch.status.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="检测报告编号:" style="width: 45%;">
                <Input type="text" readonly v-model="listSearch.questionTime" placeholder=""></Input>
            </FormItem>
            <FormItem label="车牌号:" style="width: 45%;">
                <Input type="text" readonly v-model="listSearch.answerTime" placeholder=""></Input>
            </FormItem>
            <FormItem label="维修品牌:" style="width: 45%;">
                <Input type="text" readonly v-model="listSearch.answerTime" placeholder=""></Input>
            </FormItem>
            <FormItem label="维修类别:" style="width: 45%;">
                <Input type="text" readonly v-model="listSearch.answerTime" placeholder=""></Input>
            </FormItem>
            <FormItem label="进厂日期:" style="width: 45%;">
                <Input type="text" readonly v-model="listSearch.answerTime" placeholder=""></Input>
            </FormItem>
            <FormItem label="竣工日期:" style="width: 45%;">
                <Input type="text" readonly v-model="listSearch.answerTime" placeholder=""></Input>
            </FormItem>
            <FormItem label="发证日期:" style="width: 45%;">
                <Input type="text" readonly v-model="listSearch.answerTime" placeholder=""></Input>
            </FormItem>

        </Form>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div slot="footer">
        <Button size="large" type="primary"  @click="updateStatus(2)" v-if="">审核通过</Button>
        <Button size="large" type="primary"  @click="auditModal=true" v-if="">驳回</Button>
        <Button  size="large" type="default" @click="showModal=false;">返回</Button>
    </div>
    <!--页面审核-->
    <Modal v-model="auditModal" title="审核">
      <Form :label-width="120" ref="auditInfo" :rules="auditValidate" :model="auditInfo">
        <FormItem label="审核结果:" >
            <RadioGroup v-model="auditInfo.status">
                <Radio label="2">通过</Radio>
                <Radio label="3">不通过</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="不通过说明:" v-show="auditInfo.status==3" prop="auditInfo">
            <Input type="textarea" :rows="1" v-model="auditInfo.auditInfo" :autosize="{minRows: 5}"
                   placeholder="请输入不通过说明"></Input>
        </FormItem>
    </Form>
      <div slot="footer">
        <Button size="large" type="primary" @click="auditFun" :disabled="auditInfo.status===''">提交</Button>
      </div>
    </Modal>
  </Modal>
</template>

<script>
import { formatDate } from '@/static/tools.js'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "carDoctor-answer-detail",
    props:['showDetail', 'detailData'],
    mixins: [funMixin],
    data(){
		return{
            auditModal: false,
        auditInfo:{
          status:'',
          auditInfo:'',
        },
            spinShow:false,
            showModal:false,
            collapse: '1',
            listSearch:{
                answerContent:"",
                questionContent:"",
                questionTime:"",
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

        },
    },
    computed:{
      showChangeCar(){
        return (field)=>{
          return this.compareHtml(this.travelLicense, this.travelLicenseRevise, field)
        }
      },
      roleType(){
        let role=''
        switch (this.$route.path){
          case '/center/company-info-manage':{
            role= 'guanlibumen'
            break
          }
          default:{
            role= 'yunying'
          }
        }
        return role
      },
    },
    methods:{
        getDetail(){
            this.spinShow=true;
            this.$axios.post('/answer/detail/'+this.detailData.id,{
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.spinShow=false;
                    this.listSearch=res.data.item;
                }else{
                    this.$Message.error(res.data.status);
                }
            })
        },
        //审核通过--
        updateStatus(status){
            this.$axios.post('/answer/audit',{
                "answerId": this.detailData.id,
                "status": status
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.$Message.info('修改审核成功');
                    this.showModal=false;
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
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
          }
        },
        compareHtml(original, later, field){
            let html=''
            if(original &&original[field]== later[field]){
            html=  original[field]
            }else{
            html= ('<p><label>修改前：</label><span>'+ (original&& original[field]? original[field]: "")+'</span></p><p><label>修改后：</label><span>'+
                this.compareLight(original, later, field)+'</span></p>')
            }
            return html
        },
        compareLight(original, later, field){
            let elRev=''
            if(original&& original[field] && later[field] && original[field].length== later[field].length){
            for(let i in original[field]){
                if(original[field][i]== later[field][i]){
                elRev+=later[field][i]
                }else{
                elRev+= ('<i>'+later[field][i]+'</i>')
                }
            }
            }else{
            elRev= '<i>'+later[field]+'</i>'
            }
            return elRev
        },
    },
}
</script>

<style scoped lang="less">
.field{
    p{
      label{
        font-weight: 600;
      }
      i{
        color: red;
        font-style: normal;
      }
    }
  }
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
