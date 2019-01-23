
<template>
<!--维修企业信息管理详情  2018-11-05  -->
<Modal
    v-model="showModal"
    title="企业信息"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
    <div >
        <Form ref="listSearch" :rules="ruleValidate"  :model="listSearch" :label-width="140" class="common-form" slot="content">
            <FormItem label="企业名称:" style="width: 45%;" prop="name">
                <Input type="text" v-model="listSearch.name" placeholder="请输入企业名称"></Input>
            </FormItem>
            <FormItem label="许可证号:" style="width: 45%;" prop="licence">
                <Input type="text" v-model="listSearch.licence" placeholder="请输入许可证号"></Input>
            </FormItem>
            
            <FormItem label="负责人:" style="width: 45%;" >
                <Input type="text"  v-model="listSearch.workingHoursPrice" placeholder="请输入工时单价"></Input>
            </FormItem>
            
            <FormItem label="负责人电话:" style="width: 45%;" >
                <Input type="text"  v-model="listSearch.qualityInspector" placeholder="" ></Input>
            </FormItem>
            <FormItem label="服务电话:" style="width: 45%;" >
                <Input type="text"  v-model="listSearch.managerOther" placeholder="" ></Input>
            </FormItem>
            <FormItem label="救援区域:" style="width: 45%;" >
                <Select v-model="listSearch.workingHoursQuotaExecutionStandard">
                    <Option v-for="item in workCompanyType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>
            </FormItem>
            
            <FormItem label="服务时间:" style="width: 45%;" >
                <TimePicker format="HH:mm" type="timerange" placement="bottom-start" placeholder="" style="width: 100%;" v-model="listSearch.businessHours"></TimePicker>
            </FormItem>
            <FormItem label="状态:" style="width: 45%;" >
                <Select v-model="listSearch.workingHoursQuotaExecutionStandard">
                    <Option v-for="item in workCompanyType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>
            </FormItem>
            <FormItem label="服务周期:" style="width: 90%;" >
                <CheckboxGroup v-model="listSearch.model">
                    <Checkbox v-for="item in vehicleModel" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="企业车辆信息:" style="width: 90%;" >
                <div class="search-block">重型车辆数<InputNumber :max="10" :min="1" v-model="listSearch.economicType" style="width: 100px; margin-left: 5px;"></InputNumber></div>
                <div class="search-block">中型车辆数<InputNumber :max="10" :min="1" v-model="listSearch.economicType" style="width: 100px;margin-left: 5px;"></InputNumber></div>
                <div class="search-block">轻型车辆数<InputNumber :max="10" :min="1" v-model="listSearch.economicType" style="width: 100px;margin-left: 5px;"></InputNumber></div>
                <div class="search-block">小修车辆数<InputNumber :max="10" :min="1" v-model="listSearch.economicType" style="width: 100px;margin-left: 5px;"></InputNumber></div>
                <div class="search-block">地库车辆数<InputNumber :max="10" :min="1" v-model="listSearch.economicType" style="width: 100px;margin-left: 5px;"></InputNumber></div>
                
            </FormItem>
            <FormItem label="企业简介:" style="width: 90%;" >
                <Input type="textarea" :rows="1" v-model="listSearch.desc" placeholder=""></Input>
            </FormItem>
            
        </Form>

        
    </div>
    <div slot="footer">
        <Button v-if="accessBtn('edit')" size="large" type="primary" @click="addCompany('listSearch')">提交</Button>
        <Button  size="large" type="default" @click="showModal=false;">返回</Button>
    </div>
    
    <!--<Spin size="large" fix v-if="spinShow"></Spin>-->
  </Modal>
</template>

<script>
import {  imgToBase64,getName } from '@/static/util.js'
import { formatDate } from '@/static/tools'
import funMixin from '~/components/fun-auth-mixim.js'

