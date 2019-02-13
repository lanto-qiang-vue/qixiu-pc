<template>
  <!--维修企业信息管理详情  2018-11-05  -->
  <Modal
    v-model="showModal"
    title="维修企业信息"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer="true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
    <div slot="header" class="header-inner">维修企业信息<span>（{{testTitle}}）</span></div>
    <div style="padding-bottom: 10px;">
      
      <common-company-info :showInfo="showInfo" :listSearch="listSearch" ref="comA"></common-company-info>
      <change-company-info :showChange="showChange" :detailId="detailId"></change-company-info>
    </div>
    <div slot="footer">
      <Button v-if="accessBtn('edit')" size="large" type="primary" @click="addCompany('listSearch')">提交</Button>
      <Button v-if="accessBtn('changelist')" v-show="detailData" size="large" type="primary"
              @click="showChange=Math.random(),detailId=listSearch.id">查看变更
      </Button>
      <Button v-if="accessBtn('audit')" v-show="detailData" size="large" type="primary" @click="modal1=true"
              :disabled="listSearch.status==2">审核
      </Button>
      <Button v-if="accessBtn('create')" v-show="(listSearch.createKey&&listSearch.code)" size="large" type="primary"
              @click="resetKey">重置密钥
      </Button>
      <Button v-if="accessBtn('create')" v-show="(!listSearch.createKey&&listSearch.code)" size="large" type="primary"
              @click="addKey">创建密钥
      </Button>
      <Button size="large" type="default" @click="showModal=false;">返回</Button>
    </div>
    <Modal v-model="modal1">
      <p class="modelClass">审核是否通过</p>
      <div slot="footer">
        <Button size="large" type="primary" @click="auditFun(true)">通过</Button>
        <Button size="large" type="error" @click="auditFun(false)">不通过</Button>
      </div>
    </Modal>


    

    <!--密钥对接弹窗-->
    <Modal
      v-model="showKey"
      title="对接密钥"
      width="300"
      @on-visible-change="visibleChangeKey"
      :scrollable="true"
      :transfer="true"
      :footer-hide="false"
      :mask-closable="false"
      :transition-names="['', '']">
      <div>
        <Form :label-width="80">
          <FormItem label="企业名称:">
            <!--<Input type="text"  v-model="keyList.name" placeholder="请输入渠道名称" ></Input>-->
            <div>{{keyList.name}}</div>
          </FormItem>
          <FormItem label="许可证号:">
            <!--<Input type="text"  v-model="keyList.license" placeholder="请输入渠道名称" ></Input>-->
            <div>{{keyList.license}}</div>
          </FormItem>
          <FormItem label="对接密钥:">
            <!--<Input type="text"  v-model="keyList.secretKey" placeholder="请输入渠道名称" ></Input>-->
            <!--<div id="biao1">{{keyList.secretKey}}</div>-->
            <input type="text" value="" v-model="keyList.secretKey" readonly id="biao1"/>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button size="large" type="primary" @click="copyUrl">复制到粘贴版</Button>
        <Button size="large" type="default" @click="showKey=false;">关闭</Button>
      </div>
    </Modal>


    <!--<Spin size="large" fix v-if="spinShow"></Spin>-->
  </Modal>

</template>

