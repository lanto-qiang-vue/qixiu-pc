
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="100" class="common-form z-common-form">
              <FormItem label="合格证编号:">
                  <Input type="text" v-model="search.certificateCode" placeholder="请输入合格证编号"></Input>
              </FormItem>
              <FormItem label="管理区域:" v-show="roleType=='guanlibumen'">
                  <Cascader :data="areaList" @on-change="handleChange" :change-on-select=true></Cascader>
              </FormItem>
              <FormItem label="发证日期区间:">
                  <DatePicker type="daterange" placeholder="请选择" @on-change="changeIssueDate"></DatePicker>
              </FormItem>
              <FormItem label="进场日期区间:">
                  <DatePicker type="daterange" placeholder="请选择" @on-change="changeInPlantDate"></DatePicker>
              </FormItem>
              <FormItem label="竣工日期区间:">
                  <DatePicker type="daterange" placeholder="请选择" @on-change="changeRepairDate"></DatePicker>
              </FormItem>
              <FormItem label="企业名称:" v-show="roleType=='guanlibumen'">
                  <Input type="text" v-model="search.corpName" placeholder="请输入企业名称"></Input>
              </FormItem>
              <FormItem label="车牌号码:">
                  <Input type="text" v-model="search.vehiclePlateNumber" placeholder="请输入车牌号码"></Input>
              </FormItem>
              <FormItem label="维修类型:">
                  <Select v-model="search.repairType" :transfer="true" clearable>
                    <Option v-for="item in typeList" :value="item.key" :key="item.key">{{ item.name }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="状态:">
                <Select v-model="search.state" clearable>
                    <Option v-for="item in stateList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="accessBtn('add')" @click="showDetail=Math.random();detailData=null;">新增</Button>
      <Button type="info" v-if="accessBtn('detail')" :disabled="!detailData"  @click="showDetail=Math.random();">查看|编辑</Button>
      <Button type="info" v-if="accessBtn('addApply')" @click="addApply">申领合格证</Button>
      <Button type="info" v-if="accessBtn('queryList')" @click="$router.push({path:'com-certificate-apply'})" >合格证申领记录</Button>
      <div v-show="roleType=='weixiuqiye'" style="line-height: 34px;font-size: 14px;">剩余可用合格证: {{availableNum||0}}</div>
    </div>
    
    <common-certificate-detail :showDetail="showDetail" :detailData="detailData" :roleType="roleType" @closeDetail="closeDetail"></common-certificate-detail>

    <!--申领合格证-->
    <Modal v-model="applyModel" title="申领合格证">
      <Form :label-width="120" ref="applyData" :rules="applyValidate" :model="applyData">
          <FormItem label="起讫号开始编号:" prop="codeStart">
              <Input type="text" v-model="applyData.codeStart" placeholder="请输入编号"></Input>
              
          </FormItem>
          <FormItem label="起讫号结束编号:" prop="codeEnd">
              <Input type="text" v-model="applyData.codeEnd" placeholder="请输入编号"></Input>
              
          </FormItem>
          <FormItem label="申领日期:" prop="applyDate" >
              <DatePicker :value="applyData.applyDate" type="date" :options="options3" placeholder="请选择" @on-change="changeTime" style="width: 100%;"></DatePicker>
          </FormItem>
      </Form>
        <div slot="footer">
          <Button size="large" type="primary" @click="addApplyFun('applyData')">提交</Button>
        </div>
    </Modal>


  </common-table>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import commonCertificateDetail from './common-certificate-detail.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
  import { getIdByName } from '~/static/util.js'
	export default {
		name: "certificate-manage",
    components: {
      CommonTable,
      commonCertificateDetail
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
        columns: [
          {title: '序号',  width: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '状态', key: 'state',  minWidth: 120,
            render: (h, params) => h('span', params.row.state.name)
          },
          {title: '合格证编号', key: 'certificateCode',  minWidth: 120},
          {title: '检测报告编号', key: 'examinationReportCode',  minWidth: 135},
          {title: '车牌号', key: 'vehiclePlateNumber',  minWidth: 120},
          {title: '维修品牌', key: 'carType',  minWidth: 120},
          {title: '进场日期', key: 'inPlantDate',  minWidth: 120},
          {title: '竣工日期', key: 'repairEndDate',  minWidth: 120},
          {title: '发证日期', key: 'issueDate',  minWidth: 120},
          {title: '维修类型', key: 'repairType',  minWidth: 120,render: (h, params) => h('span', getIdByName(this.typeList,params.row.repairType))},
        ],
        tableData: [],
        options3: {
            disabledDate (date) {
                return date && date.valueOf() > Date.now();
            }
        },
        search:{
            "dept": "",
            "org": "",
            "carType": "",
            "certificateCode": "",
            "corpName": "",
            "inPlantDateEnd": "",
            "inPlantDateStart": "",
            "issueDateEnd": "",
            "issueDateStart": "",
            "repairEndDateEnd": "",
            "repairEndDateStart": "",
            "repairType": "",
            "state": "",
            "vehiclePlateNumber": "",
            "pageNo": 0,
            "pageSize": 0,
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        applyModel: false,
        applyData:{
            "applyDate": "",
            "codeEnd": "",
            "codeStart": ""
        },
        applyValidate:{
              applyDate:[
                  { required: true, message: '请填写数据', },
              ],
              codeEnd: [
                  { required: true,  message: '请填写数据',}
              ],
              codeStart: [
                  { required: true,  message: '请填写数据',}
              ],
        },
        commonUrl:'',//公共参数属性
        roleType:'',
        typeList:[],
        stateList:[{code:1,name:'待审核'},{code:2,name:'审核成功'},{code:3,name:'审核不成功'}],
        availableNum:0,//可用合格证编号
        areaList:[]
      }
    },
    mounted () {
      console.log(this.$route.path);
      switch (this.$route.path){
          case '/center/operate-certificate':{
            this.commonUrl='/company/repair/quality/list/yy';
            this.roleType='yunying';
            break
          }
          case '/center/com-certificate':{
            this.commonUrl='/company/repair/quality/list/corp';
            this.roleType='weixiuqiye';
            this.getApplyFun();
            break
          }
          case '/center/manage-certificate':{
            this.commonUrl='/company/repair/quality/list/manage';
            this.roleType='guanlibumen';
            this.getArea();
            this.columns=[
              {title: '序号',  width: 80,
                render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
              },
              {title: '管理区域', key: 'areaName',  minWidth: 120,},
              {title: '状态', key: 'state',  minWidth: 120,
                render: (h, params) => h('span', params.row.state.name)
              },
              {title: '企业名称', key: 'corpName',  minWidth: 120},
              {title: '许可证号', key: 'license',  minWidth: 120},
              {title: '合格证编号', key: 'certificateCode',  minWidth: 120},
              {title: '进场日期', key: 'inPlantDate',  minWidth: 120},
              {title: '竣工日期', key: 'repairEndDate',  minWidth: 120},
              {title: '发证日期', key: 'issueDate',  minWidth: 120},
              {title: '维修类型', key: 'repairType',  minWidth: 120,render: (h, params) => h('span', getIdByName(this.typeList,params.row.repairType))},
            ];
            break
          }
        }
        this.getList();
        this.getRepairType();
        
    },
    methods:{
        getList(){
          this.loading=true;
          this.search['pageNo']=this.page;
          this.search['pageSize']=this.limit;
          this.$axios.post(this.commonUrl, this.search).then( (res) => {
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
              this.loading=false;
            }
          })
          this.detailData= null;
        },
        getRepairType(){
          this.$axios.get('/company/repair/quality/type', {
          }).then( (res) => {
            if(res.data.code=='0'){
                this.typeList=res.data.items
            }
          })

        },
        //获取区域信息
        getArea() {
          this.$axios.get('/area/dept/list/all/'+process.env.config.areaName, ).then((res) => {
            if (res.data.code == '0'){
              this.areaList = res.data.items;
            }
          })
        },
        changePage(page){
          this.page= page
          this.getList()
        },
        changePageSize(size){
          this.limit= size
          this.getList()
        },
        onRowClick( row, index){
            console.log('row：',row);
            this.detailData=row
        },
        closeDetail(){
          this.detailData= null;
          this.clearTableSelect= Math.random();
          
          this.getList();
        },
        //选择日期--
        changeTime(val){
          console.log(val);
          this.applyData.applyDate=val;
        },
        changeIssueDate(val){
          this.search.issueDateStart=val[0];
          this.search.issueDateEnd=val[1];
        },
        changeInPlantDate(val){
          this.search.inPlantDateStart=val[0];
          this.search.inPlantDateEnd=val[1];
        },
        changeRepairDate(val){
          this.search.repairEndDateStart=val[0];
          this.search.repairEndDateEnd=val[1];
        },
        //新增起讫号
        addApply(){
          this.$refs['applyData'].resetFields();
          this.applyModel=true;
        },
        addApplyFun(name){
             
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/certificate/apply/add', {
                        "applyDate": this.applyData.applyDate,
                        "codeEnd": this.applyData.codeEnd,
                        "codeStart": this.applyData.codeStart,
                    }).then( (res) => {
                      if(res.data.code=='0'){
                        this.$Message.info('提交成功');
                        this.applyModel=false;
                        this.getApplyFun();
                      }
                    })
                }
           });
        },
        //查询可用合格证编号数量
        getApplyFun(){
             this.$axios.get('/certificate/apply/count/available', {
            }).then( (res) => {
              if(res.data.code=='0'){
                this.availableNum=res.data.item;
              }
            })
        },
        handleChange(val){
          switch(val.length){
            case 0:{
              this.search.org='';
              this.search.dept='';
              break;
            }
            case 1:{
              this.search.org=val[0];
              this.search.dept='';
              break;
            }
            case 2:{
              this.search.org=val[0];
              this.search.dept=val[1];
              break;
            }
          }
        }

    },
	}
</script>

<style scoped lang="less">
.z-common-form .ivu-form-item {
    width: 280px;
}
</style>
