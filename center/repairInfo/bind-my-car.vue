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
        
        <Form :label-width="140">
            <FormItem label="绑定类型:" style="width: 400px;">
                <Select v-model="property" @on-change="selectBindType">
                    <Option v-for="item in bindTypeArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="上传行驶证:" style="margin-bottom: 12px;">
                <div class="pic-card" v-if="accessBtn('uploadDriverLicense')">
                    <div class="pic-body" style="height: 40px;">
                        <div class="button" v-show="editAble" style="text-align: left;">
                            <div class="up-img">
                            <Button type="primary" :loading="loadImg">上传图片</Button>
                            <input id="fileupload" class="input" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"
                                    @change="getDriverImg('imageUrl', $event)"/>
                            
                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>
                        
                    </div>
                </div>
            </FormItem>
            <FormItem label="行驶证图片:" v-show="infoDriverData.imageUrl">
                <Card class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="infoDriverData.imageUrl"
                            @click="showImg(infoDriverData.imageUrl)"/>
                        
                    </div>
                    
                </Card>
            </FormItem>
            <FormItem  label="所有人:" style="width: 400px;margin-bottom: 12px;" v-show="infoDriverData.imageUrl">
                <Input type="text" v-model="infoDriverData.ownerName" placeholder="" disabled >
                </Input>
            </FormItem>
            <FormItem  label="车牌号码:" style="width: 400px;margin-bottom: 12px;" v-show="infoDriverData.imageUrl">
                <Input type="text" v-model="infoDriverData.vehiclePlateNumber" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            <FormItem  label="车架号:" style="width: 400px;margin-bottom: 12px;" v-show="infoDriverData.imageUrl">
                <Input type="text" v-model="infoDriverData.vin" placeholder="" disabled >
                    
                </Input>
            </FormItem>
            <FormItem  label="发动机号:" style="width: 400px;margin-bottom: 12px;" v-show="infoDriverData.imageUrl">
                <Input type="text" v-model="infoDriverData.engineNo" placeholder="" disabled >
                    
                </Input>
            </FormItem>
            <FormItem style="width: 400px;margin-bottom: 12px;" v-show="infoDriverData.imageUrl">
                <Button type="primary" @click="updateDriver">修改信息</Button>
            </FormItem>
        </Form>
        <Form :label-width="140" v-show="imgFlag">
            <FormItem label="上传身份证(头像面):" style="margin-bottom: 12px;" v-show="upIdButton">
                <div class="pic-card" v-if="accessBtn('upload')">
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
            <FormItem label="身份证图片:" v-show="infoData.imageUrl">
                <Card class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="infoData.imageUrl"
                            @click="showImg(infoData.imageUrl)"/>
                    </div>
                    
                </Card>
            </FormItem>
            <FormItem  label="姓名:" style="width: 400px;margin-bottom: 12px;" v-show="infoData.imageUrl">
                <Input type="text" v-model="infoData.ownerName" placeholder="" disabled>
                </Input>
            </FormItem>
            <FormItem  label="身份证号:" style="width: 400px;margin-bottom: 12px;" v-show="infoData.imageUrl">
                <Input type="text" v-model="infoData.idCardNo" placeholder="" disabled >
                    
                </Input>
            </FormItem>
            <FormItem style="width: 400px;margin-bottom: 12px;" v-show="editIDCard" >
                <Button type="primary" @click="updateIdFun">修改信息</Button>
            </FormItem>
        </Form>
        <Form :label-width="140" v-show="busineFlag">
            <FormItem label="上传营业执照:" style="margin-bottom: 12px;">
                <div class="pic-card" v-if="accessBtn('upload')">
                    <div class="pic-body" style="height: 40px;">
                        <div class="button" v-show="editAble" style="text-align: left;">
                            <div class="up-img">
                            <Button type="primary" :loading="loadBusine">上传图片</Button>
                            <input  class="input" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"
                                    @change="getBusineImg('imageUrl', $event)"/>
                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>
                    </div>
                </div>
            </FormItem>
            <FormItem label="营业执照图片:" v-show="infoBusine.imageUrl">
                <Card class="pic-card">
                    <div class="pic-body">
                        <img  class="pic" :src="infoBusine.imageUrl"
                            @click="showImg(infoBusine.imageUrl)"/>
                    </div>
                    
                </Card>
            </FormItem>
            <FormItem  label="企业名称:" style="width: 400px;margin-bottom: 12px;" v-show="infoBusine.imageUrl">
                <Input type="text" v-model="infoBusine.corpName" placeholder="" disabled>
                </Input>
            </FormItem>
            <FormItem  label="法定代表人:" style="width: 400px;margin-bottom: 12px;" v-show="infoBusine.imageUrl">
                <Input type="text" v-model="infoBusine.legalPerson" placeholder="" disabled>
                    
                </Input>
            </FormItem>
            <FormItem style="width: 400px;margin-bottom: 12px;" v-show="infoBusine.imageUrl" >
                <Button type="primary" @click="updateBusineFun">修改信息</Button>
            </FormItem>
        </Form>

        
        </div>
        <div slot="footer">
            <Button v-if="accessBtn('bind')"  @click="bindFun" size="large" type="success"  style="margin-right: 10px;">提交</Button>
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
        <!--修改身份信息-->
        <Modal title="修改驾驶证信息"
            width="500"
            v-model="showDriver"
            :mask-closable="false">
                <Form :label-width="120" ref="infoDriverDataTem" :rules="ruleDriver"  :model="infoDriverDataTem">
                    <FormItem label="所有人:" style="width: 400px;" prop="ownerName">
                        <Input type="text" v-model="infoDriverDataTem.ownerName" placeholder="" :maxlength="20"></Input>
                    </FormItem>
                    <FormItem label="车牌号码:" style="width: 400px;" prop="vehiclePlateNumber">
                        <Input type="text" v-model="infoDriverDataTem.vehiclePlateNumber" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="车架号(VIN):" style="width: 400px;" prop="vin">
                        <Input type="text" v-model="infoDriverDataTem.vin" placeholder="" :maxlength="17"></Input>
                    </FormItem>
                    <FormItem label="发动机号:" style="width: 400px;" prop="engineNo">
                        <Input type="text" v-model="infoDriverDataTem.engineNo" placeholder="" :maxlength="20"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button v-if="accessBtn('update')"  @click="updateDriverFun('infoDriverDataTem')" size="large" type="success"  style="margin-right: 10px;">提交</Button>
                    <Button  size="large" type="default" style="margin-right: 10px;" @click="showDriver=false;">返回</Button>
                </div>
        </Modal>
  </Modal>
