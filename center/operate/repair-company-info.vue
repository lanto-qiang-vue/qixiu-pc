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
    <div slot="header" class="header-inner">维修企业信息<span v-show="testTitle">（{{testTitle}}）</span></div>
    <div style="padding-bottom: 10px;">

      <common-company-info :showInfo="showInfo" :showSaveInfo="showSaveInfo" :infoId="infoId" :clearRules="clearRules" ref="comA" @saveInfoFun="saveInfoFun" @getInfo="getInfo"></common-company-info>

      <change-company-info :showChange="showChange" :detailId="detailId"></change-company-info>
    </div>
    <div slot="footer">
      <Button v-if="accessBtn('edit')" size="large" type="primary" @click="addCompany">提交</Button>
      <Button v-if="accessBtn('changelist')" v-show="detailData" size="large" type="primary"
              @click="showChange=Math.random(),detailId=listSearch.id">查看变更
      </Button>
      <Button v-if="accessBtn('audit')" v-show="detailData" size="large" type="primary" @click="modal1=true"
              :disabled="disabledAudit">审核
      </Button>
      <Button v-if="accessBtn('create')" v-show="(listSearch.createKey&&listSearch.code)" size="large" type="primary"
              @click="resetKey">重置密钥
      </Button>
      <Button v-if="accessBtn('create')" v-show="(!listSearch.createKey&&listSearch.code)" size="large" type="primary"
              @click="addKey">创建密钥
      </Button>
      <Button size="large" type="default" @click="showModal=false;">返回</Button>
    </div>



    <!--页面审核-->
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
            <div>{{keyList.name}}</div>
          </FormItem>
          <FormItem label="许可证号:">
            <div>{{keyList.license}}</div>
          </FormItem>
          <FormItem label="对接密钥:">
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

  let uploadData={
    'beianStatus': '',
    'brand': '',
    'businessAddress': '',
    'businessHours': '',
    'businessRegion': '',
    'businessScope': '',
    'businessScope2': '',
    'businessSphere': '',
    'businessSphereOther': '',
    'businessStatus': '',
    'buttJoint': '',
    'complaintTel': '',
    'corpInfoId': '',
    'dept': '',
    'desc': '',
    'economicType': '',
    'economicTypeOther': '',
    'electricians': '',
    'employeeNumber': '',
    'floorSpace': '',
    'honor': '',
    'id': '',
    'industryCategory': '',
    'industryCategoryOther': '',
    'iso': '',
    'latitude': 0,
    'legalEmail': '',
    'legalMobile': '',
    'legalName': '',
    'legalTel': '',
    'licence': '',
    'licenceBeginDate': '',
    'licenceEndDate': '',
    'linkmanName': '',
    'linkmanTel': '',
    'longitude': 0,
    'machinists': '',
    'manager': '',
    'managerOther': '',
    'model': '',
    'modelOther': '',
    'name': '',
    'offerOnsiteRepair': '',
    'openOnlineBusinessService': '',
    'openOnlineRepairService': '',
    'operatorEmail': '',
    'operatorMobile': '',
    'operatorName': '',
    'operatorTel': '',
    'org': '',
    'painters': '',
    'postalCode': '',
    'qualityInspector': '',
    'qualityReputationAssessmentLevel': '',
    'registerAddress': '',
    'registerDate': '',
    'registerRegion': '',
    'rescue': '',
    'selfIntroduction': '',
    'serviceCategory': '',
    'serviceCategoryOther': '',
    'serviceLeader': '',
    'show': '',
    'sincerity': '',
    'sincerityYears': '',
    'special': '',
    'specialRepairBrand': '',
    'specialService': '',
    'status': '',
    'technologyLeader': '',
    'throughEnvironmentalProtectionSpecialRenovation': '',
    'throughSafetyProductionStandardization': '',
    'tinbenders': '',
    'updateTime': '',
    'workingHoursPrice': '',
    'workingHoursQuotaExecutionStandard': '',
    'zdz': '',
    'source': '',
    'comprehensive': '',
    'chainBusiness': '',
    'groupBusiness': '',
    'useHss': '',
    'buttJoinTime': '',
    'useErp': '',
    'contactName': '',
    'contactPhone': '',
    'erpName': '',
  };


  export default {
    name: 'repair-company-info',
    props: ['showDetail', 'detailData'],
    mixins: [funMixin],
    components: { changeCompanyInfo,commonCompanyInfo },
    data() {
      return {
        infoId:null,//查看详情id
        showSaveInfo:null,//提交保存---
        clearRules:null,//清除规则
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
        listSearch:'',

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
    computed:{
      listSearchStatus(){
        return this.listSearch.status
      },
      disabledAudit(){
        console.log('disabledAudit',this.listSearchStatus, this.detailData&& this.detailData.status!='待审核', this.listSearchStatus!=1 || (this.detailData&& this.detailData.status!='待审核'))
        return this.listSearchStatus!=1 || (this.detailData&& this.detailData.status!='待审核')
      },
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
        this.showModal = true;

        if (this.detailData) {
          this.showInfo=Math.random();
          this.infoId=this.detailData.id;
          this.testTitle=this.detailData.status
        } else {
          this.showInfo=Math.random();
          this.infoId=null;
          this.testTitle= ''
        }
        // this.listSearch = this.$refs.comA.listSearch;
        // this.testTitle = getName(this.statusArr, this.listSearch.status)
      }
    },

    methods: {
      getInfo(info){
        this.listSearch= info
      },

      //新增一个企业数据---------
      addCompany() {
        this.showSaveInfo=Math.random();
      },
      //保存数据------
      saveInfoFun(){
        this.listSearch=this.$refs.comA.listSearch;
        let temData=deepClone(uploadData);
        for(let i in temData){
          if(i=='licenceBeginDate'){
              temData[i]=formatDate(this.listSearch.licenceBeginDate);
          }else if(i=='licenceEndDate'){
              temData[i]=formatDate(this.listSearch.licenceEndDate);
          }else if(i=='registerDate'){
              temData[i]=formatDate(this.listSearch.registerDate);
          }else if(i=='updateTime'){
              temData[i]=formatDate(this.listSearch.updateTime);
          }else if(i=='latitude'){
              temData[i]=this.listSearch.latitude || 0;
          }else if(i=='longitude'){
              temData[i]=this.listSearch.longitude || 0;
          }else if(i=='businessHours'){
              temData[i]=this.listSearch.businessHours1;
          }else{
              temData[i]=this.listSearch[i];
          }
        }
          if (this.detailData) {

              this.$axios.post('/corp/manage/update', temData).then((res) => {
                if (res.data.code == '0') {
                  this.showModal = false
                }
              })
            } else {
              this.$axios.post('/corp/manage/add', temData).then((res) => {
                if (res.data.code == '0') {
                  this.showModal = false
                }
              })
            }
      },

      visibleChange(status) {
        if (status === false) {
          this.$emit('closeDetail')

          this.clearRules=Math.random();
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
