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

      <change-company-info :showChange="showChange" :detailId="detailId"></change-company-info>
    </div>
    <div slot="footer">


      <Button  size="large" type="primary" @click="auditBut('guanlibumen-crux')"
               v-if="accessBtn('audit-crux')" v-show="(isRequire&&detailData)" :disabled="listSearch.status==2">审核</Button>


      <Button  size="large" type="primary" @click="addCompany"
               v-if="accessBtn('insert')" v-show="!detailData">保存</Button>
      <Button  size="large" type="primary" @click="addCompany"
               v-if="accessBtn('editcrux')" v-show="(isRequire&&detailData)">提交关键</Button>
      <Button  size="large" type="primary" @click="addCompany"
               v-if="accessBtn('editgeneral')" v-show="(!isRequire&&detailData)">提交一般</Button>

      <Button  size="large" type="primary" @click="auditBut('yunying-crux')"
               v-if="accessBtn('auditcrux')" v-show="(isRequire&&detailData)" :disabled="listSearch.status==2">审核关键</Button>
      <Button  size="large" type="primary" @click="auditBut('yunying-general')"
               v-if="accessBtn('auditgeneral')" v-show="(!isRequire&&detailData)" :disabled="generalList.generalStatus==2">审核一般</Button>

      <Button  size="large" type="primary" v-show="detailData"
               v-if="accessBtn('changelist')"
              @click="showChange=Math.random(),detailId=listSearch.id">查看变更
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
    props: ['showDetail', 'detailData', 'roleType'],
    mixins: [funMixin],
    components: { changeCompanyInfo,commonCompanyInfo },
    data() {
      let rules={ required: true, message: '必填项不能为空' };
      return {
        infoId:null,//查看详情id
        showSaveInfo:null,//提交保存---
        clearRules:null,//清除规则
        detailId: null,
        showChange: null,
        // spinShow:false,
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
        auditType: ''


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
        if (this.detailData) {
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
      saveInfoFun(temData){
        let url=''
        if (this.detailData) {
          if(this.isRequire){
            url= '/corp/manage/crux/update/yy'
          }else{
            url= '/corp/manage/general/update/yy'
          }
        } else {
          url = '/corp/manage/insert'
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
        this.auditInfo.corpId=this.detailData.id
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
                this.listSearch.status=this.auditInfo.status;
                this.listSearch.auditInfo=this.auditInfo.auditInfo;
                break
              }
              case 'yunying-general':{
                this.generalList.status=this.auditInfo.status;
                this.generalList.auditInfo=this.auditInfo.auditInfo;
                break
              }
            }
            this.auditModal = false;
            this.$emit('closeDetail');
            this.$Message.success('审核成功')
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
        var Url2 = document.getElementById('biao1')
        Url2.select() // 选择对象
        document.execCommand('Copy') // 执行浏览器复制命令
        this.$Message.info('对接密钥已复制好，可贴粘。')
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
