<!--绑定车辆审核详情2018-11-5-->
<template>

<Modal
    v-model="showModal"
    title="审核车辆"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "false"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
        <div style="height: 100%;overflow: auto;">
        <div style="float: left; width: 90%;">
            <Form :label-width="140">
                <FormItem label="行驶证图片:">
                    <Card class="pic-card">
                        <div class="pic-body">
                            <img  class="pic" :src="userVehicle.frontImageUrl" v-img/>
                        </div>
                    </Card>
                </FormItem>
                <div style="float: left; width: 45%;">
                    <FormItem label="修改前:" style="margin-bottom: 12px;">
                        <div></div>
                    </FormItem>
                    <FormItem  label="所有人:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userVehicle.ownerName}}</span>
                    </FormItem>
                    <FormItem  label="车牌号码:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userVehicle.vehiclePlateNumber}}</span>
                    </FormItem>
                    <FormItem  label="车架号:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userVehicle.vin}}</span>
                    </FormItem>
                    <FormItem  label="发动机号:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userVehicle.engineNo}}</span>
                    </FormItem>
                    <!--<FormItem  label="住址:" style="width:100%;margin-bottom: 12px;" v-show="judgeData(userVehicle['address'],userVehicleResive['address'])">
                        <span>{{userVehicle.address}}</span>
                    </FormItem>
                    <FormItem  label="车辆类型:" style="width:100%;margin-bottom: 12px;" v-show="judgeData(userVehicle['vehicleType'],userVehicleResive['vehicleType'])">
                        <span>{{userVehicle.vehicleType}}</span>
                    </FormItem>
                    <FormItem  label="使用性质:" style="width:100%;margin-bottom: 12px;" v-show="judgeData(userVehicle['useNature'],userVehicleResive['useNature'])">
                        <span>{{userVehicle.useNature}}</span>
                    </FormItem>
                    <FormItem  label="品牌型号:" style="width:100%;margin-bottom: 12px;" v-show="judgeData(userVehicle['brandModel'],userVehicleResive['brandModel'])">
                        <span>{{userVehicle.brandModel}}</span>
                    </FormItem>
                    <FormItem  label="注册日期:" style="width:100%;margin-bottom: 12px;" v-show="judgeData(userVehicle['registerDate'],userVehicleResive['registerDate'])">
                        <span>{{userVehicle.registerDate}}</span>
                    </FormItem>-->
                    <FormItem  label="发证日期:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userVehicle.issueDate}}</span>
                    </FormItem>
                </div>
                <div style="float: left; width: 45%;">
                    <FormItem label="修改后:" style="margin-bottom: 12px;">
                        <div></div>
                    </FormItem>
                    <FormItem  label="所有人:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userVehicleResive.ownerName}}</span>
                    </FormItem>
                    <FormItem  label="车牌号码:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userVehicleResive.vehiclePlateNumber}}</span>
                    </FormItem>
                    <FormItem  label="车架号:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userVehicleResive.vin}}</span>
                    </FormItem>
                    <FormItem  label="发动机号:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userVehicleResive.engineNo}}</span>
                    </FormItem>
                    <!--<FormItem  label="住址:" style="width:100%;margin-bottom: 12px;" v-show="judgeData(userVehicle['address'],userVehicleResive['address'])">
                        <span>{{userVehicleResive.address}}</span>
                    </FormItem>
                    <FormItem  label="车辆类型:" style="width:100%;margin-bottom: 12px;" v-show="judgeData(userVehicle['vehicleType'],userVehicleResive['vehicleType'])">
                        <span>{{userVehicleResive.vehicleType}}</span>
                    </FormItem>
                    <FormItem  label="使用性质:" style="width:100%;margin-bottom: 12px;" v-show="judgeData(userVehicle['useNature'],userVehicleResive['useNature'])">
                        <span>{{userVehicleResive.useNature}}</span>
                    </FormItem>
                    <FormItem  label="品牌型号:" style="width:100%;margin-bottom: 12px;" v-show="judgeData(userVehicle['brandModel'],userVehicleResive['brandModel'])">
                        <span>{{userVehicleResive.brandModel}}</span>
                    </FormItem>
                    <FormItem  label="注册日期:" style="width:100%;margin-bottom: 12px;" v-show="judgeData(userVehicle['registerDate'],userVehicleResive['registerDate'])">
                        <span>{{userVehicleResive.registerDate}}</span>
                    </FormItem>-->
                    <FormItem  label="发证日期:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userVehicleResive.issueDate}}</span>
                    </FormItem>
                </div>
            </Form>
        </div>
        <div style="float: left; width: 90%;" v-show="userFlag">
            <Form :label-width="140">
                <FormItem label="身份证图片:" >
                    <Card class="pic-card">
                        <div class="pic-body">
                            <img  class="pic" :src="userIdCard.frontImageUrl" v-img/>
                        </div>
                    </Card>
                </FormItem>
                <div style="float: left; width: 45%;">
                    <FormItem label="修改前:" style="margin-bottom: 12px;">
                        <div></div>
                    </FormItem>
                    <FormItem  label="姓名:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userIdCard.ownerName}}</span>
                    </FormItem>
                    <FormItem  label="身份证号:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userIdCard.idCardNo}}</span>
                    </FormItem>
                </div>
                <div style="float: left; width: 45%;">
                    <FormItem label="修改后:" style="margin-bottom: 12px;">
                        <div></div>
                    </FormItem>
                    <FormItem  label="姓名:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userIdCardResive.ownerName}}</span>
                    </FormItem>
                    <FormItem  label="身份证号:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userIdCardResive.idCardNo}}</span>
                    </FormItem>
                </div>
            </Form>
        </div>

        <div style="float: left; width: 90%;" v-show="businessFlag">
            <Form :label-width="140">
                <FormItem label="营业执照图片:" >
                    <Card class="pic-card">
                        <div class="pic-body">
                            <img  class="pic" :src="userBusiness.frontImageUrl" v-img/>
                        </div>
                    </Card>
                </FormItem>
                <div style="float: left; width: 45%;">
                    <FormItem label="修改前:" style="margin-bottom: 12px;">
                        <div></div>
                    </FormItem>
                    <FormItem  label="企业名称:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userBusiness.corpName}}</span>
                    </FormItem>
                    <FormItem  label="法定代表人:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userBusiness.legalPerson}}</span>
                    </FormItem>
                </div>
                <div style="float: left; width: 45%;">
                    <FormItem label="修改后:" style="margin-bottom: 12px;">
                        <div></div>
                    </FormItem>
                    <FormItem  label="企业名称:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userBusinessResive.corpName}}</span>
                    </FormItem>
                    <FormItem  label="法定代表人:" style="width:100%;margin-bottom: 12px;" >
                        <span>{{userBusinessResive.legalPerson}}</span>
                    </FormItem>
                </div>
                
                
                
            </Form>
        </div>
            
        <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div slot="footer">
            <Button  @click="updateStatus(2)" size="large" type="success" v-if="accessBtn('edit')" >通过</Button>
            <Button  @click="showEdit=true" size="large" type="success" v-if="accessBtn('edit')" >驳回</Button>
            <Button  size="large" type="default" @click="showModal=false;">返回</Button>
        </div>
        <!--审核状态-->
        <Modal title="审核"
            width="600"
            v-model="showEdit"
            :mask-closable="false">
                <Form :label-width="90">
                    <FormItem label="不通过理由:"  >
                        <CheckboxGroup v-model="checkData.auditFailInfo">
                            <Checkbox v-for="item in commonValue" :key="item.id" :label="item.id" style="width: 220px;">{{item.name}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="自定义理由:" style="width:400px;">
                        <Input v-model="checkData.customFailInfo" type="textarea" :rows="4" placeholder="" />
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button size="large" type="success" @click="updateStatus(3)">确定</Button>
                </div>
        </Modal>
  </Modal>
</template>

<script>
import {deepClone, getName, getDictGroup, imgToBase64 } from '@/static/util.js'
import funMixin from '~/components/fun-auth-mixim.js'
import { formatDate } from '@/static/tools.js'
let initCheckData={
    "auditFailInfo": [],
    "customFailInfo": '',
    "status": '',
    "vehicleId": ''
}

let initVehice={
    "address": "",
    "brandModel": "",
    "engineNo": "",
    "id": 0,
    "issueDate": "",
    "ownerName": "",
    "registerDate": "",
    "useNature": "",
    "vehiclePlateNumber": "",
    "vehicleType": "",
    "vin": "",
    frontImage:"",
    frontImageUrl:'',
}
let initCard={
    idCardNo:'',
    ownerName:'',
    frontImage:"",
    frontImageUrl:'',
    id:'',
}
let initBusiness={
    "address": "",
      "corpName": "",
      "expiryDate": "",
      "expiryDateStr": "",
      "frontImageUrl": "",
      "id": 0,
      "legalPerson": "",
      "licenseNo": "",
      "socialCreditCode": ""
}
export default {
    
	name: "car-audit-detail",
    props:['showDetail', 'detailData'],
    mixins: [funMixin],
    data(){
	return{
        spinShow:false,
        showModal:false,
        showEdit:false,
        userIdCard:deepClone(initCard),//获取身份信息---------------
        userIdCardResive:deepClone(initCard),//获取身份信息---------------
        userVehicle:deepClone(initVehice),//获取车辆信息-----------
        userVehicleResive:deepClone(initVehice),//获取车辆信息-----------
        userBusiness:deepClone(initBusiness),//营业执照信息-----
        userBusinessResive:deepClone(initBusiness),//营业执照信息-----
        userFlag:false,
        businessFlag:false,

        checkData:deepClone(initCheckData),
        commonValue:[],
      }
    },
    watch:{
        showDetail(){
            //进来数据初始化-------
            this.showModal=true;
            this.getDetail();
            this.getValues();
            this.checkData=deepClone(initCheckData);
            this.checkData['vehicleId']=this.detailData.vehicleId;
        },
    },
    mounted () {
        
    },
    methods:{
        getDetail(){
            this.spinShow=true;
          this.$axios.get('/scan/auditDetail/'+this.detailData.vehicleId, {
          }).then( (res) => {
            if(res.data.code=='0'){

              if(res.data.item.travelLicense){
                  this.userVehicle=res.data.item.travelLicense;
                  this.userVehicle['registerDate']=formatDate(this.userVehicle['registerDate']);
                  this.userVehicle['issueDate']=formatDate(this.userVehicle['issueDate']);
              }

              if(res.data.item.travelLicenseRevise){
                  this.userVehicleResive=res.data.item.travelLicenseRevise;
                  this.userVehicleResive['registerDate']=formatDate(this.userVehicleResive['registerDate']);
                  this.userVehicleResive['issueDate']=formatDate(this.userVehicleResive['issueDate']);
              }

              if(res.data.item.business){
                  this.userBusiness=res.data.item.business;
                  this.businessFlag=true;
              }else{
                  this.businessFlag=false;
              }

              if(res.data.item.businessRevise){
                  this.userBusinessResive=res.data.item.businessRevise;
              }

              if(res.data.item.idCard){
                  this.userIdCard=res.data.item.idCard;
                  this.userFlag=true;
              }else{
                  this.userFlag=false;
              }

              if(res.data.item.idCardRevise){
                  this.userIdCardResive=res.data.item.idCardRevise;
              }
            
              this.spinShow=false;
            }
          })
          
        },
        updateStatus(status){
            this.checkData['status']=status;
            this.$axios.post('/scan/check', this.checkData).then( (res) => {
                if(res.data.code=='0'){
                    this.showEdit=false;
                    this.showModal=false;
                    this.$Message.info("审核状态已更新");
                }
            })
        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            
          }
        },
        //获取公共数据--
        getValues(){
            this.$axios.get('/dict/getValuesByTypeId/35').then( (res) => {
                if(res.data.code=='0'){
                    this.commonValue=res.data.items;
                }
            })
        },
        //审核相同数据不显示--
        judgeData(name,name1){
            let flag=true;
            if(name===name1){
                flag=false;
            }
            return flag;
        }
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
