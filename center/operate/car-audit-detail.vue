<!--绑定车辆审核详情2018-11-5-->
<template>

<Modal
    v-model="showModal"
    title="绑定本人车辆"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "false"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
        <div style="height: 100%;overflow: auto;">
        <div style="float: left; width: 45%;">
            <Form :label-width="140">
            <FormItem label="行驶证图片:">
                <Card class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="userVehicle.frontImage"
                            @click="showImg(userVehicle.frontImage)"/>
                    </div>
                </Card>
            </FormItem>

            <FormItem label="修改前:" style="margin-bottom: 12px;">
                <div></div>
            </FormItem>
            <FormItem  label="所有人:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userVehicle.ownerName" placeholder="" disabled >
                </Input>
            </FormItem>
            <FormItem  label="车牌号码:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userVehicle.vehiclePlateNumber" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            <FormItem  label="车架号:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userVehicle.vin" placeholder="" disabled >
                    
                </Input>
            </FormItem>
            <FormItem  label="发动机号:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userVehicle.engineNo" placeholder="" disabled >
                </Input>
            </FormItem>
            <FormItem label="修改后:" style="margin-bottom: 12px;">
                <div></div>
            </FormItem>
            <FormItem  label="所有人:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userVehicle.newOwnerName" placeholder="" disabled >
                </Input>
            </FormItem>
            <FormItem  label="车牌号码:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userVehicle.reviseVehiclePlateNumber" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            <FormItem  label="车架号:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userVehicle.reviseVin" placeholder="" disabled >
                    
                </Input>
            </FormItem>
            <FormItem  label="发动机号:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userVehicle.reviseEngineNo" placeholder="" disabled >
                </Input>
            </FormItem>
            </Form>
        </div>
        <div style="float: left; width: 45%;" v-show="userFlag">
            <Form :label-width="140">
            <FormItem label="身份证图片:" >
                <Card class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="userIdCard.frontImage"
                            @click="showImg(userIdCard.frontImage)"/>
                    </div>
                    
                </Card>
            </FormItem>
            <FormItem label="修改前:" style="margin-bottom: 12px;">
                <div></div>
            </FormItem>
            <FormItem  label="姓名:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userIdCard.ownerName" placeholder="" disabled>
                </Input>
            </FormItem>
            <FormItem  label="身份证号:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userIdCard.idCardNo" placeholder="" disabled >
                    
                </Input>
            </FormItem>
            <FormItem label="修改后:" style="margin-bottom: 12px;">
                <div></div>
            </FormItem>
            <FormItem  label="姓名:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userIdCard.reviseOwnerName" placeholder="" disabled>
                </Input>
            </FormItem>
            <FormItem  label="身份证号:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userIdCard.reviseIdCardNo" placeholder="" disabled >
                    
                </Input>
            </FormItem>
            </Form>
        </div>

        <div style="float: left; width: 45%;" v-show="businessFlag">
            <Form :label-width="140">
            <FormItem label="营业执照图片:" >
                <Card class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="userBusiness.frontImage"
                            @click="showImg(userBusiness.frontImage)"/>
                    </div>
                    
                </Card>
            </FormItem>
            <FormItem label="修改前:" style="margin-bottom: 12px;">
                <div></div>
            </FormItem>
            <FormItem  label="企业名称:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userBusiness.corpName" placeholder="" disabled>
                </Input>
            </FormItem>
            <FormItem  label="法定代表人:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userBusiness.legalPerson" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            <FormItem label="修改后:" style="margin-bottom: 12px;">
                <div></div>
            </FormItem>
            <FormItem  label="企业名称:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userBusiness.reviseCorpName" placeholder="" disabled>
                </Input>
            </FormItem>
            <FormItem  label="法定代表人:" style="width: 400px;margin-bottom: 12px;" >
                <Input type="text" v-model="userBusiness.reviseLegalPerson" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            
        </Form>
        </div>
            
        <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div slot="footer">
            <Button  @click="updateStatus(2)" size="large" type="success"  >通过</Button>
            <Button  @click="updateStatus(3)" size="large" type="success"  >驳回</Button>
            <Button  size="large" type="default" @click="showModal=false;">返回</Button>
        </div>
  </Modal>
</template>

<script>
import { getName, getDictGroup, imgToBase64 } from '@/static/util.js'
export default {
    
	name: "car-audit-detail",
    props:['showDetail', 'detailData'],
    data(){
	return{
        spinShow:false,
        showModal:false,
        listSearch:{
        },   
        userIdCard:{
            frontImage:"",
            idCardNo:"",
            ownerName:"",
            reviseIdCardNo:"",
            reviseOwnerName:"",
        },//获取身份信息---------------
        userVehicle:{
            engineNo:"",
            frontImage:"",
            newOwnerName:"",
            ownerName:"",
            reviseEngineNo:"",
            reviseVehiclePlateNumber:"",
            reviseVin:"",
            vehiclePlateNumber:"",
            vin:"",
        },//获取车辆信息-----------
        userBusiness:{
            corpName:"",
            frontImage:"",
            legalPerson:"",
            reviseCorpName:"",
            reviseLegalPerson:"",
        },//营业执照信息-----
        userFlag:false,
        businessFlag:false,

      }
    },
    watch:{
        showDetail(){
            //进来数据初始化-------
            this.showModal=true;
            this.getDetail();
        },
    },
    mounted () {
        
    },
    methods:{
        showImg(img){
            this.$Modal.info({
            width: 90,
            title: '查看',
            closable: true,
            content: '<img src="'+img+'" style="width: 100%"/>'
            })
        },
        getDetail(){
            this.spinShow=true;
          this.$axios.get('/scan/checkDetail/'+this.detailData.vehicleId, {
          }).then( (res) => {
            if(res.data.code=='0'){
              this.listSearch=res.data.item;
              if(res.data.item.userVehicleTravelLicenseBO){
                  this.userVehicle=res.data.item.userVehicleTravelLicenseBO;
                  this.userVehicle['frontImage']="data:image/png;base64,"+this.userVehicle['frontImage'];
              }
              if(res.data.item.userIdCardBO){
                  this.userIdCard=res.data.item.userIdCardBO;
                  this.userFlag=true;
                  this.userIdCard['frontImage']="data:image/png;base64,"+this.userIdCard['frontImage'];
              }else{
                  this.userFlag=false;
              }

              if(res.data.item.userBusinessLicenseBO){
                  this.userBusiness=res.data.item.userBusinessLicenseBO;
                  this.businessFlag=true;
                  this.userBusiness['frontImage']="data:image/png;base64,"+this.userBusiness['frontImage'];
              }else{
                  this.businessFlag=false;
              }
              this.spinShow=false;
            }
          })
          
        },
        updateStatus(status){
            this.$axios.post('/scan/check', {
                
                "status": status,
                "vehicleId": this.detailData.vehicleId,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.showModal=false;
                    this.$Message.info("审核状态已更新");
                }else{
                    this.$Message.error(res.data.status);
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
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
.pic-card{
      display: inline-block;
      margin: 0 10px 10px 0;
      width: 350px;
      min-width: 250px;
      
      .red{
        color: red;
      }
      .pic-body{
        width: 100%;
        height: 200px;
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
