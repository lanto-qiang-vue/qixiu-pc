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
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleBeforeUpload"
          :on-success="handleSuccess"
          action="/proxy/file/image/add">
          <div style="height:250px;width:250px;border-radius:50%;position:absolute;left:50%;margin-left:-125px;">
            <img style="height:250px;width:250px;background: red;border-radius:50%;"
                 :src="(formData.staffImageList[0].url || '')"/>
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
          <Input type="text" v-model="formData.professionaltitle"></Input>
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
    <Tabs type="card" :before-remove='beforeRemove' v-model="indexName" style="width:80%;" @on-click="qh">
      <TabPane v-for="(item,tab) in formData.staffCertList" :closable="true" :key="tab" :name="'s'+(tab)"
               :label="'证书' + (tab+1)">
        <Form class="common-form" :model="item" ref="s1" :rules="rules" :label-width="120">
          <FormItem label="名称" prop="name" style="width:80%;">
            <Input type="text" v-model="item.name"></Input>
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
            <upload-img :description="'上传证书'" :data="item.staffCertImageList" :callback="'success'"
                        @success="success"></upload-img>
            <!--<Upload-->
              <!--multiple-->
              <!--:headers="{token:this.$store.state.user.token}"-->
              <!--:show-upload-list="false"-->
              <!--:format="['jpg','jpeg','png']"-->
              <!--accept="image/png,image/jpeg"-->
              <!--:max-size="3072"-->
              <!--:on-format-error="handleFormatError"-->
              <!--:on-exceeded-size="handleBeforeUpload"-->
              <!--:on-success="handleSuccessImg"-->
              <!--action="/proxy/file/image/add">-->
            <!--<Button type="primary">上传图片</Button>-->
            <!--</Upload>-->
          </FormItem>
        </Form>
      </TabPane>
      <Button @click="handleTabsAdd" size="small" slot="extra">增加</Button>
    </Tabs>
    <Form :label-width="120">
      <FormItem>
        <Button @click="submit" type="primary">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import uploadImg from '~/components/uploadImg.vue'
  export default {
    name: 'staff-detail',
    components:{uploadImg},
    data() {
      return {
        typeA: true,
        typeB: true,
        typeC: true,
        typeD: true,
        typeE: true,
        educationList: [
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
          { id: '5', name: '一级/高级技师' },
        ],
        tabs: 2,
        indexName: 's0',
        formData: {
          id:null,
          name: '姓名',
          gender: '1',
          education: 10,
          position:'1',
          onDuty: 'true',
          professionalTitle: '职称1',
          staffImageList: [{ url: '' }],
          nationalHonor: '国家级',
          provincialHonor: '省市级',
          districtHonor: '区级',
          industryLevelHonor: '产业级',
          otherHonor: '其他',
          staffCertList: [{
            name: '',
            trade: '职业工种',
            level:'1',
            certCode:'证书编号',
            issueDate:'2018-10-01',
            issuingAuthority:'鉴定机构',
            staffCertImageList:[],
          }]
        },
        // formData:[
        //   {
        //     name:'',
        //   },
        //   {
        //     name:'1',
        //   },
        //   {
        //     name:'2',
        //   }
        // ],
        rule: {
          name:[{required:true,message:'姓名必填'}],
          gender:[{required:true,message:'性别必填'}],
          education:[{required:true,message:'学历必选'}],
          onDuty:[{required:true,message:'必填项'}],
          position:[{required:true,message:'岗位必选'}]
        },
        rule1: {},
        rules: {
          name: [{ required: true, message: '名称必填' }],
          trade:[{ required: true, message: '工种必填' }],
          certCode:[{ required: true, message: '工种必填' }],
          issueDate:[{ required: true, message: '工种必填' }],
          issuingAuthority:[{ required: true, message: '工种必填' }],
          url:[{ required:true,message:'图片为必填项' }],
        }
      }
    },
    methods: {
      qh(name){
        this.indexName = name;
      },
      success(res){
       let index = parseInt(this.indexName.substr(1));
       this.formData.staffCertList[index].staffCertImageList = res;
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
          this.formData.staffImageList = [{imageId: data.id, url: data.path }]
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
        return new Promise(function(resolve, reject) {

        })
      },
      handleTabsAdd() {
        this.formData.staffCertList.push({ name: '' })
        this.indexName = 's' + (this.formData.staffCertList.length - 1);
      },
      submit() {
        this.$refs.formData.validate((valid) => {
          if(valid){
            this.$axios.post('/staff/add',this.formData).then((res) => {
              if (res.data.code == '0') {
                this.$Message.success('保存成功');
              }
            })
          }else{
            alert(2);
          }
        });
        // console.log(JSON.stringify(this.formData));
        // console.log(JSON.stringify(this.formData));
      }
    }
  }
</script>

<style scoped>

</style>
