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
    <div slot="header" class="header-inner">维修企业信息</div>
    <div style="padding-bottom: 10px;">

      <common-company-info :roleType="roleType" ref="comA" @saveInfoFun="saveInfoFun" @tabStatusFun="tabStatusFun"></common-company-info>

      <change-company-info :showChange="showChange" :detailId="listSearch.id"></change-company-info>
    </div>
    <div slot="footer">


      <Button  size="large" type="primary" @click="auditBut('guanlibumen-crux')"
               v-if="accessBtn('audit-crux')" v-show="(isRequire&&listSearch.id)" :disabled="listSearch.status==2">审核</Button>
      <Button  size="large" type="primary" @click="busStuModal= true"
               v-if="accessBtn('upBusSta')" v-show="(isRequire&&listSearch.id)" >变更经营状态</Button>


      <Button  size="large" type="primary" @click="addCompany"
               v-if="accessBtn('insert')" v-show="!listSearch.id">保存</Button>
      <Button  size="large" type="primary" @click="addCompany" :disabled="listSearch.status==1"
               v-if="accessBtn('editcrux')" v-show="(isRequire&&listSearch.id)">提交关键</Button>
      <Button  size="large" type="primary" @click="addCompany" :disabled="generalList.generalStatus==1"
               v-if="accessBtn('editgeneral')" v-show="(!isRequire&&generalList.id)">提交一般</Button>

      <Button  size="large" type="primary" @click="auditBut('yunying-crux')"
               v-if="accessBtn('auditcrux')" v-show="(isRequire&&listSearch.id)" :disabled="listSearch.status!=1">审核关键</Button>
      <Button  size="large" type="primary" @click="auditBut('yunying-general')"
               v-if="accessBtn('auditgeneral')" v-show="(!isRequire&&generalList.id)" :disabled="generalList.generalStatus!=1">审核一般</Button>


      <Button  size="large" type="primary" v-show="generalList.id"
               v-if="accessBtn('changelist')"
              @click="showChange=Math.random()">查看变更
      </Button>

      <Button  size="large" type="primary" v-show="(generalList.createKey&&generalList.code)"
               v-if="accessBtn('create')" @click="resetKey">重置密钥
      </Button>
      <Button  size="large" type="primary" v-show="(!generalList.createKey&&generalList.code)"
               v-if="accessBtn('create')" @click="addKey">创建密钥
      </Button>
      <Button size="large" type="default" @click="showModal=false;">返回</Button>
    </div>



    <!--页面审核-->
    <Modal v-model="auditModal" title="审核">
      <Form :label-width="120" ref="auditInfo" :rules="auditValidate" :model="auditInfo">
        <FormItem :label="(isRequire?'关键':'一般')+'信息审核:'" >
            <RadioGroup v-model="auditInfo.status">
                <Radio label="2">通过</Radio>
                <Radio label="3">不通过</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="不通过说明:" v-show="auditInfo.status==3" prop="auditInfo">
            <Input type="textarea" :rows="1" v-model="auditInfo.auditInfo" :autosize="{minRows: 5}"
                   placeholder="请输入不通过说明"></Input>
        </FormItem>
    </Form>
      <div slot="footer">
        <Button size="large" type="primary" @click="auditFun" :disabled="auditInfo.status===''">提交</Button>
      </div>
    </Modal>

    <!--修改经营状态-->
    <Modal v-model="busStuModal" title="变更企业经营状态">
      <Form :label-width="120" ref="auditInfo" :rules="auditValidate" :model="auditInfo">
        <FormItem label="现经营状态" >
          {{showBusSt.name}}
        </FormItem>
        <FormItem label="变更为:" style="width: 300px">
          <Select v-model="chBusStat">
            <Option v-for="item in businessStatusArr" :value="item.key" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button size="large" type="primary" @click="changeBusFun" :disabled="!chBusStat">提交</Button>
      </div>
    </Modal>

    <!--密钥对接弹窗-->
    <Modal
      v-model="showKey"
      title="对接密钥"
      width="400"
      @on-visible-change="visibleChangeKey"
      :scrollable="true"
      :transfer="true"
      :footer-hide="false"
      :mask-closable="false"
      :transition-names="['', '']">
      <div>
        <!--<Form :label-width="80" id="biao1">-->
          <!--<FormItem label="企业名称：">-->
            <!--<div>{{keyList.name}}</div>-->
          <!--</FormItem>-->
          <!--<FormItem label="许可证号：">-->
            <!--<div>{{keyList.license}}</div>-->
          <!--</FormItem>-->
          <!--<FormItem label="对接密钥：">-->
            <!--<input type="text" value="" v-model="keyList.secretKey" readonly />-->
          <!--</FormItem>-->
        <!--</Form>-->

        <Input :value="`企业名称：${keyList.name}\n许可证号：${keyList.license}\n对接密钥：${keyList.secretKey}`" type="textarea" :rows="6" readonly id="key-info"/>
      </div>
      <div slot="footer">
        <Button size="large" type="primary" @click="copyUrl">复制到粘贴板</Button>
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




  export default {
    name: 'repair-company-info',
    props: {'showDetail':{}, 'detailData':{}, 'roleType':{}, 'businessStatusArr':{
      default: ()=> {
        return []
      }
    }},
    mixins: [funMixin],
    components: { changeCompanyInfo,commonCompanyInfo },
    data() {
      let rules={ required: true, message: '必填项不能为空' };
      return {
        showChange: null,

        showModal: false,

        showKey: false,//对接密钥显隐

        keyList: {
          name: '',
          license: '',
          secretKey: ''
        },

        listSearch:{},//关键数据-----
        generalList:{},//一般数据-----

        value: '',
        showInfo:null,
        //审核状态问题------
        statusArr: [
            { code: 1, name: '待审核' },
            { code: 2, name: '审核成功' },
            { code: 3, name: '审核不成功' }
        ],

        auditModal: false,
        auditInfo:{
          status:'',
          auditInfo:'',
        },
        auditValidate:{
          status: [rules],
          auditInfo: [{
            validator: (rule, value, callback) => {
              if (this.$data.auditInfo.status==3 && !value) {
                callback(new Error('请填写不通过说明'));
              }else{
                callback();
              }
            }
          }]
        },
        isRequire:true,//关键 一般flg
        auditType: '',

        busStuModal: false,
        chBusStat: ''
      }
    },

    watch: {
      showDetail() {
          this.showModal = true;
          this.isRequire=true;
          if (this.detailData) {
            switch (this.roleType){
              case 'guanlibumen':{
                this.getDetail(this.detailData.id);
                break
              }
              case 'yunying':{
                this.getDetail(this.detailData.id);
                this.getDetail1(this.detailData.id);
                break
              }
            }
          }else{
            this.listSearch = {};
            this.generalList = {};
            this.$refs.comA.mergeData({});
            this.$refs.comA.mergeOtherData({});
          }

      }
    },
    computed:{
      showBusSt(){
        let busStu= this.listSearch.businessStatus || (this.detailData && this.detailData.businessStatus) || ''
        let stName=''
        for(let i in this.businessStatusArr){
          if(this.businessStatusArr[i].key== busStu){
            stName= this.businessStatusArr[i].name
            break
          }
        }
        this.chBusStat= busStu
        return {
          key: busStu,
          name: stName
        }
      }
    },
    methods: {
      //获取详情--------
      getDetail(id, str) {
        let url= str|| '/corp/manage/crux/detail/yy/'
          this.$Spin.show()
          this.$axios.get(url + id, {}).then((res) => {
            if (res.data.code == '0') {
                let resData = res.data.item;
                this.listSearch=resData;
                this.$refs.comA.mergeData(resData);
                this.$Spin.hide()

            }
          })
      },
      getDetail1(id) {
          this.$Spin.show()
          this.$axios.get('/corp/manage/general/detail/yy/' + id, {}).then((res) => {
            if (res.data.code == '0') {
                let resData = res.data.item;
                this.generalList=resData;
              this.$refs.comA.mergeOtherData(resData);
              this.$Spin.hide()
            }
          })

      },

      //新增一个企业数据---------
      addCompany() {
        if (this.listSearch.id) {
            if(this.isRequire){
              this.$refs.comA.rulesData2();
            }else{
              this.$refs.comA.rulesData3();
            }
        }else{
            this.$refs.comA.rulesData();
        }


      },
      //保存数据------
      saveInfoFun(temData, type){
        let url=''
        switch (type){
          case 'insert':{
            url = '/corp/manage/insert'
            break
          }
          case 'crux':{
            url = '/corp/manage/crux/update/yy'
            break
          }
          case 'general':{
            url = '/corp/manage/general/update/yy'
            break
          }
        }
        this.$axios.post(url, temData).then((res) => {
          if (res.data.code == '0') {
            this.$Message.success('保存成功')
            this.showModal = false
            this.$emit('closeDetail');
          }
        })
      },

      auditBut(type){
        this.auditType= type
        this.auditModal= true
      },
      //审核是否通过-------------
      auditFun() {
        let url= ''
        this.auditInfo.corpId= this.listSearch.id
        switch (this.auditType){
          case 'guanlibumen-crux':{
            url= '/corp/manage/audit/crux'
            break
          }
          case 'yunying-crux':{
            url= '/corp/manage/crux/audit/yy'
            break
          }
          case 'yunying-general':{
            url= '/corp/manage/general/audit/yy'
            break
          }
        }
        this.$axios.post(url, this.auditInfo).then((res) => {
          if (res.data.code == '0') {
            switch (this.auditType){
              case 'guanlibumen-crux':
              case 'yunying-crux':{
                // this.listSearch.status=this.auditInfo.status;
                // this.listSearch.auditInfo=this.auditInfo.auditInfo;
                this.getDetail(this.listSearch.id);
                break
              }
              case 'yunying-general':{
                // this.generalList.status=this.auditInfo.status;
                // this.generalList.auditInfo=this.auditInfo.auditInfo;
                this.getDetail1(this.generalList.id);
                break
              }
            }
            // this.getDetail(this.listSearch.id);
            // this.getDetail1(this.generalList.id);
            this.auditModal = false;
            this.$emit('closeDetail');
            this.$Message.success('审核成功')
          }
        })

      },
      changeBusFun(){
        let id= this.listSearch.id||  (this.detailData && this.detailData.id)
        this.$axios.post('/corp/manage/update/business/status',{
          "businessStatus": this.chBusStat,
          "corpId": id
        }).then((res) => {
          if (res.data.code == '0') {
            this.getDetail(id);
            this.$emit('closeDetail');
            this.busStuModal= false
            this.$Message.success('修改成功')
          }
        })
      },

      visibleChange(status) {
        if (status === false) {
          this.auditInfo={
            status:'',
            auditInfo:'',
          }//关键信息审核----
          this.generalInfo={
            status:'',
            auditInfo:'',
          }//一般信息审核----

        }
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
        // var Url2 = document.getElementById('biao1')
        var Url2 = document.querySelector('#key-info textarea')
        Url2.select() // 选择对象
        document.execCommand('Copy') // 执行浏览器复制命令
        this.$Message.info('对接密钥已复制好，可粘贴。')
      },
      //密钥接口关闭时触发--------
      visibleChangeKey(status) {
        if (status === false) {
          for (let i in this.keyList) {
            this.keyList[i] = ''
          }
        }
      },
      //tab页切换状态----------
      tabStatusFun(name){
        if(name=='name1'){
          this.isRequire=true;
        }else if(name=='name2'){
          this.isRequire=false;
        }
        // console.log('父级接收情况',name);

      },

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
