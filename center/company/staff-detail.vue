<template>
  <div style="">
    <div style="height:10px;clear:both;"></div>
    <div style="height:auto;width:100%;">
      <div style="float:left;height:auto;width:50%;padding-bottom:20px;">
        <Form class="common-form" :model="formData" ref="formData" :rules="rule" :label-width="120">
          <FormItem label="姓名" style="width:80%;" prop="name">
            <Input type="text" v-model="formData.name"></Input>
          </FormItem>
          <FormItem label="性别:" style="width:80%;" prop="gender">
            <RadioGroup v-model="formData.gender">
              <Radio label="1">男</Radio>
              <Radio label="2">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="学历:" prop="education">
            <Select v-model="formData.education">
              <Option v-for="item in educationList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否在岗:" style="width:80%;" prop="onDuty">
            <RadioGroup v-model="formData.onDuty">
              <Radio label="true">是</Radio>
              <Radio label="false">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="岗位:" style="width:80%;" prop="position">
            <RadioGroup v-model="formData.position">
              <Radio v-for="item in positionList" :label="item.id">{{item.name}}</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
      <div style="float:left;height:auto;width:30%;position:relative;">
        <Upload
          multiple
          :headers="{token:this.$store.state.user.token}"
          :show-upload-list="false"
          :format="['jpg','jpeg','png']"
          accept="image/png,image/jpeg"
          :max-size="3072"
          :on-success="handleSuccess"
          action="/proxy/file/image/add">
          <div style="height:250px;width:250px;border-radius:50%;position:absolute;left:50%;margin-left:-125px;">
            <img style="height:250px;width:250px;background: white;border-radius:50%;border:1px solid black;"
                 :src="(formData.staffImageList.length > 0 ? formData.staffImageList[0].url : '')"/>
          </div>
        </Upload>
        <div style="height:250px;"></div>
        <div id="userpicturelabel"
             style="margin-top:10px;height:36px;text-align: center;font-size: 14px;border: 1px solid #e6e6e6;border-radius: 2px 0 0 2px;text-align: center;background-color: #FBFBFB;">
          <span style="line-height: 36px;">证件照</span></div>
        <blockquote class="layui-elem-quote" style="margin-top:10px;">
          图片文件小于3M（建议使用高质量图片,仅支持jpg、png、jpeg）
        </blockquote>
      </div>
    </div>
    <div style="clear:both;"></div>
    <div style="width:80%;">
      <Form class="common-form" :model="formData" :ref="formData" :rules="rule1" :label-width="120">
        <FormItem label="职称" style="width:45%;">
          <Input type="text" v-model="formData.professionalTitle"></Input>
        </FormItem>
        <FormItem style="width:45%;" :label-width="20">
          填写专业技术职务，例如助理工程师，工程师，高级工程师等
        </FormItem>
        <div style="clear:both;">
          <FormItem style="width:120px;text-align:right;padding-right:10px;" :label-width="0">
            荣誉称号:
          </FormItem>
          <FormItem style="width:80px;text-align:left;padding-right:10px;" :label-width="0">
            <Checkbox label="国家级" @on-change="changeA" :value="!typeA">国家级</Checkbox>
          </FormItem>
          <FormItem style="width:350px;text-align:left;padding-right:10px;" :label-width="0">
            <Input style="width:100%;" :disabled="typeA" v-model="formData.nationalHonor"></Input>
          </FormItem>
          <!--分隔-->
          <div style="clear:both;">
          </div>
          <FormItem style="width:120px;text-align:right;padding-right:10px;" :label-width="0">
          </FormItem>
          <FormItem style="width:80px;text-align:left;padding-right:10px;" :label-width="0">
            <Checkbox label="省市级" @on-change="changeB" :value="!typeB">省市级</Checkbox>
          </FormItem>
          <FormItem style="width:350px;text-align:left;padding-right:10px;" :label-width="0">
            <Input style="width:100%;" :disabled="typeB" v-model="formData.provincialHonor"></Input>
          </FormItem>
          <!--分隔-->
          <div style="clear:both;">
          </div>
          <FormItem style="width:120px;text-align:right;padding-right:10px;" :label-width="0">
          </FormItem>
          <FormItem style="width:80px;text-align:left;padding-right:10px;" :label-width="0">
            <Checkbox label="区级" @on-change="changeC" :value="!typeC">区级</Checkbox>
          </FormItem>
          <FormItem style="width:350px;text-align:left;padding-right:10px;" :label-width="0">
            <Input style="width:100%;" :disabled="typeC" v-model="formData.districtHonor"></Input>
          </FormItem>
          <!--分隔-->
          <div style="clear:both;">
          </div>
          <FormItem style="width:120px;text-align:right;padding-right:10px;" :label-width="0">
          </FormItem>
          <FormItem style="width:80px;text-align:left;padding-right:10px;" :label-width="0">
            <Checkbox label="产业级" @on-change="changeD" :value="!typeD">产业级</Checkbox>
          </FormItem>
          <FormItem style="width:350px;text-align:left;padding-right:10px;" :label-width="0">
            <Input style="width:100%;" :disabled="typeD" v-model="formData.industryLevelHonor"></Input>
          </FormItem>
          <!--分隔-->
          <div style="clear:both;">
          </div>
          <FormItem style="width:120px;text-align:right;padding-right:10px;" :label-width="0">
          </FormItem>
          <FormItem style="width:80px;text-align:left;padding-right:10px;" :label-width="0">
            <Checkbox label="其他" @on-change="changeE" :value="!typeE">其他</Checkbox>
          </FormItem>
          <FormItem style="width:350px;text-align:left;padding-right:10px;" :label-width="0">
            <Input style="width:100%;" :disabled="typeE" v-model="formData.otherHonor"></Input>
          </FormItem>
        </div>
      </Form>
    </div>
    <Button type="primary" @click="handleTabsAdd" style="margin:20px 0 20px 120px;">添加证书</Button>
    <Tabs type="card" :before-remove='beforeRemove' v-model="indexName" style="width:80%;" @on-click="qh">
      <TabPane v-for="(item,tab) in formData.staffCertList" :closable="true" :key="tab" :name="'s'+(tab)"
               :label="'证书' + (tab+1)">
        <Form class="common-form" :model="item" ref="s1" :rules="rules" :label-width="120">
          <FormItem label="名称" prop="certName" style="width:80%;">
            <Input type="text" v-model="item.certName"></Input>
          </FormItem>
          <FormItem label="职业(工种)" prop="trade" style="width:80%;">
            <Input type="text" v-model="item.trade"></Input>
          </FormItem>
          <FormItem label="职业(等级)" prop="level" style="width:80%;">
            <RadioGroup v-model="item.level">
              <Radio v-for="item in positionList" :label="item.id">{{item.name}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="证书编号" prop="certCode" style="width:80%;">
            <Input type="text" v-model="item.certCode"></Input>
          </FormItem>
          <FormItem label="发证日期" prop="issueDate" style="width:80%;">
          <DatePicker type="date" :transfer="true" style="width:100%;" v-model="item.issueDate"></DatePicker>
          </FormItem>
          <FormItem label="鉴定机构" prop="issuingAuthority" style="width:80%;">
            <Input type="text" v-model="item.issuingAuthority"></Input>
          </FormItem>
          <FormItem label="证书上传" prop="url" style="width:80%;">
            <!--<div>-->
            <!--<upload-img :description="'上传证书'" :data="item.staffCertImageList" :callback="'success'"-->
            <!--@success="success"></upload-img>-->
            <!--</div>-->
            <Upload
              multiple
              :headers="{token:item.token}"
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              accept="image/png,image/jpeg"
              :max-size="3072"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleBeforeUpload"
              :before-upload="handleBefore"
              :on-success="success"
              action="/proxy/file/image/add">
              <Button type="primary">上传图片</Button>
            </Upload>
          </FormItem>
          <!--<div>{{item.token}}</div>-->
          <div style="clear: both;"></div>
          <FormItem style="width:100%;">
            <div>
              <div style="float:left;" class="demo-upload-list" v-for="im in item.staffCertImageList">
                <img :src="im.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(im.url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(im)"></Icon>
                </div>
              </div>
            </div>
          </FormItem>
        </Form>
      </TabPane>
      <!--<Button @click="handleTabsAdd" size="small" slot="extra">增加</Button>-->
    </Tabs>
    <Modal title="查看图片" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
    <Form :label-width="120">
      <FormItem>
        <Button @click="submit" type="primary">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import uploadImg from '~/components/uploadImg.vue'
  import { deepClone } from '../../static/util'

  export default {
    name: 'staff-detail',
    components: { uploadImg },
    data() {
      const validateChange = (rule, value, callback) => {
        if (value == 0) {
          callback(new Error('请选择学历'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        imgName: '',
        id: null,
        typeA: true,
        typeB: true,
        typeC: true,
        typeD: true,
        typeE: true,
        educationList: [
          { id: 0, name: '请选择' },
          { id: 1, name: '小学' },
          { id: 2, name: '初中' },
          { id: 3, name: '高中' },
          { id: 7, name: '技校' },
          { id: 8, name: '中专' },
          { id: 9, name: '高职' },
          { id: 5, name: '本科' },
          { id: 6, name: '硕士' },
          { id: 10, name: '博士' }
        ],
        positionList: [
          { id: '1', name: '技术负责人' },
          { id: '2', name: '质量检验员' },
          { id: '3', name: '汽车维修机工' },
          { id: '4', name: '汽车维修电工' },
          { id: '5', name: '汽车维修钣金工' },
          { id: '6', name: '汽车维修漆工' },
          { id: '7', name: '焊工' },
          { id: '8', name: '轮胎维修工' },
          { id: '9', name: '气缸镗磨工' },
          { id: '10', name: '曲轴修磨工' },
          { id: '11', name: '汽车美容装潢工' },
          { id: '12', name: '摩托车修理工' },
          { id: '13', name: '车身清洁工' }
        ],
        levelList: [
          { id: '1', name: '五级/初级' },
          { id: '2', name: '四级/中级' },
          { id: '3', name: '三级/高级' },
          { id: '4', name: '二级/技师' },
          { id: '5', name: '一级/高级技师' }
        ],
        tabs: 2,
        indexName: 's0',
        formData: {
          id: null,
          name: '',
          gender: '1',
          education: 0,
          position: '1',
          onDuty: 'true',
          professionalTitle: '',
          staffImageList: [{ url: '' }],
          nationalHonor: '',
          provincialHonor: '',
          districtHonor: '',
          industryLevelHonor: '',
          otherHonor: '',
          staffCertList: []
        },
        rule: {
          name: [{ required: true, message: '姓名必填' }],
          gender: [{ required: true, message: '性别必填' }],
          education: [{ required: true, message: '学历必选' }, { validator: validateChange, trigger: 'blur,change' }],
          onDuty: [{ required: true, message: '必填项' }],
          position: [{ required: true, message: '岗位必选' }]
        },
        rule1: {},
        rules: {
          certName: [{ required: true, message: '名称必填' }],
          trade: [{ required: true, message: '工种必填' }],
          certCode: [{ required: true, message: '工种必填' }],
          issueDate: [{ required: true, message: '工种必填' }],
          issuingAuthority: [{ required: true, message: '工种必填' }],
          url: [{ required: true, message: '图片为必填项' }]
        }
      }
    },
    mounted() {
      this.formData.id = this.$route.query.id || null
      if (this.formData.id > 0) {
        this.$axios.get('/staff/detail/' + this.formData.id).then((res) => {
          if (res.data.code == '0') {
            let item = res.data.item
            item.gender = item.gender.toString()
            item.position = item.position.toString()
            if (item.nationalHonor != '') {
              this.typeA = false
            }
            if (item.provincialHonor != '') {
              this.typeB = false
            }
            if (item.districtHonor != '') {
              this.typeC = false
            }
            if (item.industryLevelHonor != '') {
              this.typeD = false
            }
            if (item.otherHonor != '') {
              this.typeE = false
            }
            if (item.onDuty == true) {
              item.onDuty = item.onDuty.toString()
            } else {
              item.onDuty = 'false'
            }
            for (let i  in item.staffCertList) {
              item.staffCertList[i].issueDate = new Date(item.staffCertList[i].issueDate)
              item.staffCertList[i].token = this.$store.state.user.token
            }
            this.formData = item
          }
        })
      }
    },
    methods: {
      handleView(name) {
        this.imgName = name
        this.visible = true
      },
      handleRemove(file) {
        let index = parseInt(this.indexName.substr(1))
        let data = this.formData.staffCertList[index].staffCertImageList
        for(let i in data){
          if(data[i].url == file.url){
            data.splice(i,1);
            break;
          }
        }
        // data.splice(0,1);
        // this.formData.staffCertList[index].splice(this.formData.staffCertList[index].indexOf(file),1);
        // this.uploadList.splice(this.uploadList.indexOf(file),1);
      },
      qh(name) {
        this.indexName = name
      },
      success(res) {
        let index = parseInt(this.indexName.substr(1))
        let data = {
          'imageId': res.item.id,
          'url': res.item.path
        }
        this.formData.staffCertList[index].staffCertImageList.push(data);
      },
      handleBefore(){
        let index = parseInt(this.indexName.substr(1));
        if(this.formData.staffCertList[index].staffCertImageList.length >= 3){
          this.$Notice.warning({
            title: '错误提示',
            desc: '最多允许上传三张'
          })
          return false;
        }
      },
      changeA(type) {
        this.typeA = !type
      },
      changeB(type) {
        this.typeB = !type
      },
      changeC(type) {
        this.typeC = !type
      },
      changeD(type) {
        this.typeD = !type
      },
      changeE(type) {
        this.typeE = !type
      },
      handleSuccess(res) {
        if (res.code == 0) {
          let data = res.item
          this.formData.staffImageList = [{ imageId: data.id, url: data.path }]
        }
      },
      handleFormatError() {
        this.$Notice.warning({
          title: '错误提示',
          desc: '只允许上传jpg,png图片'
        })
      },
      handleBeforeUpload() {
        this.$Notice.warning({
          title: '错误提示',
          desc: '图片文件最大不超过3M'
        })
      },
      beforeRemove(index) {
        this.formData.staffCertList.splice(index, 1)
        this.indexName = "s0";
        return new Promise(function(resolve, reject) {

        })
      },
      handleTabsAdd() {
        this.formData.staffCertList.push({
          certName: '',
          trade: '职业工种',
          level: '1',
          certCode: '证书编号',
          issueDate: '2018-10-01',
          issuingAuthority: '鉴定机构',
          staffCertImageList: [],
          token: this.$store.state.user.token,
        })
        this.indexName = 's' + (this.formData.staffCertList.length - 1)
      },
      submit() {
        if (this.typeA) {
          this.formData.nationalHonor = ''
        }
        if (this.typeB) {
          this.formData.provincialHonor = ''
        }
        if (this.typeC) {
          this.formData.districtHonor = ''
        }
        if (this.typeD) {
          this.formData.industryLevelHonor = ''
        }
        if (this.typeE) {
          this.formData.otherHonor = ''
        }
        let data = this.formData.staffCertList
        console.log(JSON.stringify(data))
        for (let i in data) {
          let code = parseInt(i) + 1
          if (data[i].certName == '') {
            this.$Message.info('请填写证书' + code + '名称')
            return
          }
          if (data[i].trade == '') {
            this.$Message.info('请填写证书' + code + '职业工种')
            return
          }
          if (data[i].certCode == '') {
            this.$Message.info('请填写证书' + code + '证书编号')
            return
          }
          if (data[i].issueDate == '') {
            this.$Message.info('请填写证书' + code + '发证日期')
            return
          }
          if (data[i].issueDate == '') {
            this.$Message.info('请填写证书' + code + '鉴定机构')
            return
          }
          if (data[i].staffCertImageList.length == 0) {
            this.$Message.info('请上传证书' + code + '证书图片')
            return
          }
        }
        this.$refs.formData.validate((valid) => {
          let url
          if (this.formData.id > 0) {
            url = '/staff/update'
          } else {
            url = '/staff/add'
          }
          let data = deepClone(this.formData)
          data.onDuty = Boolean(data.onDuty)
          if (valid) {
            this.$Modal.confirm({
              title: '系统提示',
              content: '确认保存吗',
              onOk: () => {
                this.$axios.post(url, data).then((res) => {
                  if (res.data.code == '0') {
                    this.$Message.success('保存成功')
                    window.location.href = "/center/staff-query";
                  }
                })
              }
            })
          } else {
            this.$Message.error('必填项不能为空')
          }
        })
        // console.log(JSON.stringify(this.formData));
        // console.log(JSON.stringify(this.formData));
      }
    }
  }
</script>
<style lang="less" scoped>
  .demo-upload-list {
    display: inline-block;
    width: 250px;
    height: 200px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 40px;
    cursor: pointer;
    margin: 80px 2px;
  }
</style>
