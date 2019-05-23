
<template>
<Modal
    v-model="showModal"
    title="合格证详情"
    width="90"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <div style="height: 100%;overflow: auto;">
        <Form :label-width="120" class="common-form" ref="listSearch" :rules="listValidate" :model="listSearch">
            <FormItem label="审核状态:" style="width: 90%;" v-show="stateFlag">
                <span style="color: red;">{{listSearch.state.name}}</span>
            </FormItem>
            <FormItem label="审核不通过说明:" style="width: 90%;" v-show="listSearch.state.id==3">
                <span style="color: red;">{{listSearch.backup}}</span>
            </FormItem>
            <FormItem label="企业名称:" style="width: 45%;" >
                <Input type="text" :disabled=true v-model="listSearch.corpName" placeholder="" v-show="isCompany"></Input>
                <div class="field" v-html="showChangeCar('corpName')"></div>
            </FormItem>
            <FormItem label="许可证号:" style="width: 45%;" >
                <Input type="text" :disabled=true v-model="listSearch.license" placeholder="" v-show="isCompany"></Input>
                <div class="field" v-html="showChangeCar('license')"></div>
            </FormItem>
            <FormItem label="合格证编号:" style="width: 45%;" prop="certificateCode">
                <Input type="text"  v-model="listSearch.certificateCode" placeholder="" v-show="isCompany"></Input>
                <div class="field" v-html="showChangeCar('certificateCode')"></div>
            </FormItem>
            <FormItem label="检测报告编号:" style="width: 45%;" prop="examinationReportCode">
                <Input type="text"  v-model="listSearch.examinationReportCode" placeholder="" v-show="isCompany"></Input>
                <div class="field" v-html="showChangeCar('examinationReportCode')"></div>
            </FormItem>
            <FormItem label="车牌号:" style="width: 45%;" prop="vehiclePlateNumber">
                <Input type="text"  v-model="listSearch.vehiclePlateNumber" placeholder="" v-show="isCompany"></Input>
                <div class="field" v-html="showChangeCar('vehiclePlateNumber')"></div>
            </FormItem>
            <FormItem label="维修品牌:" style="width: 45%;" prop="carType">
                <Input type="text"  v-model="listSearch.carType" placeholder="" v-show="isCompany"></Input>
                <div class="field" v-html="showChangeCar('carType')"></div>
            </FormItem>
            <FormItem label="维修类别:" style="width: 45%;" prop="repairType">
                <Select v-model="listSearch.repairType" :transfer="true" clearable v-show="isCompany">
                    <Option v-for="item in typeList" :value="item.key" :key="item.key">{{ item.name }}</Option>
                  </Select>
                <div class="field" v-html="showChangeCar('repairType')"></div>
            </FormItem>
            <FormItem label="进厂日期:" style="width: 45%;" prop="inPlantDate">
                <DatePicker :options="options3" type="date" :value="listSearch.inPlantDate" placeholder="请选择" @on-change="changeInPlantDate" v-show="isCompany" style="width: 100%;"></DatePicker>
                <div class="field" v-html="showChangeCar('inPlantDate')"></div>
            </FormItem>
            <FormItem label="竣工日期:" style="width: 45%;" prop="repairEndDate">
                
                <DatePicker :options="options3" type="date" :value="listSearch.repairEndDate" placeholder="请选择" @on-change="changeEndDate" v-show="isCompany" style="width: 100%;"></DatePicker>
                <div class="field"  v-html="showChangeCar('repairEndDate')"></div>
            </FormItem>
            <FormItem label="发证日期:" style="width: 45%;" >
                <DatePicker type="date" :value="listSearch.issueDate" :disabled=true placeholder="请选择" @on-change="changeIssueDate" v-show="isCompany" style="width: 100%;"></DatePicker>
                <div class="field" v-html="showChangeCar('issueDate')"></div>
            </FormItem>

        </Form>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div slot="footer">
        <Button size="large" type="primary"  @click="commitFun('listSearch')" v-if="accessBtn('add')" :disabled="listSearch.state.id==1">提交</Button>
        <Button size="large" type="primary"  @click="auditModal=true" v-if="accessBtn('audit')" :disabled="listSearch.state.id!=1">审核</Button>
        <Button  size="large" type="default" @click="showModal=false;">返回</Button>
    </div>
    <!--页面审核-->
    <Modal v-model="auditModal" title="审核">
        <Form :label-width="120" ref="auditInfo" :rules="auditValidate" :model="auditInfo">
            <FormItem label="审核结果:" prop="state">
                <RadioGroup v-model="auditInfo.state">
                    <Radio label="2">通过</Radio>
                    <Radio label="3">不通过</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="不通过说明:" v-show="auditInfo.state==3" prop="backup">
                <Input type="textarea" :rows="1" v-model="auditInfo.backup" :autosize="{minRows: 5}"
                    placeholder="请输入不通过说明"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button size="large" type="primary" @click="updateStatus('auditInfo')">提交</Button>
        </div>
    </Modal>

  </Modal>
