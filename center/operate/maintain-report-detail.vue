<!--维修数据上报详情  2018-12-12  -->
<template>
<Modal
    v-model="showModal"
    title="详情"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <div style="overflow: auto;border: 1px solid #E8E8E8; margin-bottom: 100px;">
        <!--基本信息类！！！！！！！！！！！！！！！！！！！！！！！！！！！-->
        <div class="dblock">
            <div class="dtitle">
                基本信息
            </div>
            <div class="center">
                <div class="left">
                    企业名称:
                </div>
                <div class="right">
                    上海祥通汽车
                </div>
            </div>

            <div class="mincenter">
                <div class="left">
                    企业简介:
                </div>
                <div class="textArea">
                    上海市机动车维修上海市机动车维修海市机动车维修上海市机动车维修上海市
                </div>
                <div class="tmp"></div>

            </div>

            <div class="center">
                <div class="left">
                    许可证号:
                </div>
                <div class="right">
                    上海祥通汽车销售
                </div>
                <div class="left">
                    许可证号有效期:
                </div>
                <div class="right">
                    上海祥通汽车销
                </div>
            </div>

            <div class="center">
                <div class="left">
                    工商注册地址:
                </div>
                <div class="right">
                    上海祥通汽车销
                </div>
                <div class="left">
                    工商注册日期:
                </div>
                <div class="right">
                    上海祥通汽车销
                </div>
            </div>

            <div class="center">
                <div class="left">
                    经营地址:
                </div>
                <div class="right">
                    上海祥通汽车销
                </div>
                <div class="left">
                    经营地址邮编:
                </div>
                <div class="right">
                    上海祥通汽车销
                </div>
            </div>

            <div class="center">
                <div class="maxleft">
                    法定代表人:
                </div>
                <div class="minRight">
                    上海祥通汽车销
                </div>
                <div class="minleft">
                    手机:
                </div>
                <div class="minRight">
                    上海祥通汽车销
                </div>
                <div class="minleft">
                    固话:
                </div>
                <div class="minRight">
                    上海祥通汽车销
                </div>
                <div class="minleft">
                    邮箱:
                </div>
                <div class="minRight">
                    上海祥通汽车销
                </div>
            </div>

            <div class="center">
                <div class="maxleft">
                    日常经营管理负责人:
                </div>
                <div class="minRight">
                    上海祥通汽车销
                </div>
                <div class="minleft">
                    手机:
                </div>
                <div class="minRight">
                    上海祥通汽车销
                </div>
                <div class="minleft">
                    固话:
                </div>
                <div class="minRight">
                    上海祥通汽车销
                </div>
                <div class="minleft">
                    邮箱:
                </div>
                <div class="minRight">
                    上海祥通汽车销
                </div>
            </div>

            <div class="center">
                <div class="maxleft">
                    投诉电话:
                </div>
                <div class="right">
                    上海祥通汽车销
                </div>
                <div class="left">
                    营业时间:
                </div>
                <div class="right">
                    上海祥通汽车销
                </div>
            </div>

            <div class="center">
                <div class="maxleft">
                    工时定额执行标准:
                </div>
                <div class="right">
                    上海祥通汽车销
                </div>
                <div class="left">
                    工时单价:
                </div>
                <div class="right">
                    上海祥通汽车销
                </div>
            </div>

            <div class="mincenter">
                <div class="left">
                    证件照片:
                </div>
                <!--<div class="right">
                    上海祥通汽车销
                </div>-->

                <div class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" src="../../assets/img/login_img/qq_logo.png"/>
                    </div>
                    
                </div>
            </div>

            

        </div>
        <!--类型范围类！！！！！！！！！！！！！！！！！！！！！！！！！！！-->
        <div class="dblock">
            <div class="dtitle">
                类型范围
            </div>
            <div class="center">
                <div class="left">
                    业务类别:
                </div>
                <div class="right">
                    上海祥通汽车
                </div>
                <div class="left">
                    经济类型:
                </div>
                <div class="right">
                    上海祥通汽车
                </div>
            </div>

            <div class="center">
                <div class="left">
                    经营范围:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>
        </div>
        <!--人员/规模情况范围类！！！！！！！！！！！！！！！！！！！！！！！！！！！-->
        <div class="dblock">
            <div class="dtitle">
                人员/规模情况
            </div>
            <div class="center">
                <div class="left">
                    员工总数:
                </div>
                <div class="right">
                    上海祥通汽车
                </div>
                <div class="left">
                    企业管理人员情况:
                </div>
                <div class="right">
                    上海祥通汽车
                </div>
            </div>

            <div class="center">
                <div class="left">
                    经理人:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="left">
                    服务负责人:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="left">
                    技术负责人:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="left">
                    质量检查员:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
            </div>

            <div class="center">
                <div class="left">
                    其他人员:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
                
            </div>

            <div class="center">
                <div class="left">
                    机工(人):
                </div>
                <div class="temLeft">
                    高级技师:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    技师:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    高级:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    中级:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                
            </div>

            <div class="center">
                <div class="left">
                    电工(人):
                </div>
                <div class="temLeft">
                    高级技师:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    技师:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    高级:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    中级:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                
            </div>

            <div class="center">
                <div class="left">
                    钣金工(人):
                </div>
                <div class="temLeft">
                    高级技师:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    技师:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    高级:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    中级:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                
            </div>

            <div class="center">
                <div class="left">
                    油漆工(人):
                </div>
                <div class="temLeft">
                    高级技师:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    技师:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    高级:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                <div class="temLeft">
                    中级:
                </div>
                <div class="minRight">
                    上海市机动车维修
                </div>
                
            </div>

            <div class="center">
                <div class="maxleft">
                    目前占地面积(人):
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>

            <div class="mincenter">
                <div class="maxleft">
                    主要维修项目情况:
                </div>
                <div class="textArea">
                    上海市机动车维修
                </div>
            </div>

        </div>
        <!--服务内容类！！！！！！！！！！！！！！！！！！！！！！！！！！！-->
        <div class="dblock">
            <div class="dtitle">
                服务内容
            </div>
            <div class="center">
                <div class="left">
                    业务范围:
                </div>
                <div class="right">
                    上海祥通汽车
                </div>
            </div>
            <div class="center">
                <div class="left">
                    维修车型:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
                
            </div>
            <div class="center">
                <div class="left">
                    24小时汽车维修救援:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
                <div class="left">
                    汽车销售维修:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>

            <div class="center">
                <div class="left">
                    通过IOS质量管理体系认证:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
                <div class="left">
                    通过安全生产标准化达标认证:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>

            <div class="center">
                <div class="left">
                    通过环保部门专项整治:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
                <div class="left">
                    是否为全国诚信维修企业:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>

            <div class="center">
                <div class="left">
                    上年度质量信誉考核等级:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
                <div class="left">
                    是否提供上门服务:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>

            <div class="center">
                <div class="left">
                    上门服务种类:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>

            <div class="center">
                <div class="left">
                    特色服务:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>
            <div class="center">
                <div class="left">
                    服务优势描述:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>
            <div class="center">
                <div class="left">
                    区级以上荣誉获得情况(含企业员工、员工列出人名):
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>
            <div class="center">
                <div class="left">
                    是否愿意开通车大夫服务等在线维度服务:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>
            <div class="center">
                <div class="left">
                    是否愿意开通在线商务服务:
                </div>
                <div class="right">
                    上海市机动车维修
                </div>
            </div>


        </div>

    </div>

    <div slot="footer">
        <Button size="large" type="primary" :disabled="listButton.edit" @click="updateStatus(2)" v-if="accessBtn('audit')">审核通过</Button>
        <Button size="large" type="primary" >确定</Button>
        <Button  size="large" type="default" @click="showModal=false;">返回</Button>
    </div>

  </Modal>