</template>

<script>
import { getName, getDictGroup, imgToBase64 } from '@/static/util.js'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
    
	name: "bind-my-car",
    props:['showDetail', 'detailData'],
    mixins: [funMixin],
    data(){
	return{
        loading:false,//身份证上传----
        loadImg:false,//图片上传------
        loadBusine:false,//营业执照上传----------
        showBusine:false,//营业执照显示
        busineFlag:false,//是否显示上传图片按钮
        editBusineFlag:false,//是否显示修改信息按钮-------
        imgFlag:false,
        showModal:false,
        property:1,
        infoData:{
            idCardNo:'',
            ownerName:'',
            imageUrl:'',
            imageData:'',
            id:'',
        },
        infoDataTem:{
            idCardNo:'',
            ownerName:'',
            imageUrl:'',
            imageData:'',
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
        infoDriverDataTem:{
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
                { required: true, message: '请填写信息', },
				{ type:'string',pattern:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1,2}$/, message:'请输入正确的车牌号码', trigger:'blur'}
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
        infoBusineTem:{
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
            //进来数据初始化-------
            this.showModal=true;
            this.property=1;
            this.imgFlag=true;
            this.busineFlag=false;

            

            for(let i in this.infoData){
                this.infoData[i]='';
            }
            for(let i in this.infoDriverData){
                this.infoDriverData[i]='';
            }
            for(let i in this.infoBusine){
                this.infoBusine[i]='';
            }
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
                "property": 1,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.editIDCard=true;
                    this.loading=false;
                    this.infoData['idCardNo']=res.data.item['idCardNo'];
                    this.infoData['ownerName']=res.data.item['ownerName'];
                    this.infoData.id=res.data.item['creditId'];
                    this.infoData['imageUrl']= 'data:image/png;base64,'+this.infoData['imageData'];
                }else{
                    // this.$Message.info(res.data.status);
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
                        this.infoData['idCardNo']=res.data.item.reviseIdCardNo;
                        this.infoData['ownerName']=res.data.item.reviseOwnerName;
                        this.infoData['imageUrl']='data:image/png;base64,'+res.data.item.frontImage;
                        this.infoData['id']=res.data.item.creditId;
                    }
                }else{
                    // this.$Message.info(res.data.status)
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
           this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/scan/update', {
                        idcardId:this.infoData.id,
                        new_id_card_no:this.infoDataTem['idCardNo'],
                        new_owner_name:this.infoDataTem['ownerName'],
                        property:'1',
                    }).then( (res) => {
                        if(res.data.code=='0'){
                            this.showCard=false;
                            this.infoData['idCardNo']=this.infoDataTem['idCardNo'];
                            this.infoData['ownerName']=this.infoDataTem['ownerName'];
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
            
           this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/scan/update', {
                                licenseId:this.infoDriverDataTem.id,
                                new_engine_no:this.infoDriverDataTem.engineNo,
                                new_license_owner_name:this.infoDriverDataTem.ownerName,
                                new_vehicle_plate_number:this.infoDriverDataTem.vehiclePlateNumber,
                                new_vin:this.infoDriverDataTem.vin,
                                property:'2',
                    }).then( (res) => {
                            if(res.data.code=='0'){
                            
                                this.showDriver=false;
                                this.infoDriverData['engineNo']=this.infoDriverDataTem.engineNo;
                                this.infoDriverData['ownerName']=this.infoDriverDataTem.ownerName;
                                this.infoDriverData['vehiclePlateNumber']=this.infoDriverDataTem.vehiclePlateNumber;
                                this.infoDriverData['vin']=this.infoDriverDataTem.vin;
                                this.$Message.info('修改成功');
                            }else{
                                // this.$Message.info(res.data.status)
                            }
                    })
                }
            });
        },
        //提交绑定按钮-----------
        bindFun(){
            this.$axios.post('/scan/newBind', {
                "businessId": this.infoBusine.id,
                "idCardId": this.infoData.id,
                "licenseId": this.infoDriverData.id,
            }).then( (res) => {
                if(res.data.code=='0'){
                   this.$Message.info('绑定成功');
                   this.showModal=false;
                }else{
                    // this.$Message.info(res.data.status)
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
            this.loadBusine=true;
            this.$axios.post('/scan/newUpload', {
                "accuracy": "",
                "detect_direction": true,
                "detect_risk": false,
                "id_card_side": "front",
                "image": this.infoBusine['imageData'],
                "property": 3,
            }).then( (res) => {
                if(res.data.code=='0'){
                    
                    this.loadBusine=false;
                    this.infoBusine['legalPerson']=res.data.item['legalPerson'];
                    this.infoBusine['corpName']=res.data.item['corpName'];
                    this.infoBusine.id=res.data.item['businessId'];
                    this.infoBusine['imageUrl']= 'data:image/png;base64,'+this.infoBusine['imageData'];
                }else{
                    // this.$Message.info(res.data.status);
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
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/scan/update', {
                            businessId:this.infoBusineTem.id,
                            new_corp_name:this.infoBusineTem['corpName'],
                            new_legal_person:this.infoBusineTem['legalPerson'],
                            property:"3",
                        }).then( (res) => {
                            if(res.data.code=='0'){
                            
                                this.showBusine=false;
                                this.infoBusine['corpName']=this.infoBusineTem['corpName'];
                                this.infoBusine['legalPerson']=this.infoBusineTem['legalPerson'];
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
            if(val==1){
                this.imgFlag=true;
                this.busineFlag=false;
            }else if(val==2){
                this.imgFlag=false;
                this.busineFlag=true;
            }

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