</template>

<script>
import { formatDate } from '@/static/tools.js'
import { deepClone,getIdByName } from '~/static/util.js'
import funMixin from '~/components/fun-auth-mixim.js'
let initList={
    "areaName": "",
    "backup": "",
    "carSource": "",
    "carType": "",
    "certificateCode": "",
    "changeInfo": {},
    "companyId": 0,
    "corpName": "",
    "exFactoryDate": "",
    "examinationReportCode": "",
    "fields": [],
    "id": 0,
    "inPlantDate": "",
    "issueDate": "",
    "license": "",
    "repairEndDate": "",
    "repairType": "",
    "state": {id:0,name:'待审核'},
    "vehiclePlateNumber": ""
}
export default {
	name: "common-certificate-detail",
    props:['showDetail', 'detailData','roleType'],
    mixins: [funMixin],
    data(){
		return{
            auditModal: false,
            auditInfo:{
                "backup": "",
                "state": ""
            },
            spinShow:false,
            showModal:false,
            collapse: '1',
            listSearch:deepClone(initList),
            listButton:{
                edit:true,
                out:true,
            },
            commonUrl:'',
            listValidate:{
                corpName:[
                    { required: true, message: '请填写数据', },
                ],
                license: [
                    { required: true,  message: '请填写数据',}
                ],
                certificateCode:[
                    { required: true, message: '请填写数据', },
                ],
                examinationReportCode: [
                    { required: true,  message: '请填写数据',}
                ],
                vehiclePlateNumber:[
                    { required: true, message: '请填写数据', },
                ],
                carType: [
                    { required: true,  message: '请填写数据',}
                ],
                repairType:[
                    { required: true, message: '请填写数据', },
                ],
                inPlantDate: [
                    { required: true,  message: '请填写数据',}
                ],
                repairEndDate: [
                    { required: true,  message: '请填写数据',}
                ],
                issueDate: [
                    { required: true,  message: '请填写数据',}
                ],
            },
            auditValidate:{
                state:[
                    { required: true, message: '请填写数据', },
                ],
                backup: [
                    { required: true,  message: '请填写数据',}
                ],
            },//规则验证
            typeList:[],
            stateFlag:false,
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            this.listSearch=deepClone(initList);
            this.$refs['listSearch'].resetFields();
            this.stateFlag=false;
            if(this.detailData){
                this.getDetail();
                this.stateFlag=true;
            }
            
            
            this.getRepairType();
            if(this.roleType=="weixiuqiye"&&!this.detailData){
                this.getCompanyInfo();
            }
        },
    },
    computed:{
      showChangeCar(){
        return (field)=>{
          return this.compareHtml(this.listSearch.changeInfo, this.listSearch, field)
        }
      },
      isYunying(){
        return this.roleType=='yunying'
      },
      isCompany(){
          return this.roleType=="weixiuqiye"
      },
      isGuanlibumen(){
          return this.roleType=="guanlibumen"
      }
    },
    methods:{
        getDetail(){
            this.spinShow=true;
            this.$axios.post('/company/repair/quality/detail',{
                id:this.detailData.id
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.spinShow=false;
                    this.listSearch=res.data.item
                }
            })
        },
        getCompanyInfo(){
            this.spinShow=true;
            this.$axios.post('/company/detailInfo',{
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.spinShow=false;
                    this.listSearch.corpName=res.data.item.corpName;
                    this.listSearch.license=res.data.item.license;
                }
            })
        },
        //审核通过--
        updateStatus(name){
            if(this.auditInfo.state==2){
                this.$axios.post('/company/repair/quality/audit',{
                         "backup": this.auditInfo.backup,
                        "repairQualityId": this.detailData.id,
                        "state":this.auditInfo.state,
                    }).then( (res) => {
                        if(res.data.code=='0'){
                            this.$Message.info('提交成功');
                            this.showModal=false;
                            this.auditModal=false;
                            this.$emit('closeDetail');
                        }
                    })
            }else{
                this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/company/repair/quality/audit',{
                            "backup": this.auditInfo.backup,
                            "repairQualityId": this.detailData.id,
                            "state":this.auditInfo.state,
                        }).then( (res) => {
                            if(res.data.code=='0'){
                                this.$Message.info('提交成功');
                                this.showModal=false;
                                this.auditModal=false;
                                this.$emit('closeDetail');
                            }
                        })
                }
                });
            }
             
            
        },
        //提交保存数据-------
        commitFun(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let temUrl='/company/repair/quality/add';
                    if(this.detailData){
                        temUrl="/company/repair/quality/update";
                    }
                    this.$axios.post(temUrl,this.listSearch).then( (res) => {
                        if(res.data.code=='0'){
                            this.$Message.info('提交成功');
                            this.showModal=false;
                            this.$emit('closeDetail');
                        }
                    })
                }
            });
        },
        compareHtml(original, later, field){
            let html=''
            if(this.isCompany){
                if(this.listSearch.fields){
                    if(field=='repairType'&&this.listSearch.fields.indexOf(field)!=-1){
                        html= ('<p><label style="color:red;">修改前：</label><span style="color:red;">'+ (original&& original[field]? original[field]: "")+'</span></p>')
                    }else{
                        if(this.listSearch.fields.indexOf(field)!=-1){
                            html= ('<p><label style="color:red;">修改前：</label><span style="color:red;">'+ (original&& original[field]? original[field]: "")+'</span></p>')
                        }
                    }
                    
                }
            }else{
                html=later[field];
                if(field=='repairType'){
                    html=getIdByName(this.typeList,later[field])
                }
                if(this.listSearch.fields){
                    if(field=='repairType'&&this.listSearch.fields.indexOf(field)!=-1){
                        html= ('<p><label>修改前：</label><span>'+ (original&& original[field]? original[field]: "")+'</span></p><p><label>修改后：</label><span>'+
                            (later&& later[field]? getIdByName(this.typeList,later[field]): "")+'</span></p>')
                    }else{
                        if(this.listSearch.fields.indexOf(field)!=-1){
                            html= ('<p><label>修改前：</label><span>'+ (original&& original[field]? original[field]: "")+'</span></p><p><label>修改后：</label><span>'+
                            (later&& later[field]? later[field]: "")+'</span></p>')
                        }
                    }
                    
                }
            }
            return html
        },
        //获取日期时间-------
        changeIssueDate(val){
          this.listSearch.issueDate=val;
        },
        changeEndDate(val){
            this.listSearch.repairEndDate=val;
        },
        changeInPlantDate(val){
            this.listSearch.inPlantDate=val;
        },
        getRepairType(){
          this.$axios.get('/company/repair/quality/type', {
          }).then( (res) => {
            if(res.data.code=='0'){
                this.typeList=res.data.items
            }
          })
        },
        
    },
}
</script>

<style scoped lang="less">
.field{
    p{
      label{
        font-weight: 600;
      }
      i{
        color: red;
        font-style: normal;
      }
    }
  }

</style>