<script>
  import { imgToBase64, getName } from '@/static/util.js'
  import { formatDate } from '@/static/tools'
  import funMixin from '~/components/fun-auth-mixim.js'
  import commonCompanyInfo from '~/components/common-company-info.vue'
  import changeCompanyInfo from './change-company-info.vue'
  import { deepClone } from '~/static/util.js'

  let initList={
    'businessHours': '',//营业时间
    'postalCode': '',//经营地址邮政编码------------------------------------------------
    'businessRegion': '',//经营地址区域
    'businessAddress': '',//经营地地址
    'complaintTel': '',//企业反馈电话
    'economicType': '',//经济类型
    'economicTypeOther': '',
    'employeeNumber': '',//企业员工总数--------------------------
    'floorSpace': '',//企业目前占地面积-------------------------------
    'honor': '',
    'id': '',
    'industryCategory': null,//业户类别
    'industryCategoryOther': '',
    'iso': false,
    'latitude': 0,
    'legalEmail': '',
    'legalMobile': '',
    'legalName': '',//法定代表人
    'legalTel': '',
    'licence': '',//许可证号
    'licenceBeginDate': '',//许可证有效期
    'licenceEndDate': '',//许可证有效期
    'longitude': 0,
    'manager': '',
    'managerOther': '',
    'model': [],
    'modelOther': '',
    'offerOnsiteRepair': false,
    'openOnlineBusinessService': false,
    'openOnlineRepairService': false,
    'operatorEmail': '',
    'operatorMobile': '',
    'operatorName': '',
    'operatorTel': '',
    'qualityInspector': '',
    'qualityReputationAssessmentLevel': '',
    'registerAddress': '',//工商注册地址
    'registerDate': '',//工商注册日期
    'registerRegion': '',//工商注册地址区域
    'rescue': false,
    // "selfDesc": "",
    'selfIntroduction': '',
    'serviceCategory': [],
    'serviceCategoryOther': '',
    'serviceLeader': '',
    'sincerity': false,
    'sincerityYears': [],

    'specialRepairBrand': '',
    'specialService': '',
    'technologyLeader': '',
    'throughEnvironmentalProtectionSpecialRenovation': false,
    'throughSafetyProductionStandardization': false,
    'workingHoursPrice': '',//工时单价
    'workingHoursQuotaExecutionStandard': null,//工时定额执行标准

    'beianStatus': 1,//备案状态---------------------------------------------
    'brand': '',//企业品牌--------------------------------------------------
    'businessScope': '',//经营范围
    'businessScope2': [],//经营范围小类
    'businessSphere': [],//主要业务范围
    'businessSphereOther': '',//其他业务范围
    'businessStatus': 1,//经营状态
    'corpInfoId': '',//企业id
    'dept': '',//管理部门
    'desc': '',//自我描述
    'zdz': false,//总对总
    'buttJoint': false,//是否对接

    'electricians': [
      0, 0, 0, 0
    ],//电工

    'machinists': [
      0, 0, 0, 0
    ],//机工

    'name': '',//企业名称----------------------------------------------

    'org': '',//管理机构---------------------------------------------------
    'painters': [
      0, 0, 0, 0
    ],//油漆工

    'show': false,//是否前台显示--------------------------------------------------------

    'special': false,//是否特约维修
    'specialRepairBrand': '',//主修品牌
    'specialService': '',//服务特色
    'status': 1,//审核状态

    'tinbenders': [
      0, 0, 0, 0
    ],//钣金工
    'updateTime': '',//更新时间--------------------
    'buttJointInfoDtos': [],

    'source': '',//对接渠道数据----------
    'comprehensive': false,
    'chainBusiness': false,
    'groupBusiness': false,
    'useHss': false,
    'buttJoinTime': '',//对接时间---
    'useErp': false,
    'contactName': '',
    'contactPhone': '',
    'erpName': '',
    'code': '',//对接的秘钥---
    'createKey': '',
    'manageArr':'',
  };
  export default {
    name: 'repair-company-info',
    props: ['showDetail', 'detailData'],
    mixins: [funMixin],
    components: { changeCompanyInfo,commonCompanyInfo },
    data() {
      return {
        
        detailId: null,
        showChange: null,
        // spinShow:false,
        showModal: false,
        
        showKey: false,//对接密钥显隐
        testTitle: '',
        modal1: false,
        
        keyList: {
          name: '',
          license: '',
          secretKey: ''
        },
        
        
        listSearch: {
          'businessHours': '',//营业时间
          'postalCode': '',//经营地址邮政编码------------------------------------------------
          'businessRegion': '',//经营地址区域
          'businessAddress': '',//经营地地址
          'complaintTel': '',//企业反馈电话
          'economicType': '',//经济类型
          'economicTypeOther': '',
          'employeeNumber': '',//企业员工总数--------------------------
          'floorSpace': '',//企业目前占地面积-------------------------------
          'honor': '',
          'id': '',
          'industryCategory': null,//业户类别
          'industryCategoryOther': '',
          'iso': false,
          'latitude': 0,
          'legalEmail': '',
          'legalMobile': '',
          'legalName': '',//法定代表人
          'legalTel': '',
          'licence': '',//许可证号
          'licenceBeginDate': '',//许可证有效期
          'licenceEndDate': '',//许可证有效期
          'longitude': 0,
          'manager': '',
          'managerOther': '',
          'model': [],
          'modelOther': '',
          'offerOnsiteRepair': false,
          'openOnlineBusinessService': false,
          'openOnlineRepairService': false,
          'operatorEmail': '',
          'operatorMobile': '',
          'operatorName': '',
          'operatorTel': '',
          'qualityInspector': '',
          'qualityReputationAssessmentLevel': '',
          'registerAddress': '',//工商注册地址
          'registerDate': '',//工商注册日期
          'registerRegion': '',//工商注册地址区域
          'rescue': false,
          // "selfDesc": "",
          'selfIntroduction': '',
          'serviceCategory': [],
          'serviceCategoryOther': '',
          'serviceLeader': '',
          'sincerity': false,
          'sincerityYears': [],

          'specialRepairBrand': '',
          'specialService': '',
          'technologyLeader': '',
          'throughEnvironmentalProtectionSpecialRenovation': false,
          'throughSafetyProductionStandardization': false,
          'workingHoursPrice': '',//工时单价
          'workingHoursQuotaExecutionStandard': null,//工时定额执行标准

          'beianStatus': 1,//备案状态---------------------------------------------
          'brand': '',//企业品牌--------------------------------------------------
          'businessScope': '',//经营范围
          'businessScope2': [],//经营范围小类
          'businessSphere': [],//主要业务范围
          'businessSphereOther': '',//其他业务范围
          'businessStatus': 1,//经营状态
          'corpInfoId': '',//企业id
          'dept': '',//管理部门
          'desc': '',//自我描述
          'zdz': false,//总对总
          'buttJoint': false,//是否对接

          'electricians': [
            0, 0, 0, 0
          ],//电工

          'machinists': [
            0, 0, 0, 0
          ],//机工

          'name': '',//企业名称----------------------------------------------

          'org': '',//管理机构---------------------------------------------------
          'painters': [
            0, 0, 0, 0
          ],//油漆工

          'show': false,//是否前台显示--------------------------------------------------------

          'special': false,//是否特约维修
          'specialRepairBrand': '',//主修品牌
          'specialService': '',//服务特色
          'status': 1,//审核状态

          'tinbenders': [
            0, 0, 0, 0
          ],//钣金工
          'updateTime': '',//更新时间--------------------
          'buttJointInfoDtos': [],

          'source': '',//对接渠道数据----------
          'comprehensive': false,
          'chainBusiness': false,
          'groupBusiness': false,
          'useHss': false,
          'buttJoinTime': '',//对接时间---
          'useErp': false,
          'contactName': '',
          'contactPhone': '',
          'erpName': '',
          'code': '',//对接的秘钥---
          'createKey': '',
          'manageArr':'',
        },
        value: '',
        showInfo:null,
        //审核状态问题------
            statusArr: [
                { code: 1, name: '待审核' },
                { code: 2, name: '审核成功' },
                { code: 3, name: '审核不成功' }
            ],
      }
    },
    watch: {
      manageArr(val){
       if(val.length == 0){
         this.listSearch.manageArr = "";
       }else{
         this.listSearch.manageArr = 1;
       }
      },
      showDetail() {
        this.showInfo=Math.random();
        

        this.showModal = true;
        this.companyRepair = '';
        this.manageArr = [];

        this.listSearch = deepClone(initList);

        if (this.detailData) {
          this.getDetail(this.detailData.id)
        } else {

        }
        // console.log('this.listSearch.status', this.listSearch.status)
        this.testTitle = getName(this.statusArr, this.listSearch.status)
      }
    },

    methods: {
      getDetail(id) {
        // this.spinShow=true;
        this.$Spin.show()
        this.$axios.get('/corp/manage/detail/' + id, {}).then((res) => {
          if (res.data.code == '0') {
            let resData = res.data.item
            for (let i in resData) {
              if (i == 'businessHours') {
                this.listSearch[i] = resData[i].split('-')
                // console.log(this.listSearch[i]);
              } else if (i == 'source') {
                this.listSearch[i] = resData[i]
              } else if (i == 'createKey') {
                this.listSearch[i] = resData[i]
              } else {
                if (resData[i]) {
                  console.log(i)
                  this.listSearch[i] = resData[i]
                }

              }

            }

            // console.log("this.listSearch",this.listSearch);
            this.manageArr = []
            this.manageArr.push(this.listSearch.org)
            this.manageArr.push(this.listSearch.dept)
            this.testTitle = getName(this.statusArr, this.listSearch.status)


            this.showInfo=Math.random();
          }
          // this.spinShow=false;
          this.$Spin.hide()
        })
      },
      
      //新增一个企业数据---------
      addCompany(name) {
        let testData=this.$refs.comA.listSearch;
        console.log('testData---------',testData)

        if ((this.listSearch.businessSphere.indexOf(88) != -1) && (!this.listSearch.businessSphereOther)) {
          this.$Message.error('请填写其他主要业务范围')
          return
        }

        if ((this.listSearch.special) && (!this.listSearch.specialRepairBrand)) {
          this.$Message.error('请填写特约维修品牌')
          return
        }

        if ((this.listSearch.industryCategory == 9) && (!this.listSearch.industryCategoryOther)) {
          this.$Message.error('请填写其他业户类别')
          return
        }

        if ((this.listSearch.economicType == 900) && (!this.listSearch.economicTypeOther)) {
          this.$Message.error('请填写其他经济类型')
          return
        }

        if ((this.listSearch.model.indexOf(6) != -1) && (!this.listSearch.modelOther)) {
          this.$Message.error('请填写主修品牌')
          return
        }

        if ((this.listSearch.serviceCategory.indexOf(300007) != -1) && (!this.listSearch.serviceCategoryOther)) {
          this.$Message.error('请填写其他服务种类')
          return
        }

        if ((this.listSearch.sincerity) && (this.listSearch.sincerityYears.length == 0)) {
          this.$Message.error('请填写成为全国诚信维修企业的年份')
          return
        }
        if ((this.listSearch.useErp) && (!this.listSearch.contactName)) {

          this.$Message.error('请填写Erp提供商姓名')
          return
        }

        if ((this.listSearch.useErp) && (!this.listSearch.contactPhone)) {

          this.$Message.error('请填写Erp提供商电话')
          return
        }

        if ((this.listSearch.useErp) && (!this.listSearch.erpName)) {

          this.$Message.error('请填写Erp企业名称')
          return
        }


        console.log(this.manageArr)
        if (this.manageArr.length > 0) {
          this.listSearch['org'] = this.manageArr[0] || ''
          this.listSearch['dept'] = this.manageArr[1] || ''
        } else {
          this.listSearch['org'] = ''
          this.listSearch['dept'] = ''
        }

        let businessHours = ''
        console.log(this.listSearch.businessHours)
        if (this.listSearch.businessHours.length > 0 && this.listSearch.businessHours[0] && this.listSearch.businessHours[1]) {
          businessHours = this.listSearch.businessHours[0] + '-' + this.listSearch.businessHours[1]
        }
        this.$refs[name].validate((valid) => {

          if (valid) {

            if (this.detailData) {

              this.$axios.post('/corp/manage/update', {

                'beianStatus': this.listSearch.beianStatus,
                'brand': this.listSearch.brand,
                'businessAddress': this.listSearch.businessAddress,
                'businessHours': businessHours,
                'businessRegion': this.listSearch.businessRegion,
                'businessScope': this.listSearch.businessScope,
                'businessScope2': this.listSearch.businessScope2,
                'businessSphere': this.listSearch.businessSphere,
                'businessSphereOther': this.listSearch.businessSphereOther,
                'businessStatus': this.listSearch.businessStatus,
                'buttJoint': this.listSearch.buttJoint,
                'complaintTel': this.listSearch.complaintTel,
                'corpInfoId': this.listSearch.corpInfoId,
                'dept': this.listSearch.dept,
                'desc': this.listSearch.desc,
                'economicType': this.listSearch.economicType,
                'economicTypeOther': this.listSearch.economicTypeOther,
                'electricians': this.listSearch.electricians,
                'employeeNumber': this.listSearch.employeeNumber,
                'floorSpace': this.listSearch.floorSpace,
                'honor': this.listSearch.honor,
                'id': this.listSearch.id,
                'industryCategory': this.listSearch.industryCategory,
                'industryCategoryOther': this.listSearch.industryCategoryOther,
                'iso': this.listSearch.iso,
                'latitude': this.listSearch.latitude || 0,
                'legalEmail': this.listSearch.legalEmail,
                'legalMobile': this.listSearch.legalMobile,
                'legalName': this.listSearch.legalName,
                'legalTel': this.listSearch.legalTel,
                'licence': this.listSearch.licence,
                'licenceBeginDate': formatDate(this.listSearch.licenceBeginDate),
                'licenceEndDate': formatDate(this.listSearch.licenceEndDate),
                'linkmanName': this.listSearch.linkmanName,
                'linkmanTel': this.listSearch.linkmanTel,
                'longitude': this.listSearch.longitude || 0,
                'machinists': this.listSearch.machinists,
                'manager': this.listSearch.manager,
                'managerOther': this.listSearch.managerOther,
                'model': this.listSearch.model,
                'modelOther': this.listSearch.modelOther,
                'name': this.listSearch.name,
                'offerOnsiteRepair': this.listSearch.offerOnsiteRepair,
                'openOnlineBusinessService': this.listSearch.openOnlineBusinessService,
                'openOnlineRepairService': this.listSearch.openOnlineRepairService,
                'operatorEmail': this.listSearch.operatorEmail,
                'operatorMobile': this.listSearch.operatorMobile,
                'operatorName': this.listSearch.operatorName,
                'operatorTel': this.listSearch.operatorTel,
                'org': this.listSearch.org,
                'painters': this.listSearch.painters,
                'postalCode': this.listSearch.postalCode,
                'qualityInspector': this.listSearch.qualityInspector,
                'qualityReputationAssessmentLevel': this.listSearch.qualityReputationAssessmentLevel,
                'registerAddress': this.listSearch.registerAddress,
                'registerDate': formatDate(this.listSearch.registerDate),
                'registerRegion': this.listSearch.registerRegion,
                'rescue': this.listSearch.rescue,
                'selfIntroduction': this.listSearch.selfIntroduction,
                'serviceCategory': this.listSearch.serviceCategory,
                'serviceCategoryOther': this.listSearch.serviceCategoryOther,
                'serviceLeader': this.listSearch.serviceLeader,
                'show': this.listSearch.show,
                'sincerity': this.listSearch.sincerity,
                'sincerityYears': this.listSearch.sincerityYears,
                'special': this.listSearch.special,
                'specialRepairBrand': this.listSearch.specialRepairBrand,
                'specialService': this.listSearch.specialService,
                'status': this.listSearch.status,
                'technologyLeader': this.listSearch.technologyLeader,
                'throughEnvironmentalProtectionSpecialRenovation': this.listSearch.throughEnvironmentalProtectionSpecialRenovation,
                'throughSafetyProductionStandardization': this.listSearch.throughSafetyProductionStandardization,
                'tinbenders': this.listSearch.tinbenders,
                'updateTime': formatDate(this.listSearch.updateTime),
                'workingHoursPrice': this.listSearch.workingHoursPrice,
                'workingHoursQuotaExecutionStandard': this.listSearch.workingHoursQuotaExecutionStandard,
                'zdz': this.listSearch.zdz,
                'source': this.listSearch.source,//对接渠道数据----------
                'comprehensive': this.listSearch.comprehensive,
                'chainBusiness': this.listSearch.chainBusiness,
                'groupBusiness': this.listSearch.groupBusiness,
                'useHss': this.listSearch.useHss,
                'buttJoinTime': this.listSearch.buttJoinTime,//对接时间---
                'useErp': this.listSearch.useErp,
                'contactName': this.listSearch.contactName,
                'contactPhone': this.listSearch.contactPhone,
                'erpName': this.listSearch.erpName
              }).then((res) => {
                if (res.data.code == '0') {
                  this.showModal = false
                } else {
                  // this.$Message.error(res.data.status);
                }
              })
            } else {
              this.$axios.post('/corp/manage/add', {

                'beianStatus': this.listSearch.beianStatus,
                'brand': this.listSearch.brand,
                'businessAddress': this.listSearch.businessAddress,
                'businessHours': businessHours,
                'businessRegion': this.listSearch.businessRegion,
                'businessScope': this.listSearch.businessScope,
                'businessScope2': this.listSearch.businessScope2,
                'businessSphere': this.listSearch.businessSphere,
                'businessSphereOther': this.listSearch.businessSphereOther,
                'businessStatus': this.listSearch.businessStatus,
                'buttJoint': this.listSearch.buttJoint,
                'complaintTel': this.listSearch.complaintTel,
                'corpInfoId': this.listSearch.corpInfoId,
                'dept': this.listSearch.dept,
                'desc': this.listSearch.desc,
                'economicType': this.listSearch.economicType,
                'economicTypeOther': this.listSearch.economicTypeOther,
                'electricians': this.listSearch.electricians,
                'employeeNumber': this.listSearch.employeeNumber,
                'floorSpace': this.listSearch.floorSpace,
                'honor': this.listSearch.honor,
                'id': this.listSearch.id,
                'industryCategory': this.listSearch.industryCategory,
                'industryCategoryOther': this.listSearch.industryCategoryOther,
                'iso': this.listSearch.iso,
                'latitude': this.listSearch.latitude || 0,
                'legalEmail': this.listSearch.legalEmail,
                'legalMobile': this.listSearch.legalMobile,
                'legalName': this.listSearch.legalName,
                'legalTel': this.listSearch.legalTel,
                'licence': this.listSearch.licence,
                'licenceBeginDate': formatDate(this.listSearch.licenceBeginDate),
                'licenceEndDate': formatDate(this.listSearch.licenceEndDate),
                'linkmanName': this.listSearch.linkmanName,
                'linkmanTel': this.listSearch.linkmanTel,
                'longitude': this.listSearch.longitude || 0,
                'machinists': this.listSearch.machinists,
                'manager': this.listSearch.manager,
                'managerOther': this.listSearch.managerOther,
                'model': this.listSearch.model,
                'modelOther': this.listSearch.modelOther,
                'name': this.listSearch.name,
                'offerOnsiteRepair': this.listSearch.offerOnsiteRepair,
                'openOnlineBusinessService': this.listSearch.openOnlineBusinessService,
                'openOnlineRepairService': this.listSearch.openOnlineRepairService,
                'operatorEmail': this.listSearch.operatorEmail,
                'operatorMobile': this.listSearch.operatorMobile,
                'operatorName': this.listSearch.operatorName,
                'operatorTel': this.listSearch.operatorTel,
                'org': this.listSearch.org,
                'painters': this.listSearch.painters,
                'postalCode': this.listSearch.postalCode,
                'qualityInspector': this.listSearch.qualityInspector,
                'qualityReputationAssessmentLevel': this.listSearch.qualityReputationAssessmentLevel,
                'registerAddress': this.listSearch.registerAddress,
                'registerDate': formatDate(this.listSearch.registerDate),
                'registerRegion': this.listSearch.registerRegion,
                'rescue': this.listSearch.rescue,
                'selfIntroduction': this.listSearch.selfIntroduction,
                'serviceCategory': this.listSearch.serviceCategory,
                'serviceCategoryOther': this.listSearch.serviceCategoryOther,
                'serviceLeader': this.listSearch.serviceLeader,
                'show': this.listSearch.show,
                'sincerity': this.listSearch.sincerity,
                'sincerityYears': this.listSearch.sincerityYears,
                'special': this.listSearch.special,
                'specialRepairBrand': this.listSearch.specialRepairBrand,
                'specialService': this.listSearch.specialService,
                'status': this.listSearch.status,
                'technologyLeader': this.listSearch.technologyLeader,
                'throughEnvironmentalProtectionSpecialRenovation': this.listSearch.throughEnvironmentalProtectionSpecialRenovation,
                'throughSafetyProductionStandardization': this.listSearch.throughSafetyProductionStandardization,
                'tinbenders': this.listSearch.tinbenders,
                'updateTime': formatDate(this.listSearch.updateTime),
                'workingHoursPrice': this.listSearch.workingHoursPrice,
                'workingHoursQuotaExecutionStandard': this.listSearch.workingHoursQuotaExecutionStandard,
                'zdz': this.listSearch.zdz,
                'source': this.listSearch.source,//对接渠道数据----------
                'comprehensive': this.listSearch.comprehensive,
                'chainBusiness': this.listSearch.chainBusiness,
                'groupBusiness': this.listSearch.groupBusiness,
                'useHss': this.listSearch.useHss,
                'buttJoinTime': this.listSearch.buttJoinTime,//对接时间---
                'useErp': this.listSearch.useErp,
                'contactName': this.listSearch.contactName,
                'contactPhone': this.listSearch.contactPhone,
                'erpName': this.listSearch.erpName
              }).then((res) => {
                if (res.data.code == '0') {
                  this.showModal = false
                } else {
                  // this.$Message.error(res.data.status);
                }
              })
            }
          }
        })


      },
      
      

      visibleChange(status) {
        if (status === false) {
          this.$emit('closeDetail')
          this.yearsArr = {
            begin: '',
            end: ''
          }
          this.$refs['listSearch'].resetFields()
        }
      },
      
      //审核是否通过-------------
      auditFun(flag) {
        let status = 1
        if (flag) {
          status = 2
        } else {
          status = 3
        }

        this.$axios.post('/corp/manage/audit', {
          'corpId': this.listSearch.id,
          'status': status
        }).then((res) => {
          if (res.data.code == '0') {
            this.testTitle = getName(this.statusArr, status)
            this.listSearch.status = status
          }

        })
        this.modal1 = false
      },
      
      
      
      //创建密钥接口----------
      addKey() {
        this.$Modal.confirm({
          title: '系统提示!',
          content: '确定要创建吗？',
          onOk: this.corpKey
        })
      },
      //重置密钥接口------------
      resetKey() {
        this.$Modal.confirm({
          title: '系统提示!',
          content: '确定要重置吗？',
          onOk: this.corpKey
        })
      },
      corpKey() {
        this.$axios.get('/corp/manage/key/' + this.listSearch.id, {}).then((res) => {
          if (res.data.code == '0') {
            for (let i in res.data.item) {
              this.keyList[i] = res.data.item[i]
            }
            this.showKey = true
          }
        })

      },
      //复制到粘贴版-----
      copyUrl() {
        var Url2 = document.getElementById('biao1')
        Url2.select() // 选择对象
        document.execCommand('Copy') // 执行浏览器复制命令
        this.$Message.info('对接密钥已复制好，可贴粘。')
      },
      //密钥接口关闭时触发--------
      visibleChangeKey() {
        if (status === false) {
          for (let i in this.keyList) {
            this.keyList[i] = ''
          }
        }
      }

    }
  }
