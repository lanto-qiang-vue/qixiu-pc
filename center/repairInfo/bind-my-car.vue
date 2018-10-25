<template>

<Modal
    v-model="showModal"
    title="绑定本人车辆"
    width="90"
    :scrollable="true"
    :transfer= "false"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
        <div style="height: 100%;overflow: auto;">
        
        <Form :label-width="80">
            <FormItem label="绑定类型:" style="width: 300px;">
                <Select v-model="infoData.property" @on-change="selectBindType">
                    <Option v-for="item in bindTypeArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="上传行驶证:" style="margin-bottom: 12px;">
                <div class="pic-card">
                    <div class="pic-body" style="height: 40px;">
                        <div class="button" v-show="editAble" style="text-align: left;">
                            <div class="up-img">
                            <Button type="primary" :loading="loadImg">上传图片</Button>
                            <input class="input" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"
                                    @change="getDriverImg('imageUrl', $event)"/>
                            
                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>
                        
                    </div>
                </div>
            </FormItem>
            <FormItem label="" v-show="infoDriverData.imageUrl">
                <div class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="infoDriverData.imageUrl"
                            @click="showImg(infoDriverData.imageUrl)"/>
                        
                    </div>
                </div>
            </FormItem>
            <FormItem  label="所有人:" style="width: 28%;margin-bottom: 12px;" v-show="infoDriverData.imageUrl">
                <Input type="text" v-model="infoDriverData.ownerName" placeholder="" disabled>
                </Input>
            </FormItem>
            <FormItem  label="车牌号码:" style="width: 28%;margin-bottom: 12px;" v-show="infoDriverData.imageUrl">
                <Input type="text" v-model="infoDriverData.vehiclePlateNumber" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            <FormItem  label="车架号:" style="width: 28%;margin-bottom: 12px;" v-show="infoDriverData.imageUrl">
                <Input type="text" v-model="infoDriverData.vin" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            <FormItem  label="发动机号:" style="width: 28%;margin-bottom: 12px;" v-show="infoDriverData.imageUrl">
                <Input type="text" v-model="infoDriverData.engineNo" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            <FormItem style="width: 28%;margin-bottom: 12px;" v-show="infoDriverData.imageUrl">
                <Button type="primary" @click="updateDriver">修改信息</Button>
            </FormItem>

            <FormItem label="上传身份证（头像面）" style="margin-bottom: 12px;" v-show="upIdButton">
                <div class="pic-card">
                    <div class="pic-body" style="height: 40px;">
                        <div class="button" v-show="editAble" style="text-align: left;">
                            <div class="up-img">
                            <Button type="primary" :loading="loading">上传图片</Button>
                            <input id="getImg" class="input" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"
                                    @change="getImg('imageUrl', $event)"/>
                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>
                    </div>
                </div>
            </FormItem>
            <FormItem label="" v-show="infoData.imageUrl">
                <div class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="infoData.imageUrl"
                            @click="showImg(infoData.imageUrl)"/>
                    </div>
                    
                </div>
            </FormItem>
            <FormItem  label="姓名:" style="width: 28%;margin-bottom: 12px;" v-show="infoData.imageUrl">
                <Input type="text" v-model="infoData.ownerName" placeholder="" disabled>
                </Input>
            </FormItem>
            <FormItem  label="身份证号:" style="width: 28%;margin-bottom: 12px;" v-show="infoData.imageUrl">
                <Input type="text" v-model="infoData.idCardNo" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            <FormItem style="width: 28%;margin-bottom: 12px;" v-show="editIDCard" >
                <Button type="primary" @click="updateIdFun">修改信息</Button>
            </FormItem>

            <FormItem label="上传营业执照" style="margin-bottom: 12px;" v-show="upIdButton">
                <div class="pic-card">
                    <div class="pic-body" style="height: 40px;">
                        <div class="button" v-show="editAble" style="text-align: left;">
                            <div class="up-img">
                            <Button type="primary" :loading="loading">上传图片</Button>
                            <input  class="input" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"
                                    @change="getBusineImg('imageUrl', $event)"/>
                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>
                    </div>
                </div>
            </FormItem>
            <FormItem label="" v-show="infoBusine.imageUrl">
                <div class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="infoBusine.imageUrl"
                            @click="showImg(infoBusine.imageUrl)"/>
                    </div>
                    
                </div>
            </FormItem>
            <FormItem  label="企业名称:" style="width: 28%;margin-bottom: 12px;" v-show="infoBusine.imageUrl">
                <Input type="text" v-model="infoBusine.corpName" placeholder="" disabled>
                </Input>
            </FormItem>
            <FormItem  label="法定代表人:" style="width: 28%;margin-bottom: 12px;" v-show="infoBusine.imageUrl">
                <Input type="text" v-model="infoBusine.legalPerson" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            <FormItem style="width: 28%;margin-bottom: 12px;" v-show="editIDCard" >
                <Button type="primary" @click="updateIdFun">修改信息</Button>
            </FormItem>

              
        </Form>

        
        </div>
        <div slot="footer">
            <Button  @click="" size="large" type="success"  style="margin-right: 10px;">提交</Button>
            <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
        </div>
        <!--修改身份信息-->
        <Modal title="修改身份信息"
            width="30"
            v-model="showCard"
            :mask-closable="false">
                <Form :label-width="80" ref="infoData" :rules="ruleCard"  :model="infoData">
                    <FormItem label="姓名:" style="width: 300px;" prop="name">
                        <Input type="text" v-model="infoData.ownerName" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="身份证号:" style="width: 300px;" prop="card">
                        <Input type="text" v-model="infoData.idCardNo" placeholder=""></Input>
                    </FormItem>
                    
                </Form>
                <div slot="footer">
                    <Button  @click="updateCard" size="large" type="success"  style="margin-right: 10px;">提交</Button>
                    <Button  size="large" type="default" style="margin-right: 10px;" @click="showCard=false;">返回</Button>
                </div>
        </Modal>
        <!--修改营业执照-->
        <Modal title="修改营业执照信息"
            width="30"
            v-model="showCard"
            :mask-closable="false">
                <Form :label-width="80" ref="infoBusine" :rules="ruleBusine"  :model="infoBusine">
                    <FormItem label="企业名称:" style="width: 300px;" prop="corpName">
                        <Input type="text" v-model="infoBusine.corpName" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="法人代表:" style="width: 300px;" prop="legalPerson">
                        <Input type="text" v-model="infoBusine.legalPerson" placeholder=""></Input>
                    </FormItem>
                    
                </Form>
                <div slot="footer">
                    <Button  @click="updateBusine" size="large" type="success"  style="margin-right: 10px;">提交</Button>
                    <Button  size="large" type="default" style="margin-right: 10px;" @click="showCard=false;">返回</Button>
                </div>
        </Modal>
        <!--修改身份信息-->
        <Modal title="修改驾驶证信息"
            width="30"
            v-model="showDriver"
            :mask-closable="false">
                <Form :label-width="120" ref="infoDriverData" :rules="ruleDriver"  :model="infoDriverData">
                    <FormItem label="所有人:" style="width: 300px;" prop="name">
                        <Input type="text" v-model="infoDriverData.ownerName" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="车牌号码:" style="width: 300px;" prop="card">
                        <Input type="text" v-model="infoDriverData.vehiclePlateNumber" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="车架号(VIN):" style="width: 300px;" prop="name">
                        <Input type="text" v-model="infoDriverData.vin" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="发动机号:" style="width: 300px;" prop="card">
                        <Input type="text" v-model="infoDriverData.engineNo" placeholder=""></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button  @click="updateDriverFun" size="large" type="success"  style="margin-right: 10px;">提交</Button>
                    <Button  size="large" type="default" style="margin-right: 10px;" @click="showDriver=false;">返回</Button>
                </div>
        </Modal>
  </Modal>
