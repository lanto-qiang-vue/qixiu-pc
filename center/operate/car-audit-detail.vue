<!--绑定车辆审核详情2018-11-5-->
<template>

<Modal
    v-model="showModal"
    title="审核车辆"
    width="90"
    :scrollable="true"
    :transfer= "false"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
        <div style="height: 100%;overflow: auto;" class="car-audit-detail">
        <Form :label-width="80">
                <FormItem label="行驶证图片:" class="w60">
                    <div class="pic-body">
                        <img  class="pic" :src="travelLicenseImg" v-img/>
                    </div>
                  <div>
                    <Button type="default" @click="rotate('travelLicense', 90)">右转</Button>
                    <Button type="default" @click="rotate('travelLicense', 270)">左转</Button>
                    <Button type="default" @click="rotate('travelLicense', 180)">翻转</Button>
                    <Button type="default" @click="rotate('travelLicense', false)">还原</Button>
                  </div>
                </FormItem>
                <div class="w40">
                    <FormItem label="所有人:">
                      <div class="field" v-html="showChangeCar('ownerName')"></div>
                    </FormItem>
                    <FormItem label="车牌号码:">
                      <div class="field" v-html="showChangeCar('vehiclePlateNumber')"></div>
                    </FormItem>
                    <FormItem label="车架号:">
                      <div class="field" v-html="showChangeCar('vin')"></div>
                    </FormItem>
                    <FormItem label="发动机号:">
                      <div class="field" v-html="showChangeCar('engineNo')"></div>
                    </FormItem>
                    <FormItem label="发证日期:">
                      <div class="field" v-html="showChangeCar('issueDate')"></div>
                    </FormItem>
                </div>
            </Form>

            <Form :label-width="80"v-show="userFlag">
              <FormItem label="身份证图片:" class="w60">
                <div class="pic-body">
                  <img  class="pic" :src="idCardImg" v-img/>
                </div>
                <div>
                  <Button type="default" @click="rotate('idCard', 90)">右转</Button>
                  <Button type="default" @click="rotate('idCard', 270)">左转</Button>
                  <Button type="default" @click="rotate('idCard', 180)">翻转</Button>
                  <Button type="default" @click="rotate('idCard', false)">还原</Button>
                </div>
              </FormItem>

                <div class="w40">
                    <FormItem  label="姓名:">
                      <div class="field" v-html="showChangeId('ownerName')"></div>
                    </FormItem>
                    <FormItem  label="身份证号:">
                      <div class="field" v-html="showChangeId('idCardNo')"></div>
                    </FormItem>
                </div>
            </Form>

            <Form :label-width="80"v-show="businessFlag">
              <FormItem label="营业执照图片:" class="w60">
                <div class="pic-body">
                  <img  class="pic" :src="businessImg" v-img/>
                </div>
                <div>
                  <Button type="default" @click="rotate('business', 90)">右转</Button>
                  <Button type="default" @click="rotate('business', 270)">左转</Button>
                  <Button type="default" @click="rotate('business', 180)">翻转</Button>
                  <Button type="default" @click="rotate('business', false)">还原</Button>
                </div>
              </FormItem>

              <div class="w40">
                <FormItem  label="企业名称:">
                  <div class="field" v-html="showChangeBus('corpName')"></div>
                </FormItem>
                <FormItem  label="法定代表人:">
                  <div class="field" v-html="showChangeBus('legalPerson')"></div>
                </FormItem>
              </div>
            </Form>

        <Spin size="large" fix v-show="spinShow"></Spin>
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
import {deepClone, getName, getDictGroup, imgToBase64, rotateImg } from '@/static/util.js'
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
        // idCard:deepClone(initCard),//获取身份信息---------------
        // idCardRevise:deepClone(initCard),//获取身份信息---------------
        // travelLicense:deepClone(initVehice),//获取车辆信息-----------
        // travelLicenseRevise:deepClone(initVehice),//获取车辆信息-----------
        // business:deepClone(initBusiness),//营业执照信息-----
        // businessRevise:deepClone(initBusiness),//营业执照信息-----

    idCard: {},
    idCardRevise: {},
    travelLicense: {},
    travelLicenseRevise: {},
    business: {},
    businessRevise: {},

        userFlag:false,
        businessFlag:false,

        checkData:deepClone(initCheckData),
        commonValue:[],

    travelLicenseImg:'',
    idCardImg:'',
    businessImg:''
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
    computed:{
      showChangeCar(){
        return (field)=>{
          return this.compareHtml(this.travelLicense, this.travelLicenseRevise, field)
        }
      },
      showChangeId(){
        return (field)=>{
          return this.compareHtml(this.idCard, this.idCardRevise, field)
        }
      },
      showChangeBus(){
        return (field)=>{
          return this.compareHtml(this.business, this.businessRevise, field)
        }
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
                  this.travelLicense=res.data.item.travelLicense;
                  this.travelLicense['registerDate']=formatDate(this.travelLicense['registerDate']);
                  this.travelLicense['issueDate']=formatDate(this.travelLicense['issueDate']);

                  this.travelLicenseImg= res.data.item.travelLicense.frontImageUrl
              }

              if(res.data.item.travelLicenseRevise){
                  this.travelLicenseRevise=res.data.item.travelLicenseRevise;
                  this.travelLicenseRevise['registerDate']=formatDate(this.travelLicenseRevise['registerDate']);
                  this.travelLicenseRevise['issueDate']=formatDate(this.travelLicenseRevise['issueDate']);
              }

              if(res.data.item.business){
                  this.business=res.data.item.business;
                  this.businessFlag=true;

                this.businessImg= res.data.item.business.frontImageUrl
              }else{
                  this.businessFlag=false;
              }

              if(res.data.item.businessRevise){
                  this.businessRevise=res.data.item.businessRevise;
              }

              if(res.data.item.idCard){
                  this.idCard=res.data.item.idCard;
                  this.userFlag=true;

                this.idCardImg= res.data.item.idCard.frontImageUrl
              }else{
                  this.userFlag=false;
              }

              if(res.data.item.idCardRevise){
                  this.idCardRevise=res.data.item.idCardRevise;
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
                  this.$emit('closeDetail');
                }
            })
        },
        //获取公共数据--
        getValues(){
            this.$axios.get('/dict/getValuesByTypeId/35').then( (res) => {
                if(res.data.code=='0'){
                    this.commonValue=res.data.items;
                }
            })
        },
      compareHtml(original, later, field){
        let html=''
        if(original[field]== later[field]){
          html=  original[field]
        }else{
          html= ('<p><label>修改前：</label><span>'+original[field]+'</span></p><p><label>修改后：</label><span>'+
            this.compareLight(original, later, field)+'</span></p>')
        }
        return html
      },
      compareLight(original, later, field){
        let elRev=''
        if(original[field].length== later[field].length){
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
      rotate(name, rot){
        let url= this[name].frontImageUrl, imgUrl=''
          if(rot &&url){
            if(url ){
              if(url.indexOf('.com')>=0){
                imgUrl= '/staticArticle'+ url.split('.com')[1]
              }else if(url.indexOf('.org')>=0){
                imgUrl= '/staticArticle'+ url.split('.org')[1]
              }
            }
            rotateImg(imgUrl, rot,(base64)=>{
              this[name+'Img']= base64
            })
          }else{
            this[name+'Img']=  url
          }
      }
    },
}
</script>

<style scoped lang="less">
.car-audit-detail{

  .w60{
    float: left;
    width: 60%;
    margin-bottom: 20px;
  }
  .w40{
    float: left;
    width: 40%;
    margin-bottom: 20px;
  }
  .pic-body{
    padding-right: 10px;
    margin-bottom: 10px;
    line-height: 0;
    img{
      width: 100%;
    }
  }

}
</style>
<style lang="less">
.car-audit-detail{
  .ivu-form-item{
    margin-bottom: 0;
  }
  .ivu-form-item-content{
    font-size: 14px;
  }
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
}
</style>