</script>

<style scoped lang="less">
  #biao1 {
    border: none;
    color: #515a6e;
  }

  .content-list {
    width: 100%;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      float: left;
    }
    h3 {
      float: left;
      height: 45px;
      line-height: 45px;
      margin-left: 10px;
    }
    span {
      float: right;
    }

  }

  .content-p {
    padding-left: 55px;
  }

  .menu-manage {

  }

  .search-block {
    display: inline-block;
    width: 200px;
    margin-right: 10px;
  }

  .r-list-search {
    width: 100%;
    padding: 10px 0;

  }

  .pic-card {
    display: inline-block;
    margin: 0 10px 10px 0;
    width: 200px;
    min-width: 200px;

    .red {
      color: red;
    }
    .pic-body {
      width: 100%;
      height: 150px;
      /*border: 1px solid #dcdee2;*/
      position: relative;
      .no-pic {
        width: 250px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .pic {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      .button {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        text-align: center;
        > * {
          margin: 0 5px;
          vertical-align: top;
        }
        .up-img {
          display: inline-block;
          overflow: hidden;
          position: relative;
          .input {
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

  .yearClass {
    width: 110px;
    height: 25px;
    border: 1px solid #dcdee2;
    line-height: 25px;
    display: inline-block;
    margin-right: 10px;
    text-align: center;
    margin-top: 10px;
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

    span {
      color: red;
    }
  }

  .modelClass {
    text-align: center;
    height: 150px;
    line-height: 150px;
    font-size: 18px;
    font-weight: bold;
  }
</style>
