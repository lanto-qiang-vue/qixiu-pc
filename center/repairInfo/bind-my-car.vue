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
    class="table-modal-detail "
    :transition-names="['', '']">
        <div style="height: 100%;overflow: auto;" class="bind-my-car">

        <Form :label-width="140">
            <FormItem label="审核不通过原因:" style="width: 90%;" v-show="auditFailInfo">
                <span style="color: red;">{{auditFailInfo}}</span>
            </FormItem>
            <FormItem label="绑定类型:" style="width: 400px;">
                <Select v-model="ownerType" @on-change="selectBindType" :disabled="commonFlag">
                    <Option v-for="item in bindTypeArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="上传行驶证:" style="margin-bottom: 12px;" v-show="!commonFlag">
                <div class="pic-card" v-if="accessBtn('uploadDriverLicense')">
                    <div class="pic-body" style="height: 40px;">
                        <div class="button"  style="text-align: left;">
                            <div class="up-img">
                            <Button type="primary" :loading="loadImg" :disabled="commonFlag">上传图片</Button>
                            <input id="fileupload" class="input" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"
                                    @change="getDriverImg('frontImageUrl', $event)"/>

                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>

                    </div>
                </div>
            </FormItem>
            <FormItem label="行驶证图片:" v-show="infoDriverData.frontImageUrl">
                <Card class="pic-card">
                    <div class="pic-body">
                        <img class="pic" :src="infoDriverData.frontImageUrl" v-img/>
                    </div>
                </Card>
            </FormItem>
                <div style="overflow: hidden;" v-show="infoDriverData.frontImageUrl">
                    <div style="float: left; width: 45%;">
                        <FormItem label="修改前:" style="margin-bottom: 12px;">
                            <div></div>
                        </FormItem>
                        <FormItem  label="所有人:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoDriverData.ownerName}}</span>
                        </FormItem>
                        <FormItem  label="车牌号码:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoDriverData.vehiclePlateNumber}}</span>
                        </FormItem>
                        <FormItem  label="车架号:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoDriverData.vin}}</span>
                        </FormItem>
                        <FormItem  label="发动机号:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoDriverData.engineNo}}</span>
                        </FormItem>
                        <!--<FormItem  label="住址:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoDriverData.address}}</span>
                        </FormItem>
                        <FormItem  label="车辆类型:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoDriverData.vehicleType}}</span>
                        </FormItem>
                        <FormItem  label="使用性质:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoDriverData.useNature}}</span>
                        </FormItem>
                        <FormItem  label="品牌型号:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoDriverData.brandModel}}</span>
                        </FormItem>
                        <FormItem  label="注册日期:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoDriverData.registerDate}}</span>
                        </FormItem>-->
                        <FormItem  label="发证日期:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoDriverData.issueDate}}</span>
                        </FormItem>
                        <FormItem style="width: 400px;margin-bottom: 12px;" v-show="infoDriverData.frontImageUrl">
                            <Button type="primary" @click="updateDriver" :disabled="commonFlag">修改信息</Button>
                        </FormItem>
                    </div>
                    <div style="float: left; width: 45%;" v-show="displayDriverResive">
                        <FormItem label="修改后:" style="margin-bottom: 12px;">
                            <div></div>
                        </FormItem>
                        <FormItem  label="所有人:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseDriverData.ownerName}}</span>
                        </FormItem>
                        <FormItem  label="车牌号码:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseDriverData.vehiclePlateNumber}}</span>
                        </FormItem>
                        <FormItem  label="车架号:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseDriverData.vin}}</span>
                        </FormItem>
                        <FormItem  label="发动机号:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseDriverData.engineNo}}</span>
                        </FormItem>
                        <!--<FormItem  label="住址:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseDriverData.address}}</span>
                        </FormItem>
                        <FormItem  label="车辆类型:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseDriverData.vehicleType}}</span>
                        </FormItem>
                        <FormItem  label="使用性质:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseDriverData.useNature}}</span>
                        </FormItem>
                        <FormItem  label="品牌型号:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseDriverData.brandModel}}</span>
                        </FormItem>
                        <FormItem  label="注册日期:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseDriverData.registerDate}}</span>
                        </FormItem>-->
                        <FormItem  label="发证日期:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseDriverData.issueDate}}</span>
                        </FormItem>
                    </div>
                </div>

        </Form>
        <!--上传身份证信息-->
        <Form :label-width="140" v-show="ownerType===1">
            <FormItem label="上传身份证(头像面):" style="margin-bottom: 12px;" v-show="upIdButton" >
                <div class="pic-card" v-if="accessBtn('newUpload')">
                    <div class="pic-body" style="height: 40px;">
                        <div class="button"  style="text-align: left;">
                            <div class="up-img">
                            <Button type="primary" :loading="loading" :disabled="commonFlag">上传图片</Button>
                            <input id="getImg" class="input" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"
                                    @change="getImg('frontImageUrl', $event)"/>
                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>
                    </div>
                </div>
            </FormItem>
            <FormItem label="身份证图片:" v-show="infoData.frontImageUrl">
                <Card class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="infoData.frontImageUrl" v-img/>
                    </div>
                </Card>
            </FormItem>
            <div style="overflow: hidden;" v-show="infoData.frontImageUrl">
                    <div style="float: left; width: 45%;">
                        <FormItem label="修改前:" style="margin-bottom: 12px;">
                            <div></div>
                        </FormItem>
                        <FormItem  label="姓名:" style="width:100%;margin-bottom: 12px;">
                            <span>{{infoData.ownerName}}</span>
                        </FormItem>
                        <FormItem  label="身份证号:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{infoData.idCardNo}}</span>
                        </FormItem>
                        <FormItem style="width: 400px;margin-bottom: 12px;" v-show="editIDCard" >
                            <Button type="primary" @click="updateIdFun" :disabled="commonFlag">修改信息</Button>
                        </FormItem>
                    </div>
                    <div style="float: left; width: 45%;" v-show="displayCardResive">
                        <FormItem label="修改后:" style="margin-bottom: 12px;">
                            <div></div>
                        </FormItem>
                        <FormItem  label="姓名:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseInfoData.ownerName}}</span>
                        </FormItem>
                        <FormItem  label="身份证号:" style="width:100%;margin-bottom: 12px;">
                            <span>{{reviseInfoData.idCardNo}}</span>
                        </FormItem>
                    </div>
            </div>


        </Form>
        <!--上传营业执照信息-->
        <Form :label-width="140" v-show="ownerType===2">
            <FormItem label="上传营业执照:" style="margin-bottom: 12px;" v-show="upIdBusine" >
                <div class="pic-card" v-if="accessBtn('newUpload')">
                    <div class="pic-body" style="height: 40px;">
                        <div class="button"  style="text-align: left;">
                            <div class="up-img">
                            <Button type="primary" :loading="loadBusine" :disabled="commonFlag">上传图片</Button>
                            <input  class="input" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"
                                    @change="getBusineImg('imageUrl', $event)"/>
                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>
                    </div>
                </div>
            </FormItem>
            <FormItem label="营业执照图片:" v-show="infoBusine.frontImageUrl">
                <Card class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="infoBusine.frontImageUrl" v-img/>
                    </div>

                </Card>
            </FormItem>
            <div style="overflow: hidden;" v-show="infoBusine.frontImageUrl">
                    <div style="float: left; width: 45%;">
                        <FormItem label="修改前:" style="margin-bottom: 12px;">
                            <div></div>
                        </FormItem>
                        <FormItem  label="企业名称:" style="width: 100%;margin-bottom: 12px;" >
                            <span>{{infoBusine.corpName}}</span>
                        </FormItem>
                        <FormItem  label="法定代表人:" style="width: 100%;margin-bottom: 12px;" >
                            <span>{{infoBusine.legalPerson}}</span>
                        </FormItem>
                        <FormItem style="width: 400px;margin-bottom: 12px;" v-show="infoBusine.frontImageUrl" >
                            <Button type="primary" @click="updateBusineFun" :disabled="commonFlag">修改信息</Button>
                        </FormItem>
                    </div>
                    <div style="float: left; width: 45%;" v-show="displayBusine">
                        <FormItem label="修改后:" style="margin-bottom: 12px;">
                            <div></div>
                        </FormItem>
                        <FormItem  label="企业名称:" style="width:100%;margin-bottom: 12px;" >
                            <span>{{reviseBusine.corpName}}</span>
                        </FormItem>
                        <FormItem  label="法定代表人:" style="width:100%;margin-bottom: 12px;">
                            <span>{{reviseBusine.legalPerson}}</span>
                        </FormItem>
                    </div>
            </div>


        </Form>


        </div>
        <div slot="footer">
            <Button v-if="accessBtn('bind')"  @click="bindFun" size="large" type="success" :disabled="commonFlag">提交</Button>
            <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
        </div>
        <!--修改身份信息-->
        <Modal title="修改身份信息"
            width="500"
            v-model="showCard"
            :mask-closable="false">
                <Form :label-width="80" ref="infoDataTem" :rules="ruleCard"  :model="infoDataTem">
                    <FormItem label="姓名:" style="width: 400px;" prop="ownerName">
                        <Input type="text" v-model="infoDataTem.ownerName" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="身份证号:" style="width: 400px;" prop="idCardNo">
                        <Input type="text" v-model="infoDataTem.idCardNo" placeholder="" :maxlength="18"></Input>
                    </FormItem>

                </Form>
                <div slot="footer">
                    <Button v-if="accessBtn('update')"  @click="updateCard('infoDataTem')" size="large" type="success"  style="margin-right: 10px;">提交</Button>
                    <Button  size="large" type="default" style="margin-right: 10px;" @click="showCard=false;">返回</Button>
                </div>
        </Modal>
        <!--修改营业执照-->
        <Modal title="修改营业执照信息"
            width="500"
            v-model="showBusine"
            :mask-closable="false">
                <Form :label-width="80" ref="infoBusineTem" :rules="ruleBusine"  :model="infoBusineTem">
                    <FormItem label="企业名称:" style="width: 400px;" prop="corpName">
                        <Input type="text" v-model="infoBusineTem.corpName" placeholder="" :maxlength="50"></Input>
                    </FormItem>
                    <FormItem label="法人代表:" style="width: 400px;" prop="legalPerson">
                        <Input type="text" v-model="infoBusineTem.legalPerson" placeholder="" :maxlength="20"></Input>
                    </FormItem>

                </Form>
                <div slot="footer">
                    <Button v-if="accessBtn('update')"  @click="updateBusine('infoBusineTem')" size="large" type="success"  style="margin-right: 10px;">提交</Button>
                    <Button  size="large" type="default" style="margin-right: 10px;" @click="showBusine=false;">返回</Button>
                </div>
        </Modal>
        <!--修改驾驶证信息-->
        <Modal title="修改驾驶证信息"
            width="500"
            v-model="showDriver"
            :mask-closable="false">
                <Form :label-width="120" ref="infoDriverDataTem" :rules="ruleDriver"  :model="infoDriverDataTem">
                    <FormItem label="所有人:" style="width: 90%;" prop="ownerName">
                        <Input type="text" v-model="infoDriverDataTem.ownerName" placeholder="" :maxlength="20"></Input>
                    </FormItem>
                    <!--<FormItem label="住址:" style="width: 400px;" prop="address">
                        <Input type="text" v-model="infoDriverDataTem.address" placeholder="" :maxlength="20"></Input>
                    </FormItem>-->
                    <FormItem label="车牌号码:" style="width: 90%;" prop="vehiclePlateNumber">
                        <Input type="text" v-model="infoDriverDataTemVehiclePlateNumber" placeholder=""></Input>
                    </FormItem>
                    <!--<FormItem label="品牌型号:" style="width: 400px;" prop="brandModel">
                        <Input type="text" v-model="infoDriverDataTem.brandModel" placeholder="" :maxlength="20"></Input>
                    </FormItem>-->
                    <FormItem label="车架号(VIN):" style="width: 90%;" prop="vin">
                        <Input type="text" v-model="infoDriverDataTemVin" placeholder="" :maxlength="17"></Input>
                    </FormItem>
                    <FormItem label="发动机号:" style="width: 90%;" prop="engineNo">
                        <Input type="text" v-model="infoDriverDataTem.engineNo" placeholder="" :maxlength="20"></Input>
                    </FormItem>

                    <!--<FormItem label="车辆类型:" style="width: 400px;" prop="vehicleType">
                        <Input type="text" v-model="infoDriverDataTem.vehicleType" placeholder="" :maxlength="20"></Input>
                    </FormItem>

                    <FormItem label="使用性质:" style="width: 400px;" prop="useNature">
                        <Input type="text" v-model="infoDriverDataTem.useNature" placeholder="" :maxlength="20"></Input>
                    </FormItem>

                    <FormItem label="注册日期:" style="width: 400px;" prop="registerDate">

                        <DatePicker v-model="infoDriverDataTem.registerDate" type="date" placeholder="" style="width: 100%;"></DatePicker>
                    </FormItem>-->
                    <FormItem label="发证日期:" style="width: 90%;" prop="issueDate">

                        <DatePicker v-model="infoDriverDataTem.issueDate" type="date" placeholder="" style="width: 100%;"></DatePicker>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button v-if="accessBtn('update')"  @click="updateDriverFun('infoDriverDataTem')" size="large" type="success" >提交</Button>
                    <Button  size="large" type="default" @click="showDriver=false;">返回</Button>
                </div>
        </Modal>
  </Modal>