</template>

<script>
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "maintain-report-detail",
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
        },
    },
    methods:{
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
          }
        },
    },
}
</script>

<style scoped lang="less">
.dblock{
  /*margin: 10px 0;*/

  .dtitle {
    text-align: left;
    padding-left: 10px;
    height:36px;
    line-height:36px;
    font-size: 16px;
    font-weight:bold;
    width: 100%;
    background:#F6F6F6;
    border-bottom:1px solid #E8E8E8;
  }
  .center{
    /*text-align: center;
    .inline-box {
      display: inline-block;
      vertical-align: top;
      margin-bottom: 30px;
      > div {
        white-space: nowrap;
        display: inline-block;
      }
    }*/
    overflow: hidden;
    width: 100%;
    height: 54px;
    font-size: 14px;
    border-bottom:1px solid #E8E8E8;


    
    





    .minleft{
        display: inline-block;
        min-width:80px;
        padding-left:24px;
        line-height:54px;
        color:#686868;
    }
    .left{
        display: inline-block;
        min-width:140px;
        padding-left:24px;
        line-height:54px;
        color:#686868;
    }
    .maxleft{
        display: inline-block;
        min-width:170px;
        padding-left:24px;
        line-height:54px;
        color:#686868;
    }
    .temLeft{
        display: inline-block;
        min-width:90px;
        line-height:54px;
    }
    .right{
        display: inline-block;
        min-width:200px;
        line-height:54px;
        height: 54px;
        /*word-wrap:break-word ;*/
    }
    .minRight{
        display: inline-block;
        min-width:150px;
        line-height:54px;
        height: 54px;
    }
    .textArea{
        display: inline-block;
        width: 600px;
        overflow: hidden;
        /*height: 54px;*/
        min-height: 54px;
        line-height:54px;
    }

  }
  .mincenter{
    /*text-align: center;
    .inline-box {
      display: inline-block;
      vertical-align: top;
      margin-bottom: 30px;
      > div {
        white-space: nowrap;
        display: inline-block;
      }
    }*/
    overflow: hidden;
    width: 100%;
    min-height: 54px;
    font-size: 14px;
    border-bottom:1px solid #E8E8E8;
    
    .pic-card{
      display: inline-block;
      margin: 0 10px 10px 0;
      width: 350px;
      min-width: 250px;
      .pic-body{
        width: 100%;
        height: 200px;
        /*border: 1px solid #dcdee2;*/
        position: relative;
        .pic{
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
          cursor: pointer;
        }
      }
    }

    .minleft{
        display: inline-block;
        min-width:80px;
        padding-left:24px;
        color:#686868;
        vertical-align: middle;
    }
    .left{
        display: inline-block;
        min-width:140px;
        padding-left:24px;
        color:#686868;
        vertical-align: middle;
    }
    .maxleft{
        display: inline-block;
        min-width:170px;
        padding-left:24px;
        color:#686868;
        vertical-align: middle;
    }
    .right{
        display: inline-block;
        width:200px;
        line-height:54px;
        height: 54px;
        /*word-wrap:break-word ;*/
    }
    .minRight{
        display: inline-block;
        width:150px;
        line-height:54px;
        height: 54px;
    }
    .textArea{
        display: inline-block;
        width: 600px;
        vertical-align: middle;
        /*height: 54px;*/
    }
    .tmp{
        display: inline-block;
        /*width: 1px;*/
        vertical-align: middle;
        min-height: 54px;
    }

  }
}

</style>
