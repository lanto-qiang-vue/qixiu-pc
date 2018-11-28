<!--企业合格证信息  2018-10-30 -->
<template>
<Modal
    v-model="showModal"
    title="企业合格证信息"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <common-table v-model="tableData" :columns="columns" :total="total" 
                @changePage="changePage" @changePageSize="changePageSize" 
                 :show="showTable" :page="page" >
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
        <FormItem label="所属年份:">
            <Select v-model="searchYear" clearable>
                <Option v-for="item in yearList" :value="item.code" :key="item.code">{{ item.code }}</Option>
            </Select>
        </FormItem>
        <FormItem :label-width="0" style="width: 90px;">
            <Button type="primary" v-if="accessBtn('query')" @click="page=1,getDetail()">搜索</Button>
        </FormItem>

        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="accessBtn('add')" @click="showAdd=true;" >新增</Button>
    </div>

</common-table>

    <!--新增界面-->
    <Modal
    v-model="showAdd"
    title="新增"
    width="400"
    @on-visible-change="visibleChange1"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    :transition-names="['', '']">
        <Form  :label-width="120" class="common-form" ref="searchList" :rules="ruleValidate"  :model="searchList">
            <FormItem label="资料类型:" style="width: 80%;" prop="certificateType">
                <Select v-model="searchList.certificateType" clearable>
                    <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.code }}</Option>
                </Select>
            </FormItem>
            <FormItem label="所属年份:" style="width: 80%;" prop="year">
                <Select v-model="searchList.year" clearable>
                    <Option v-for="item in yearList" :value="item.code" :key="item.code">{{ item.code }}</Option>
                </Select>
            </FormItem>
            <FormItem label="黑名单限制数:" style="width: 80%;" prop="blackListLimitNumber">
                
                <InputNumber v-model="searchList.blackListLimitNumber" :min="0" ></InputNumber>
            </FormItem>
            <FormItem label="检测报告副证数:" style="width: 80%;" prop="reportCount">
                
                <InputNumber v-model="searchList.reportCount" :min="0" ></InputNumber>
            </FormItem>
            <FormItem label="核准数:" style="width: 80%;" prop="approvalCount">
                
                <InputNumber v-model="searchList.approvalCount" :min="0" ></InputNumber>
            </FormItem>
        </Form>
    
    <div slot="footer">
        <Button  size="large" type="primary" @click="addQualify('searchList')">确定</Button>
    </div>
  </Modal>
    <div slot="footer">
        <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "company-qualify-detail",
    props:['showDetail', 'detailData'],
    components: {
      CommonTable,

    },
    mixins: [funMixin],
data(){
    return{
        showAdd:false,//新增界面
        showModal:false,
        listSearch:{
            description:"",
            fileurl:"",
            id:"",
            status:"",
            title:"",
        },
        columns: [
          
          {title: '年份', key: 'year', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '核准数', key: 'approvalCount', sortable: true, minWidth: 120},

          {title: '检测报告副证数', key: 'reportCount', sortable: true, minWidth: 120},
          {title: '黑名单限制数', key: 'blackListLimitNumber', sortable: true, minWidth: 120},
        ],
        tableData: [],
        searchList:{
            "approvalCount": 0,
            "blackListLimitNumber": 0,
            "certificateType": "",
            "reportCount": 0,
            "year": ""
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        clearTableSelect: null,
        yearList:[
            {code:'2013'},
            {code:'2014'},
            {code:'2015'},
            {code:'2016'},
            {code:'2017'},
            {code:'2018'},
            {code:'2019'},
            {code:'2020'},
            {code:'2021'},
            {code:'2022'},
            {code:'2023'},
        ],
        searchYear:'',
        typeList:[
            {code:"合格证"}
        ],
        ruleValidate: {
          approvalCount:[
            { required: true, message: '必填数据', },
          ],
          blackListLimitNumber: [
              { required: true,  message: '必填数据',}
          ],
          certificateType:[
            { required: true, message: '必填数据', },
          ],
          reportCount: [
              { required: true,  message: '必填数据',}
          ],
          year:[
            { required: true, message: '必填数据', },
          ],
         
        },//规则验证

    }
},
    watch:{
        showDetail(){
            this.showModal=true;
            this.getDetail();
        },
    },
    methods:{
        getDetail(){
            this.$axios.post('/company/certificateIssuance',{
                        "companyId": this.detailData.companyId,
                        "pageNo": this.page,
                        "pageSize": this.limit,
                        "year": this.searchYear,
                }).then( (res) => {
                    if(res.data.code=='0'){
                        this.tableData=res.data.items;
                        this.total=res.data.total;
                    }
            })
        },

        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            
          }
        },
        changePage(page){
          this.page= page
          this.getDetail()
        },
        changePageSize(size){
          this.limit= size
          this.getDetail()
        },
        //新增数据----
        addQualify(name){
            this.$refs[name].validate((valid) => {
              if (valid) {
                    this.$axios.post('/company/certificateIssuance/add',{
                            "approvalCount": this.searchList.approvalCount,
                            "blackListLimitNumber": this.searchList.blackListLimitNumber,
                            "certificateType": this.searchList.certificateType,
                            "companyId": this.detailData.companyId,
                            "id": null,
                            "reportCount": this.searchList.reportCount,
                            "year": this.searchList.year,
                    }).then( (res) => {
                        if(res.data.code=='0'){
                            this.getDetail();
                            this.showAdd=false;
                        }
                    })
              }
          });
        },
        visibleChange1(status){
          if(status === false){
            this.$refs['searchList'].resetFields();
            
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
