<!--企业合格证使用信息管理 2018-10-30  -->

<template>


<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
        <FormItem label="企业名称:">
            <Input type="text" v-model="searchList.companyName" placeholder="请输入企业名称"></Input>
        </FormItem>
        <FormItem label="许可证号:">
            <Input type="text" v-model="searchList.companyroadtransportationlicense" placeholder="请输入许可证号"></Input>
        </FormItem>
        
        <FormItem :label-width="0" style="width: 90px;">
            <Button type="primary" v-if="" @click="searchFun">搜索</Button>
        </FormItem>

        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="" @click="showDetail=Math.random();" >查看</Button>
    </div>
    <!--<company-qualify-detail :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail"></company-qualify-detail>-->
</common-table>


</template>

<script>
import CommonTable from '~/components/common-table.vue'
// import companyQualifyDetail from './company-qualify-detail.vue'
export default {
	name: "company-qualify-manage",
    components: {
      CommonTable,
    //   companyQualifyDetail
    },
    data(){
		  return{
              loading:false,
              
        columns: [
          
          {title: '单位名称', key: 'companyname', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '许可证号', key: 'companyroadtransportationlicense', sortable: true, minWidth: 120},

          {title: '经营范围', key: 'companybusinessscope', sortable: true, minWidth: 120},
          {title: '当年累计发放量', key: 'thisYearNum', sortable: true, minWidth: 120},
          {title: '去年累计发放量', key: 'lastYearNum', sortable: true, minWidth: 135},
          {title: '去年累计销证量', key: 'lastYearSalesVolume', sortable: true, minWidth: 120},
          
          
        ],
        tableData: [],
        searchList:{
            "area": "",
            "businessaddress": "",
            "companyName": "",
            "companyroadtransportationlicense": "",
            "companysuperintendentphone": "",
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        showOtherDetail:false,
        detailData: null,
        clearTableSelect: null,
        areaOption:[],//区域数据集合----
      }
    },
    mounted () {
        // this.getAreaInfo();
      this.getList();
      
    },
    // beforeMount(){
    //   this.$axios.post('/menu/list', {
    //     "pageNo": 1,
    //     "pageSize": 10,
    //   })
    // },
    methods:{
        //获取区域数据-------
        getAreaInfo(){
            this.$axios.post('/area/region/list', {
                   "areaName": "shanghai" 
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.areaOption=res.data.items;
                }else{
                    this.$Message.error(res.data.status);
                }
           })
           
        },
        getList(){
            // this.loading=true;
            this.$axios.post('/company/repaircompany/query/company/detail', {
                    "area": "",
  "businessaddress": "",
  "companyName": "",
  "companyaddress": "",
  "companylinkmantel": "",
  "companyroadtransportationlicense": "",
  "companysuperintendentphone": "",
  "corporate": "",
  "inDays": 0,

                    "pageNo": this.page,
                    "pageSize": this.limit,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.tableData=res.data.item.data;
                    this.total=res.data.item.total;
                    // this.loading=false;
                }
           })
           this.detailData= null;
        },
        getType(){
            this.$axios.get('/dict/getValuesByTypeId/1', {
            }).then( (res) => {
                if(res.data.code=='0'){
                    
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
          this.detailData= null
          
          this.clearTableSelect= Math.random();
          this.getList();
        },
        //搜索按钮----
        searchFun(){
            this.page= 1;
            this.closeDetail();
        },
        //解绑按钮-------
        removeBindFun(){
            this.$Modal.confirm({
                title:"系统提示!",
                content:"确定要解绑吗？",
                onOk:this.removeBind,
            })
        },
        removeBind(){
            this.$axios.post('/vehicle/carfile/remove-bind/'+this.detailData.id,{

            } ).then( (res) => {
                if(res.data.code=='0'){
                    this.closeDetail();
                }
            })
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
</style>
