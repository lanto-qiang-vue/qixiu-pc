<!--企业中心-企业合格证使用登记详情  2018-10-31 -->
<template>
<Modal
    v-model="showModal"
    title="企业合格证新增"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

        <Form ref="listSearch" :rules="ruleValidate"  :model="listSearch"  :label-width="120" class="common-form">
            <FormItem label="送修单位:" style="width: 80%;" prop="carSource">
                <Input type="text"  v-model="listSearch.carSource" placeholder="请输入"> </Input>
            </FormItem>
            <FormItem label="维修类别:" style="width: 80%;" prop="repairType">
                <Select v-model="listSearch.repairType" clearable>
                    <Option v-for="item in areaOption" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="车牌号:" style="width: 80%;" prop="vehiclePlateNumber">
                <Input type="text"  v-model="listSearch.vehiclePlateNumber" placeholder="请输入"> </Input>
            </FormItem>
            <FormItem label="车型:" style="width: 80%;" prop="carType">
                <Input type="text"  v-model="listSearch.carType" placeholder="请输入"> </Input>
            </FormItem>
            <FormItem label="合格证编号:" style="width: 80%;" prop="certificateCode">
                <Input type="text"  v-model="listSearch.certificateCode" placeholder="请输入"> </Input>
            </FormItem>
            <FormItem label="检测报告编号:" style="width: 80%;" prop="examinationReportCode">
                <Input type="text"  v-model="listSearch.examinationReportCode" placeholder="请输入"> </Input>
            </FormItem>
            <FormItem label="进厂日:" style="width: 80%;" prop="inPlantDate">
                
                <DatePicker v-model="listSearch.inPlantDate" type="date" placeholder="请输入" ></DatePicker>
            </FormItem>
            <FormItem label="竣工日:" style="width: 80%;" prop="repairEndDate">
                
                <DatePicker v-model="listSearch.repairEndDate" type="date" placeholder="请输入" ></DatePicker>
            </FormItem>
            <FormItem label="出厂日:" style="width: 80%;" prop="exFactoryDate">
                
                <DatePicker v-model="listSearch.exFactoryDate" type="date" placeholder="请输入" ></DatePicker>
            </FormItem>
            <FormItem label="发证日:" style="width: 80%;" prop="issueDate">
                
                <DatePicker v-model="listSearch.issueDate" type="date" placeholder="请输入" ></DatePicker>
            </FormItem>
        </Form>
    

        <div slot="footer">
        <Button v-if="" @click="saveData('listSearch')" size="large" type="primary"  >保存</Button>

        <Button  size="large" type="default"  @click="showModal=false;">返回</Button>
      </div>
  </Modal>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import { formatDate } from '@/static/tools.js'
export default {
	name: "add-company-qualify",
    props:['showDetail', 'detailData'],
    components: {
      CommonTable,

    },
    data(){
		return{

            showModal:false,
            listSearch:{
                carSource:"",
                carType:"",
                certificateCode:"",
                companyId:'',
                exFactoryDate:'',
                examinationReportCode:"",
                id:'',
                inPlantDate:'',
                issueDate:'',
                repairEndDate:'',
                repairType:"",
                vehiclePlateNumber:"",
            },
            areaOption:[
                {code:'1',name:'小型车'},
                {code:'2',name:'大、中型客车'},
                {code:'3',name:'大、中型货车'},
            ],//区域数据集合----
            ruleValidate: {
                carSource:[
                    { required: true, message: '请填写数据', },
                    // { validator: this.validatePass, trigger: 'change' },
                ],
                carType: [
                    { required: true,  message: '请填写数据',}
                ],
                certificateCode:[
                    { required: true, message: '请填写数据', },
                    // { validator: this.validatePass, trigger: 'change' },
                ],
                exFactoryDate: [
                    { required: true,  message: '请填写数据',}
                ],
                examinationReportCode:[
                    { required: true, message: '请填写数据', },
                    // { validator: this.validatePass, trigger: 'change' },
                ],
                inPlantDate: [
                    { required: true,  message: '请填写数据',}
                ],
                issueDate:[
                    { required: true, message: '请填写数据', },
                    // { validator: this.validatePass, trigger: 'change' },
                ],
                repairEndDate: [
                    { required: true,  message: '请填写数据',}
                ],
                repairType:[
                    { required: true, message: '请填写数据', },
                    // { validator: this.validatePass, trigger: 'change' },
                ],
                vehiclePlateNumber: [
                    {required: true, message: '请填写数据', trigger: 'blur' },
					 { type:'string',pattern:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1,2}$/, message:'请输入正确的车牌号码', trigger:'change'}
					 
                ],
            },//规则验证
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            
        },
    },
    methods:{
        saveData(name){
            this.$refs[name].validate((valid) => {
              if (valid) {
                 this.$axios.post('/company/repairquality/add',{
                        "carSource": this.listSearch.carSource,
                        "carType": this.listSearch.carType,
                        "certificateCode": this.listSearch.certificateCode,

                        "exFactoryDate": formatDate(this.listSearch.exFactoryDate)||'',
                        "examinationReportCode": this.listSearch.examinationReportCode,

                        "inPlantDate": formatDate(this.listSearch.inPlantDate)||'',
                        "issueDate": formatDate(this.listSearch.issueDate)||'',
                        "repairEndDate": formatDate(this.listSearch.repairEndDate)||'',
                        "repairType": this.listSearch.repairType,
                        "vehiclePlateNumber": this.listSearch.vehiclePlateNumber,
                    }).then( (res) => {
                        if(res.data.code=='0'){
                            this.$Message.info('保存成功');
                            this.showModal=false;

                        }else{
                            this.$Message.error(res.data.status);
                        }
                })
              }
          });
            
        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            this.$refs['listSearch'].resetFields();
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
  .r-list-search{
    width: 100%;
    padding: 10px 0;
    

  }
</style>