export default {
	name: "rescue-company-info",
    props:['showDetail', 'detailData'],
    mixins: [funMixin],
    components: {},
    data(){
		return{
            
            showModal:false,
            
            listSearch:{
                "businessHours": "",//营业时间
                "postalCode": "",//经营地址邮政编码------------------------------------------------
                "businessRegion": "",//经营地址区域
                "businessAddress": "",//经营地地址
                "complaintTel": "",//企业反馈电话
                "economicType": 1,//经济类型
                "economicTypeOther": "",
                "employeeNumber": 1,//企业员工总数--------------------------
                "floorSpace": 1,//企业目前占地面积-------------------------------
                "honor": "",
                "id": "",
                "industryCategory": 1,//业户类别
                "industryCategoryOther": "",
                "iso": false,
                "latitude": "",
                "legalEmail": "",
                "legalMobile": "",
                "legalName": "",//法定代表人
                "legalTel": "",
                "licence": "",//许可证号
                "licenceBeginDate": "",//许可证有效期
                "licenceEndDate": "",//许可证有效期
                "longitude": "",
                "manager": "",
                "managerOther": "",
                "model": [],
                "modelOther": "",
                "offerOnsiteRepair": false,
                "openOnlineBusinessService": false,
                "openOnlineRepairService": false,
                "operatorEmail": "",
                "operatorMobile": "",
                "operatorName": "",
                "operatorTel": "",
                "qualityInspector": "",
                "qualityReputationAssessmentLevel": 4,
                "registerAddress": "",//工商注册地址
                "registerDate": "",//工商注册日期
                "registerRegion": "",//工商注册地址区域
                "rescue": false,
                // "selfDesc": "",
                "selfIntroduction": "",
                "serviceCategory": [],
                "serviceCategoryOther": "",
                "serviceLeader": "",
                "sincerity": false,
                "sincerityYears": [],
                
                "specialRepairBrand": "",
                "specialService": "",
                "technologyLeader": "",
                "throughEnvironmentalProtectionSpecialRenovation": false,
                "throughSafetyProductionStandardization": false,
                "workingHoursPrice": "",//工时单价
                "workingHoursQuotaExecutionStandard": '',//工时定额执行标准

                "beianStatus": 0,//备案状态---------------------------------------------
                "brand": "",//企业品牌--------------------------------------------------
                "businessScope": 0,//经营范围
                "businessScope2": [
                    0
                ],//经营范围小类
                "businessSphere": [],//主要业务范围
                "businessSphereOther": "",//其他业务范围
                "businessStatus": 0,//经营状态
                "corpInfoId": 0,//企业id
                "dept": "",//管理部门
                "desc": "",//自我描述
                "zdz":false,//总对总
                "buttJoint":false,//是否对接

                "electricians": [
                    0,0,0,0
                ],//电工

                "machinists": [
                    0,0,0,0
                ],//机工

                "name": "",//企业名称----------------------------------------------

                "org": "",//管理机构---------------------------------------------------
                "painters": [
                    0,0,0,0
                ],//油漆工

                "show": false,//是否前台显示--------------------------------------------------------

                "special": false,//是否特约维修
                "specialRepairBrand": "",//主修品牌
                "specialService": "",//服务特色
                "status": 1,//审核状态

                "tinbenders": [
                    0,0,0,0
                ],//钣金工
                "updateTime": "",//更新时间--------------------
                "buttJointInfoDtos":[],
            },
            ruleValidate: {
                name:[{ required: true, message: '必填项不可为空', },],
                licence:[{ required: true, message: '必填项不可为空', },],
                licenceBeginDate:[{ required: true, message: '必填项不可为空', },],
                registerAddress:[{ required: true, message: '必填项不可为空', },],
                registerRegion:[{ required: true, message: '必填项不可为空', },],
                registerDate:[{ required: true, message: '必填项不可为空', },],

                businessAddress:[{ required: true, message: '必填项不可为空', },],
                businessRegion:[{ required: true, message: '必填项不可为空', },],
                longitude:[{ required: true, message: '必填项不可为空', },],
                latitude:[{ required: true, message: '必填项不可为空', },],

                postalCode:[{ required: true, message: '必填项不可为空', },],

                legalName:[{ required: true, message: '必填项不可为空', },],
                legalMobile:[{ required: true, message: '必填项不可为空', },
                    // {pattern:/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/, message:'请输入正确的手机号码', trigger:'blur'}
                ],
                legalTel:[{ required: true, message: '必填项不可为空', },
                    // {pattern:/0\d{2,3}-\d{7,8}/, message:'请输入正确的固定电话号码', trigger:'blur'}
                ],
                
                legalEmail:[{ required: true, message: '必填项不可为空', },
                    {pattern:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message:'请输入正确的邮箱', trigger:'blur'}
                ],
                operatorName:[{ required: true, message: '必填项不可为空', },],
                operatorMobile:[{ required: true, message: '必填项不可为空', },
                    // {pattern:/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/, message:'请输入正确的手机号码', trigger:'blur'}
                ],
                operatorTel:[{ required: true, message: '必填项不可为空', },
                    // {pattern:/0\d{2,3}-\d{7,8}/, message:'请输入正确的固定电话号码', trigger:'blur'}
                ],
                operatorEmail:[{ required: true, message: '必填项不可为空', },
                    {pattern:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message:'请输入正确的邮箱', trigger:'blur'}
                ],
                complaintTel:[{ required: true, message: '必填项不可为空', },],
                businessHours:[{ required: true, message: '必填项不可为空', },],
                org:[{ required: true, message: '必填项不可为空', },],
                businessStatus:[{ required: true, message: '必填项不可为空', },],

                beianStatus:[{ required: true, message: '必填项不可为空', },],
                brand:[{ required: true, message: '必填项不可为空', },],
                businessSphere:[{ required: true, message: '必填项不可为空', },],
                businessScope:[{ required: true, message: '必填项不可为空', },],
                zdz:[{ required: true, message: '必填项不可为空', },],
                buttJoint:[{ required: true, message: '必填项不可为空', },],
                show:[{ required: true, message: '必填项不可为空', },],
                special:[{ required: true, message: '必填项不可为空', },],
                desc:[{ required: true, message: '必填项不可为空', },],

            },//规则验证
            typeList:[],//学历类别数据------
            //维修类别数据---------
            repairType:[
                {code:"一类机动车维修",name:43},
                {code:"二类机动车维修",name:44},
                {code:"三类机动车维修",name:45},
                {code:"摩托车维修",name:46},
                {code:"汽车维修",name:47},
            ],
            companyRepair:'',
            //一类机动车维修------
            oneCarType:[
                {code:"小型车辆维修",name:48},
                {code:"大、中型客车维修",name:49},
                {code:"大、中型货车维修",name:50},
                {code:"危险货车运输维修",name:51},
                {code:"电动(油电混合)汽车维修",name:52},
                {code:"燃气汽车维修",name:53},
            ],
            //二类机动车维修-------
            twoCarType:[
                {code:"小型车辆维修",name:54},
                {code:"大、中型客车维修",name:55},
                {code:"大、中型货车维修",name:56},
                {code:"电动(油电混合)汽车维修",name:57},
                {code:"燃气汽车维修",name:58},
            ],
            //三类机动车维修-------
            threeCarType:[
                {code:"发动机修理",name:59},
                {code:"车身维修",name:60},
                {code:"电气系统维修",name:61},
                {code:"自动变速器维修",name:62},
                {code:"车身清洁维护",name:63},

                {code:"涂漆",name:64},
                {code:"轮胎动平衡及修补",name:65},
                {code:"四轮定位检测调整",name:66},
                {code:"供油系统维护及油品更换",name:67},
                {code:"喷油泵和喷油嘴维修",name:68},

                {code:"曲轴修磨",name:69},
                {code:"气缸镗磨",name:70},
                {code:"散热器（水箱）维修",name:71},
                {code:"空调维修",name:72},
                {code:"车辆装潢（篷布坐垫及内装饰）",name:73},
                {code:"车辆玻璃安装",name:74},
            ],
            //摩托车维修
            motorcycle:[
                {code:"一类",name:75},
                {code:"二类",name:76},
            ],
            //汽车维修
            carList:[
                {code:"A类",name:77},
                {code:"B类",name:78},
            ],
            //企业主要业务
            companySphere:[],
            //企业员工总数
            companyStaff:[],
            //企业占地面积
            companyArea:[],
            //企业主要维修车型
            vehicleModel:[
                {code:"轿车（不含出租）",name:1},
                {code:"货车",name:2},
                {code:"客车",name:3},
                {code:"出租车",name:4},
                {code:"特种车",name:5},
                {code:"主修品牌",name:6},
            ],
            //上年度质量考核
            qualityCheck:[],
            //上门服务-----
            visitService:[],
            //业户类别--------
            households:[
                {code:"企业",name:6},
                {code:"分支机构",name:7},
                {code:"个体经营户",name:8},
                {code:"其他",name:9},
            ],
            //经济类型-------
            moneyType:[
                
            ],
            //工时定额执行标准-----
            workCompanyType:[
                {code:"行业",name:1},
                {code:"制造企业",name:2},
            ],
            //是否选项------
            whetherType:[
                {code:"是",name:"1"},
                {code:"否",name:"0"},
            ],
            //通过选项---
            passType:[
                {code:"通过",name:"1"},
                {code:"未通过",name:"0"},
            ],
            //备案状态数据
            beianStatusArr:[
                {code:"待备案",name:1},
                {code:"已备案",name:2},
                {code:"未备案",name:3},
            ],
            //经营状态数据------
            businessStatusArr:[],
            //成为全国诚信企业的数据--------
            yearsArr:{
                begin:'',
                end:''
            },
            //审核状态问题------
            statusArr:[
                {code:1,name:'待审核'},
                {code:2,name:'审核成功'},
                {code:3,name:'审核不成功'},
            ]

        }
    },
    watch:{
        showDetail(){


            this.showModal=true;
            this.collapse='1';
            this.getType();
            this.getPubliceType(4);
            this.getPubliceType(6);
            this.getPubliceType(7);
            this.getPubliceType(8);
            this.getPubliceType(9);
            this.getPubliceType(30);
            this.getPubliceType(24);
            this.getCompanyArea();
            this.companyRepair='';
            this.manageArr=[];
            this.listSearch={
                "businessHours": "",//营业时间
                "postalCode": "",//经营地址邮政编码------------------------------------------------
                "businessRegion": "",//经营地址区域
                "businessAddress": "",//经营地地址
                "complaintTel": "",//企业反馈电话
                "economicType": 1,//经济类型
                "economicTypeOther": "",
                "employeeNumber": 1,//企业员工总数--------------------------
                "floorSpace": 1,//企业目前占地面积-------------------------------
                "honor": "",
                "id": "",
                "industryCategory": 1,//业户类别
                "industryCategoryOther": "",
                "iso": false,
                "latitude": "",
                "legalEmail": "",
                "legalMobile": "",
                "legalName": "",//法定代表人
                "legalTel": "",
                "licence": "",//许可证号
                "licenceBeginDate": "",//许可证有效期
                "licenceEndDate": "",//许可证有效期
                "longitude": "",
                "manager": "",
                "managerOther": "",
                "model": [],
                "modelOther": "",
                "offerOnsiteRepair": false,
                "openOnlineBusinessService": false,
                "openOnlineRepairService": false,
                "operatorEmail": "",
                "operatorMobile": "",
                "operatorName": "",
                "operatorTel": "",
                "qualityInspector": "",
                "qualityReputationAssessmentLevel": 4,
                "registerAddress": "",//工商注册地址
                "registerDate": "",//工商注册日期
                "registerRegion": "",//工商注册地址区域
                "rescue": false,
                "selfDesc": "",
                "selfIntroduction": "",
                "serviceCategory": [],
                "serviceCategoryOther": "",
                "serviceLeader": "",
                "sincerity": false,
                "sincerityYears": [],
                "specialRepair": false,//-汽车销售、维修----------------------------
                "specialRepairBrand": "",
                "specialService": "",
                "technologyLeader": "",
                "throughEnvironmentalProtectionSpecialRenovation": false,
                "throughSafetyProductionStandardization": false,
                "workingHoursPrice": "",//工时单价
                "workingHoursQuotaExecutionStandard": '',//工时定额执行标准

                "beianStatus": 0,//备案状态---------------------------------------------
                "brand": "",//企业品牌--------------------------------------------------
                "businessScope": 0,//经营范围
                "businessScope2": [
                    0
                ],//经营范围小类
                "businessSphere": [],//主要业务范围
                "businessSphereOther": "",//其他业务范围
                "businessStatus": 0,//经营状态
                "corpInfoId": 0,//企业id
                "dept": "",//管理部门
                "desc": "",//备注
                "zdz":false,//总对总
                "buttJoint":false,//是否对接

                "electricians": [
                    0,0,0,0
                ],//电工

                "machinists": [
                    0,0,0,0
                ],//机工

                "name": "",//企业名称----------------------------------------------

                "org": "",//管理机构---------------------------------------------------
                "painters": [
                    0,0,0,0
                ],//油漆工

                "show": false,//是否前台显示--------------------------------------------------------

                "special": false,//是否特约维修
                "specialRepairBrand": "",//主修品牌
                "specialService": "",//服务特色
                "status": 1,//审核状态

                "tinbenders": [
                    0,0,0,0
                ],//钣金工
                "updateTime": "",//更新时间--------------------
                "buttJointInfoDtos":[],
            };

            if(this.detailData){
                this.getDetail(this.detailData.id);
            }else{
                
            }
            console.log("this.listSearch.status",this.listSearch.status)
            this.testTitle=getName(this.statusArr,this.listSearch.status);
        },
    },
    
    methods:{
        getDetail(id){
            // this.spinShow=true;
            this.$Spin.show();
            this.$axios.get('/corp/manage/detail/'+id, {
            }).then( (res) => {
                if(res.data.code=='0'){
                    let resData=res.data.item;
                    for(let i in resData){
                        if(i=="businessHours"){
                            this.listSearch[i]=resData[i].split('-');
                        }
                        else{
                            if(resData[i]){
                                this.listSearch[i]=resData[i];
                            }
                            
                        }
                        
                    }
                    this.manageArr=[];
                    this.manageArr.push(this.listSearch.org);
                    this.manageArr.push(this.listSearch.dept);
                    this.testTitle=getName(this.statusArr,this.listSearch.status);

                    this.data9=this.listSearch["buttJointInfoDtos"];
                }
                // this.spinShow=false;
                this.$Spin.hide();
           })
        },
        //选择维修类别时带的参数--------
        repairTypeFun(name,val){
            console.log(name,val);
        },
        //新增一个企业数据---------
        addCompany(name){
            if(this.manageArr.length>0){
                this.listSearch["org"]=this.manageArr[0]||'';
                this.listSearch["dept"]=this.manageArr[1]||'';
            }

            this.$refs[name].validate((valid) => {

                if (valid) {

                    if(this.detailData){
                
                this.$axios.post('/corp/manage/update',{
                    
                    "beianStatus": this.listSearch.beianStatus,
                    "brand": this.listSearch.brand,
                    "businessAddress": this.listSearch.businessAddress,
                    "businessHours": (this.listSearch.businessHours[0]+'-'+this.listSearch.businessHours[1])||'',
                    "businessRegion": this.listSearch.businessRegion,
                    "businessScope": this.listSearch.businessScope,
                    "businessScope2": this.listSearch.businessScope2,
                    "businessSphere": this.listSearch.businessSphere,
                    "businessSphereOther": this.listSearch.businessSphereOther,
                    "businessStatus": this.listSearch.businessStatus,
                    "buttJoint": this.listSearch.buttJoint,
                    "complaintTel": this.listSearch.complaintTel,
                    "corpInfoId": this.listSearch.corpInfoId,
                    "dept": this.listSearch.dept,
                    "desc": this.listSearch.desc,
                    "economicType": this.listSearch.economicType,
                    "economicTypeOther": this.listSearch.economicTypeOther,
                    "electricians": this.listSearch.electricians,
                    "employeeNumber": this.listSearch.employeeNumber,
                    "floorSpace": this.listSearch.floorSpace,
                    "honor": this.listSearch.honor,
                    "id": this.listSearch.id,
                    "industryCategory": this.listSearch.industryCategory,
                    "industryCategoryOther": this.listSearch.industryCategoryOther,
                    "iso": this.listSearch.iso,
                    "latitude": this.listSearch.latitude,
                    "legalEmail": this.listSearch.legalEmail,
                    "legalMobile": this.listSearch.legalMobile,
                    "legalName": this.listSearch.legalName,
                    "legalTel": this.listSearch.legalTel,
                    "licence": this.listSearch.licence,
                    "licenceBeginDate": formatDate(this.listSearch.licenceBeginDate),
                    "licenceEndDate": formatDate(this.listSearch.licenceEndDate),
                    "linkmanName": this.listSearch.linkmanName,
                    "linkmanTel": this.listSearch.linkmanTel,
                    "longitude": this.listSearch.longitude,
                    "machinists": this.listSearch.machinists,
                    "manager": this.listSearch.manager,
                    "managerOther": this.listSearch.managerOther,
                    "model": this.listSearch.model,
                    "modelOther": this.listSearch.modelOther,
                    "name": this.listSearch.name,
                    "offerOnsiteRepair": this.listSearch.offerOnsiteRepair,
                    "openOnlineBusinessService": this.listSearch.openOnlineBusinessService,
                    "openOnlineRepairService": this.listSearch.openOnlineRepairService,
                    "operatorEmail": this.listSearch.operatorEmail,
                    "operatorMobile": this.listSearch.operatorMobile,
                    "operatorName": this.listSearch.operatorName,
                    "operatorTel": this.listSearch.operatorTel,
                    "org": this.listSearch.org,
                    "painters": this.listSearch.painters,
                    "postalCode": this.listSearch.postalCode,
                    "qualityInspector": this.listSearch.qualityInspector,
                    "qualityReputationAssessmentLevel": this.listSearch.qualityReputationAssessmentLevel,
                    "registerAddress": this.listSearch.registerAddress,
                    "registerDate": formatDate(this.listSearch.registerDate),
                    "registerRegion": this.listSearch.registerRegion,
                    "rescue": this.listSearch.rescue,
                    "selfIntroduction": this.listSearch.selfIntroduction,
                    "serviceCategory": this.listSearch.serviceCategory,
                    "serviceCategoryOther": this.listSearch.serviceCategoryOther,
                    "serviceLeader": this.listSearch.serviceLeader,
                    "show": this.listSearch.show,
                    "sincerity": this.listSearch.sincerity,
                    "sincerityYears": this.listSearch.sincerityYears,
                    "special": this.listSearch.special,
                    "specialRepairBrand": this.listSearch.specialRepairBrand,
                    "specialService": this.listSearch.specialService,
                    "status": this.listSearch.status,
                    "technologyLeader": this.listSearch.technologyLeader,
                    "throughEnvironmentalProtectionSpecialRenovation": this.listSearch.throughEnvironmentalProtectionSpecialRenovation,
                    "throughSafetyProductionStandardization": this.listSearch.throughSafetyProductionStandardization,
                    "tinbenders": this.listSearch.tinbenders,
                    "updateTime": formatDate(this.listSearch.updateTime),
                    "workingHoursPrice": this.listSearch.workingHoursPrice,
                    "workingHoursQuotaExecutionStandard": this.listSearch.workingHoursQuotaExecutionStandard,
                    "zdz": this.listSearch.zdz,

                }).then( (res) => {
                    if(res.data.code=='0'){
                        this.showModal=false;
                    }else{
                        this.$Message.error(res.data.status);
                    }
                })
            }else{
                this.$axios.post('/corp/manage/add',{

                    "beianStatus": this.listSearch.beianStatus,
                    "brand": this.listSearch.brand,
                    "businessAddress": this.listSearch.businessAddress,
                    "businessHours": (this.listSearch.businessHours[0]+'-'+this.listSearch.businessHours[1])||'',
                    "businessRegion": this.listSearch.businessRegion,
                    "businessScope": this.listSearch.businessScope,
                    "businessScope2": this.listSearch.businessScope2,
                    "businessSphere": this.listSearch.businessSphere,
                    "businessSphereOther": this.listSearch.businessSphereOther,
                    "businessStatus": this.listSearch.businessStatus,
                    "buttJoint": this.listSearch.buttJoint,
                    "complaintTel": this.listSearch.complaintTel,
                    "corpInfoId": this.listSearch.corpInfoId,
                    "dept": this.listSearch.dept,
                    "desc": this.listSearch.desc,
                    "economicType": this.listSearch.economicType,
                    "economicTypeOther": this.listSearch.economicTypeOther,
                    "electricians": this.listSearch.electricians,
                    "employeeNumber": this.listSearch.employeeNumber,
                    "floorSpace": this.listSearch.floorSpace,
                    "honor": this.listSearch.honor,
                    "id": this.listSearch.id,
                    "industryCategory": this.listSearch.industryCategory,
                    "industryCategoryOther": this.listSearch.industryCategoryOther,
                    "iso": this.listSearch.iso,
                    "latitude": this.listSearch.latitude,
                    "legalEmail": this.listSearch.legalEmail,
                    "legalMobile": this.listSearch.legalMobile,
                    "legalName": this.listSearch.legalName,
                    "legalTel": this.listSearch.legalTel,
                    "licence": this.listSearch.licence,
                    "licenceBeginDate": formatDate(this.listSearch.licenceBeginDate),
                    "licenceEndDate": formatDate(this.listSearch.licenceEndDate),
                    "linkmanName": this.listSearch.linkmanName,
                    "linkmanTel": this.listSearch.linkmanTel,
                    "longitude": this.listSearch.longitude,
                    "machinists": this.listSearch.machinists,
                    "manager": this.listSearch.manager,
                    "managerOther": this.listSearch.managerOther,
                    "model": this.listSearch.model,
                    "modelOther": this.listSearch.modelOther,
                    "name": this.listSearch.name,
                    "offerOnsiteRepair": this.listSearch.offerOnsiteRepair,
                    "openOnlineBusinessService": this.listSearch.openOnlineBusinessService,
                    "openOnlineRepairService": this.listSearch.openOnlineRepairService,
                    "operatorEmail": this.listSearch.operatorEmail,
                    "operatorMobile": this.listSearch.operatorMobile,
                    "operatorName": this.listSearch.operatorName,
                    "operatorTel": this.listSearch.operatorTel,
                    "org": this.listSearch.org,
                    "painters": this.listSearch.painters,
                    "postalCode": this.listSearch.postalCode,
                    "qualityInspector": this.listSearch.qualityInspector,
                    "qualityReputationAssessmentLevel": this.listSearch.qualityReputationAssessmentLevel,
                    "registerAddress": this.listSearch.registerAddress,
                    "registerDate": formatDate(this.listSearch.registerDate),
                    "registerRegion": this.listSearch.registerRegion,
                    "rescue": this.listSearch.rescue,
                    "selfIntroduction": this.listSearch.selfIntroduction,
                    "serviceCategory": this.listSearch.serviceCategory,
                    "serviceCategoryOther": this.listSearch.serviceCategoryOther,
                    "serviceLeader": this.listSearch.serviceLeader,
                    "show": this.listSearch.show,
                    "sincerity": this.listSearch.sincerity,
                    "sincerityYears": this.listSearch.sincerityYears,
                    "special": this.listSearch.special,
                    "specialRepairBrand": this.listSearch.specialRepairBrand,
                    "specialService": this.listSearch.specialService,
                    "status": this.listSearch.status,
                    "technologyLeader": this.listSearch.technologyLeader,
                    "throughEnvironmentalProtectionSpecialRenovation": this.listSearch.throughEnvironmentalProtectionSpecialRenovation,
                    "throughSafetyProductionStandardization": this.listSearch.throughSafetyProductionStandardization,
                    "tinbenders": this.listSearch.tinbenders,
                    "updateTime": formatDate(this.listSearch.updateTime),
                    "workingHoursPrice": this.listSearch.workingHoursPrice,
                    "workingHoursQuotaExecutionStandard": this.listSearch.workingHoursQuotaExecutionStandard,
                    "zdz": this.listSearch.zdz,

                }).then( (res) => {
                    if(res.data.code=='0'){
                        this.showModal=false;
                    }else{
                        this.$Message.error(res.data.status);
                    }
                })
            }
                }
            });

            
            
        },
        //获取区域信息
        getType(){
            this.$axios.post('/area/region/list', {
                areaName:'shanghai',
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.typeList=res.data.items;
                }
           })
        },
        //获取公共配置信息---------
        getPubliceType(id){
            this.$axios.get('/dict/getValuesByTypeId/'+id, 
            ).then( (res) => {
                if(res.data.code=='0'){
                    if(id==6){
                        this.companySphere=res.data.items;
                    }else if(7==id){
                        this.companyStaff=res.data.items;
                    }else if(8==id){
                        this.companyArea=res.data.items;
                    }else if(9==id){
                        this.qualityCheck=res.data.items;
                    }else if(4==id){
                        this.moneyType=res.data.items;
                    }else if(30==id){
                        this.visitService=res.data.items;
                    }else if(24==id){
                        this.businessStatusArr=res.data.items;
                    }
                    
                }
           })
        },
        
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            this.yearsArr={
                begin:'',
                end:''
            };
            this.$refs['listSearch'].resetFields();
          }
        },
        //新增诚信企业年份------
        addYear(){
            if(!this.yearsArr.begin){
                return;
            }
            let objYear={corpId:'',endYear:'',startYear:''};
            objYear['corpId']=this.listSearch.id;
            objYear['startYear']=formatDate(this.yearsArr.begin,'yyyy');
            objYear['endYear']=formatDate(this.yearsArr.end,'yyyy');

            this.listSearch.sincerityYears.push(objYear);
        },
        //审核是否通过-------------
        auditFun(flag){
            let status=1;
            if(flag){
                status=2;
            }else{
                status=3;
            }

            this.$axios.post('/corp/manage/audit', {
                "corpId": this.listSearch.id,
                "status": status,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.testTitle=getName(this.statusArr,status);
                }
                
            })
            this.modal1=false;
        },
        //获取管理部门数据------
        getCompanyArea(){
            this.$axios.get('/area/dept/list/all/shanghai', {
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.manageType=res.data.items;
                }else{
                    // this.$Message.error(res.data.status);
                }
           })
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
  padding: 5px 0;
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

    .yearClass{
        width: 110px;height: 25px;border: 1px solid #dcdee2; line-height: 25px; display: inline-block; margin-right: 10px; text-align: center ;margin-top:10px;
    }


    .header-inner {
        display: inline-block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #17233d;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span{
            color:red;
        }
    }

    .modelClass{
        text-align: center;height: 150px;
        line-height: 150px;
        font-size: 18px;
        font-weight: bold;
    }
</style>