</template>

<script>
import { getName, getDictGroup, imgToBase64 ,deepClone,reg} from '@/static/util.js'
import { formatDate } from '@/static/tools.js'
import funMixin from '~/components/fun-auth-mixim.js'
let commonRule={ required: true, message: '请填写信息', };
let initDriver={
    "address": "",
    "brandModel": "",
    "engineNo": "",
    "id": '',
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
      "id": '',
      "legalPerson": "",
      "licenseNo": "",
      "socialCreditCode": ""
}
export default {
	name: "bind-my-car",
    props:['showDetail', 'detailData'],
    mixins: [funMixin],
    data(){


	return{
        showModal:false,
        loading:false,//按钮上传进度状态
        loadImg:false,//按钮上传进度状态
        loadBusine:false,//按钮上传进度状态
        showBusine:false,//修改营业执照界面
        showDriver:false,//修改驾驶证界面
        showCard:false,//修改身份证界面


        ownerType:1,
        infoData:deepClone(initCard),
        reviseInfoData:deepClone(initCard),
        infoDataTem:deepClone(initCard),
        bindTypeArr:[
            {code:1,name:'个人车辆'},
            {code:2,name:'企业车辆'},
        ],

        infoDriverData:deepClone(initDriver),
        reviseDriverData:deepClone(initDriver),
        infoDriverDataTem:deepClone(initDriver),
        editIDCard:false,//是否修改身份按钮
        upIdButton:false,//是否显示上传按钮
        upIdBusine:false,//是否显示上传按钮

        ruleCard:{
            ownerName:[commonRule],
            idCardNo: [commonRule,
                {
                    validator: (rule, value, callback) => {
                      if (reg.idcard.test(value)) {

                        callback();
                      } else {
                        callback(new Error('请输入正确的身份证号码'));
                      }
                    }
                }],
        },

        ruleDriver:{
            ownerName:[commonRule],
            vehiclePlateNumber: [
                commonRule,
                {
                    validator: (rule, value, callback) => {
                      if (reg.vehicle.test(value)) {

                        callback();
                      } else {
                        callback(new Error('请输入正确的车牌号码'));
                      }
                    }
                }

            ],
            vin: [commonRule,
                {
                    validator: (rule, value, callback) => {
                      if (reg.vin.test(value)) {

                        callback();
                      } else {
                        callback(new Error('请输入正确的车架号'));
                      }
                    }
                }],
            engineNo: [commonRule],
            address: [commonRule],
            brandModel: [commonRule],
            issueDate: [commonRule],
            registerDate: [commonRule],
            useNature: [commonRule],
            vehicleType: [commonRule],
        },
        infoBusine:deepClone(initBusiness),
        reviseBusine:deepClone(initBusiness),
        infoBusineTem:deepClone(initBusiness),
        ruleBusine:{
            corpName:[commonRule],
            legalPerson: [commonRule],
        },
        auditFailInfo:'',
        displayDriverResive:false,
        displayCardResive:false,
        displayBusine:false,
        commonFlag:false,
        typeId:'',

      }
    },
    watch:{
        showDetail(){
            //进来数据初始化-------
            this.showModal=true;
            this.ownerType=1;
            this.commonFlag=false;
            this.auditFailInfo='';


            this.editIDCard=false;
            this.upIdButton=false;
            this.upIdBusine=false;

            //行驶证信息-----
            this.displayDriverResive=false;
            //身份证信息-----
            this.displayCardResive=false;
            //营业执照信息---
            this.displayBusine=false;

            this.infoData=deepClone(initCard);
            this.infoDriverData=deepClone(initDriver);
            this.infoBusine=deepClone(initBusiness);

            if(this.detailData){
                this.getDetail();
                this.typeId=this.detailData.id;
                if(this.detailData.status!=3){
                    this.commonFlag=true;
                }
            }else{
                this.typeId='';
            }

            this.getCard();
        },
    },
    mounted () {

    },
    computed:{
        infoDriverDataTemVehiclePlateNumber:{
                get(){
                    return this.infoDriverDataTem.vehiclePlateNumber;
                },
                set(val){
                    this.infoDriverDataTem.vehiclePlateNumber = val.toUpperCase();
                }
            },
            infoDriverDataTemVin:{
                get(){
                    return this.infoDriverDataTem.vin;
                },
                set(val){
                    this.infoDriverDataTem.vin = val.toUpperCase();
                }
            }
    },
    methods:{
        //上传身份图片----------
        getImg(name, e){
            imgToBase64(e.target.files[0], (base64, fileName)=> {
                let newBase=base64.split(',');
                this.infoData['frontImage']= newBase[1];
                this.newUpload();
                e.target.value='';
            })
        },

        newUpload(){
            this.loading=true;
            this.$axios.post('/scan/newUpload', {
                "accuracy": "",
                "detect_direction": true,
                "detect_risk": false,
                "id_card_side": "front",
                "image": this.infoData['frontImage'],
                "property": 1,
            }).then( (res) => {
                this.loading=false;
                if(res.data.code=='0'){
                    this.editIDCard=true;

                    for(let i in res.data.item){
                        this.infoData[i]=res.data.item[i];
                    }
                    this.displayCardResive=false;
                    this.infoData['frontImageUrl']= 'data:image/png;base64,'+this.infoData['frontImage'];
                    this.infoData['id']=res.data.item.creditId;
                }
           })
        },
        //上传行驶图片----------
        getDriverImg( name, e){
            imgToBase64(e.target.files[0], (base64, fileName)=> {
                let newBase=base64.split(',');
                this.infoDriverData['frontImage']= newBase[1];
                this.newDriverLicense();
                e.target.value='';
            })
        },
        newDriverLicense(){
            this.loadImg=true;
            this.$axios.post('/scan/newDriverLicense', {
                "accuracy": "",
                "detect_direction": true,
                "image": this.infoDriverData.frontImage,
            }).then( (res) => {
                this.loadImg=false;
                if(res.data.code=='0'){
                    for(let i in res.data.item){
                        this.infoDriverData[i]=res.data.item[i];
                    }
                    this.displayDriverResive=false;
                   this.infoDriverData.frontImageUrl='data:image/png;base64,'+this.infoDriverData['frontImage'];
                }else{
                    // this.$Message.info(res.data.status)
                }
           })
        },
        //获取身份信息---------------
        getCard(){
            this.$axios.get('/scan/getCard', {
            }).then( (res) => {
                if(res.data.code=='0'){
                    if(res.data.item&&res.data.item.creditId){
                        this.upIdButton=false;
                        this.editIDCard=false;

                        this.infoData['idCardNo']=res.data.item.idCardNo;
                        this.infoData['ownerName']=res.data.item.ownerName;
                        this.infoData['frontImageUrl']=res.data.item.frontImageUrl;
                        this.infoData['id']=res.data.item.creditId;

                        if(res.data.item.reviseIdCardNo&&res.data.item.reviseOwnerName){
                            this.reviseInfoData['idCardNo']=res.data.item.reviseIdCardNo;
                            this.reviseInfoData['ownerName']=res.data.item.reviseOwnerName;
                            this.displayCardResive=true;
                        }
                    }
                }
           })
        },
        //修改身份信息----------------
        updateIdFun(){
            this.showCard=true;
            for(let i in this.infoData){
                this.infoDataTem[i]=this.infoData[i];
            }
        },
        updateCard(name){
            let uploadInfo=deepClone(this.infoDataTem);
           this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/idcard/update', uploadInfo).then( (res) => {
                        if(res.data.code=='0'){
                            this.showCard=false;
                            this.displayCardResive=true;
                            for(let i in this.infoDataTem){
                                this.reviseInfoData[i]=this.infoDataTem[i];
                            }
                            this.$Message.info('修改成功')
                        }else{
                            // this.$Message.info(res.data.status)
                        }
                    })
                }
            });
        },
        //修改驾驶证信息-----------
        updateDriver(){
            this.showDriver=true;
            for(let i in this.infoDriverData){
                this.infoDriverDataTem[i]=this.infoDriverData[i];
            }
        },
        updateDriverFun(name){
           let upLoadData=deepClone(this.infoDriverDataTem);
           upLoadData['registerDate']=formatDate(upLoadData['registerDate']);
           upLoadData['issueDate']=formatDate(upLoadData['issueDate']);

           this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/travellicense/update', upLoadData).then( (res) => {
                        if(res.data.code=='0'){
                            this.showDriver=false;
                            this.displayDriverResive=true;
                            for(let i in upLoadData){
                                this.reviseDriverData[i]=upLoadData[i];
                            }
                            this.$Message.info('修改成功');
                        }
                    })
                }
            });
        },
        //提交绑定按钮-----------
        bindFun(){

            if(!this.displayDriverResive){
                for(let key in this.infoDriverData){
					let val= this.infoDriverData[key]
					switch (key){
            case 'vehiclePlateNumber': {
                            console.log(val,reg.vehicle.test(val));
							if(!reg.vehicle.test(val)){
								return this.$Message.error('车牌号格式不正确，请修改')
							}
              break;
						}
            case 'vin': {
							if(!reg.vin.test(val)){
								return this.$Message.error('vin格式不正确，请修改')
							}
              break;
						}
            case 'ownerName':
						case 'issueDate':
						case 'engineNo':{
							if(!val) return this.$Message.error('行驶证有空值，请修改')
              break;
						}
					}
				}
            }

            if(this.ownerType==1){
                if(this.infoData.id){
                    if(!this.displayCardResive){

                            if(!this.infoData['idCardNo']&&!this.infoData['ownerName']){
                                return this.$Message.error('身份证信息不可为空');
                            }
                            if(!reg.idcard.test(this.infoData['idCardNo'])){
                                return this.$Message.error('身份证信息格式不正确，请修改');
                            }

                    }
                }

            }else if(this.ownerType==2){
                if(this.infoBusine.id){
                    if(!this.displayBusine){

                            if(!this.infoBusine['legalPerson']&&!this.infoBusine['corpName']){
                                return this.$Message.error('营业执照信息不可为空');
                            }
                    }
                }


            }




            this.$axios.post('/scan/newBind', {
                "businessId": this.infoBusine.id,
                "idCardId": this.infoData.id,
                "licenseId": this.infoDriverData.id,
                "vehicleId":this.typeId,
                "ownerType":this.ownerType,

            }).then( (res) => {
                if(res.data.code=='0'){
                   this.$Message.info('绑定成功');
                   this.showModal=false;
                }else if(res.data.code=='10002'){
                    if(this.ownerType==1){
                        this.upIdButton=true;

                    }else if(this.ownerType==2){
                        this.upIdBusine=true;
                    }
                    setTimeout(()=>{
                        document.querySelector('.bind-my-car').scrollTop= 1000;
                    },30)


                }
           })
        },
        //营业执照上传-----------
        getBusineImg( name, e){
            imgToBase64(e.target.files[0], (base64, fileName)=> {
                let newBase=base64.split(',');
                // this.infoDriver[name]= base64;
                this.infoBusine['frontImage']= newBase[1];
                this.uploadBusine();
            })
        },
        uploadBusine(){
            this.loadBusine=true;
            this.$axios.post('/scan/newUpload', {
                "accuracy": "",
                "detect_direction": true,
                "detect_risk": false,
                "id_card_side": "front",
                "image": this.infoBusine['frontImage'],
                "property": 3,
            }).then( (res) => {
                if(res.data.code=='0'){

                    this.loadBusine=false;

                    for(let i in res.data.item){
                        this.infoBusine[i]=res.data.item[i];
                    }
                    this.displayBusine=false;
                   this.infoBusine.frontImageUrl='data:image/png;base64,'+this.infoBusine['frontImage'];
                   this.infoBusine.id=this.infoBusine['businessId'];
                }
           })
        },
        updateBusineFun(){
            this.showBusine=true;
            for(let i in this.infoBusine){
                this.infoBusineTem[i]=this.infoBusine[i];
            }
        },
        updateBusine(name){
            let upLoadData=deepClone(this.infoBusineTem);
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/businesslicense/update', upLoadData).then( (res) => {
                            if(res.data.code=='0'){

                                this.showBusine=false;
                                this.displayBusine=true;
                                for(let i in this.infoBusineTem){
                                    this.reviseBusine[i]=this.infoBusineTem[i];
                                }
                                this.$Message.info('修改成功')
                            }else{
                                // this.$Message.info(res.data.status)
                            }
                    })
                }
            });

        },
        //选择绑定类型--------
        selectBindType(val){


        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');

          }
        },
        //获取审核详情数据---
        getDetail(){
            this.spinShow=true;
          this.$axios.get('/scan/auditDetail/'+this.detailData.id, {
          }).then( (res) => {
            if(res.data.code=='0'){

                this.auditFailInfo=res.data.item.auditFailInfo;
                this.ownerType=res.data.item.ownerType;
                this.selectBindType(this.ownerType);
              if(res.data.item.travelLicense){
                  this.infoDriverData=res.data.item.travelLicense;

                  this.infoDriverData['registerDate']=formatDate(this.infoDriverData['registerDate']);
                  this.infoDriverData['issueDate']=formatDate(this.infoDriverData['issueDate']);
              }

              if(res.data.item.travelLicenseRevise){
                  this.reviseDriverData=res.data.item.travelLicenseRevise;
                  this.displayDriverResive=true;

                  this.reviseDriverData['registerDate']=formatDate(this.reviseDriverData['registerDate']);
                  this.reviseDriverData['issueDate']=formatDate(this.reviseDriverData['issueDate']);
              }

              if(res.data.item.business){
                  this.infoBusine=res.data.item.business;
              }

              if(res.data.item.businessRevise){
                  this.displayBusine=true;
                  this.reviseBusine=res.data.item.businessRevise;
              }

              if(res.data.item.idCard){
                  this.infoData=res.data.item.idCard;
              }

              if(res.data.item.idCardRevise){
                  this.displayCardResive=true;
                  this.reviseInfoData=res.data.item.idCardRevise;
              }

              this.spinShow=false;
            }
          })

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