</template>

<script>
import { getName, getDictGroup, imgToBase64 } from '@/static/util.js'
export default {
    
	name: "bind-my-car",
    props:['showDetail', 'detailData'],
    data(){
	return{
        loading:false,//身份证上传----
        loadImg:false,//图片上传------

        showModal:false,
        
        infoData:{
            idCardNo:'',
            ownerName:'',
            imageUrl:'',
            imageData:'',
            "property":1,
            id:'',
        },
        bindTypeArr:[
            {code:1,name:'个人车辆'},
            {code:2,name:'企业车辆'},
        ],
        editAble: true,
        infoDriverData:{
            address:"",
            brandModel:"",
            engineNo:"",
            id:'',
            issueDate:"",
            ownerName:"",
            useNature:"",
            vehiclePlateNumber:"",
            vehicleType:"",
            vin:"",
            imageUrl:'',
            imageData:'',
        },
        editIDCard:false,//是否修改身份按钮
        upIdButton:true,//是否显示上传按钮
        showCard:false,//是否显示修改身份信息框
        ruleCard:{
            ownerName:[
                { required: true, message: '请填写信息', },
            ],
            idCardNo: [
                { required: true,  message: '请填写信息',}
            ],
        },
        showDriver:false,//修改驾驶证界面-----
        ruleDriver:{
            ownerName:[
                { required: true, message: '请填写信息', },
            ],
            vehiclePlateNumber: [
                { required: true,  message: '请填写信息',}
            ],
            vin: [
                { required: true,  message: '请填写信息',}
            ],
            engineNo: [
                { required: true,  message: '请填写信息',}
            ],
        },
        infoBusine:{
            id:'',
            corpName:'',
            legalPerson:'',
            imageUrl:'',
            imageData:'',
        },
        ruleBusine:{
            corpName:[
                { required: true, message: '请填写信息', },
            ],
            legalPerson: [
                { required: true,  message: '请填写信息',}
            ],
        }
            
        

      }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            this.getCard();
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
        getImg(name, e){
            imgToBase64(e.target.files[0], (base64, fileName)=> {
                let newBase=base64.split(',');
                this.infoData['imageData']= newBase[1];
                console.log(base64);
                this.newUpload();
            })
        },
        //上传图片----------
        newUpload(){
            this.loading=true;
            this.$axios.post('/scan/newUpload', {
                "accuracy": "",
                "detect_direction": true,
                "detect_risk": false,
                "id_card_side": "front",
                "image": this.infoData['imageData'],
                "property": this.infoData.property,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.editIDCard=true;
                    this.loading=false;
                    this.infoData['idCardNo']=res.data.item['idCardNo'];
                    this.infoData['ownerName']=res.data.item['ownerName'];
                    this.infoData.id=res.data.item['creditId'];
                    this.infoData['imageUrl']= 'data:image/png;base64,'+this.infoData['imageData'];
                }else{
                    this.$Message.info(res.data.status);
                }
           })
        },
        getDriverImg( name, e){
            imgToBase64(e.target.files[0], (base64, fileName)=> {
                let newBase=base64.split(',');
                // this.infoDriver[name]= base64;
                this.infoDriverData['imageData']= newBase[1];
                this.newDriverLicense();
            })
        },
        newDriverLicense(){
            this.loadImg=true;
            this.$axios.post('/scan/newDriverLicense', {
                "accuracy": "",
                "detect_direction": true,
                "image": this.infoDriverData.imageData,
            }).then( (res) => {
                this.loadImg=false;
                if(res.data.code=='0'){
                    
                   this.infoDriverData.ownerName=res.data.item.ownerName;
                   this.infoDriverData.vehiclePlateNumber=res.data.item.vehiclePlateNumber;
                   this.infoDriverData.vin=res.data.item.vin;
                   this.infoDriverData.engineNo=res.data.item.engineNo;
                   this.infoDriverData.imageUrl='data:image/png;base64,'+this.infoDriverData['imageData'];
                   this.infoDriverData.id=res.data.item.id;
                }else{
                    this.$Message.info(res.data.status)
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
                        this.infoData['idCardNo']=res.data.item.reviseIdCardNo;
                        this.infoData['ownerName']=res.data.item.reviseOwnerName;
                        this.infoData['imageUrl']='data:image/png;base64,'+res.data.item.frontImage;
                    }
                }else{
                    this.$Message.info(res.data.status)
                }
           })
        },
        //修改身份信息----------------
        updateIdFun(){
            this.showCard=true;

        },
        updateCard(){
            
           this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/scan/update', {
                        idcardId:this.infoData.id,
                        new_id_card_no:this.infoData['idCardNo'],
                        new_owner_name:this.infoData['ownerName'],
                        property:'1',
                    }).then( (res) => {
                        if(res.data.code=='0'){
                            this.showCard=false;
                        }else{
                            this.$Message.info(res.data.status)
                        }
                    })
                }
            });
        },
        //修改驾驶证信息-----------
        updateDriver(){
            this.showDriver=true;
        },
        updateDriverFun(){
            this.$axios.post('/scan/update', {
                licenseId:this.infoDriverData.id,
                new_engine_no:this.infoDriverData.engineNo,
                new_license_owner_name:this.infoDriverData.ownerName,
                new_vehicle_plate_number:this.infoDriverData.vehiclePlateNumber,
                new_vin:this.infoDriverData.vin,
                property:'2',
            }).then( (res) => {
                if(res.data.code=='0'){
                   
                   this.showDriver=false;
                }else{
                    this.$Message.info(res.data.status)
                }
           })
        },
        //提交绑定按钮-----------
        bindFun(){
            this.$axios.post('/scan/update', {
                "businessId": 0,
                "idCardId": this.infoData.id,
                "licenseId": this.infoDriverData.id,
            }).then( (res) => {
                if(res.data.code=='0'){
                   this.infoData['idCardNo']=this.editCardArr.card;
                   this.infoData['ownerName']=this.editCardArr.name;
                   this.showCard=false;
                }else{
                    this.$Message.info(res.data.status)
                }
           })
        },
        //营业执照上传-----------
        getBusineImg( name, e){
            imgToBase64(e.target.files[0], (base64, fileName)=> {
                let newBase=base64.split(',');
                // this.infoDriver[name]= base64;
                this.infoBusine['imageData']= newBase[1];
                this.uploadBusine();
            })
        },
        uploadBusine(){
            this.loading=true;
            this.$axios.post('/scan/newUpload', {
                "accuracy": "",
                "detect_direction": true,
                "detect_risk": false,
                "id_card_side": "front",
                "image": this.infoBusine['imageData'],
                "property": this.infoData.property,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.editIDCard=true;
                    this.loading=false;
                    this.infoBusine['legalPerson']=res.data.item['legalPerson'];
                    this.infoBusine['corpName']=res.data.item['corpName'];
                    this.infoBusine.id=res.data.item['businessId'];
                    this.infoBusine['imageUrl']= 'data:image/png;base64,'+this.infoData['imageData'];
                }else{
                    this.$Message.info(res.data.status);
                }
           })
        },
        updateBusine(){
            this.$axios.post('/scan/update', {
                businessId:this.infoBusine.id,
                new_corp_name:this.infoBusine['corpName'],
                new_legal_person:this.infoBusine['legalPerson'],
                property:"3",
            }).then( (res) => {
                if(res.data.code=='0'){
                   
                   this.showDriver=false;
                }else{
                    this.$Message.info(res.data.status)
                }
           })
        },
        //选择绑定类型--------
        selectBindType(val){
            if(val==1){
                
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
      width: 32%;
      min-width: 250px;
      .red{
        color: red;
      }
      .pic-body{
        width: 100%;
        height: 200px;
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
