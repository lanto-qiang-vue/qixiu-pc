<!--根据维修记录查找  -->

<template>


<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
         
        <FormItem label="车牌号:">
            <Input type="text" v-model="searchList.vehicleplatenumber" placeholder="请输入车牌号"></Input>
        </FormItem>
        <FormItem label="VIN:">
            <Input type="text" v-model="searchList.vin" placeholder="请输入车架号"></Input>
        </FormItem>
        <FormItem label="维修企业:">
            <Input type="text" v-model="searchList.companyName" placeholder="请输入维修企业"></Input>
        </FormItem>
         
        <FormItem label="车牌正确:">
            <Select v-model="searchList.byVehicleNumberStandard" >
                <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="VIN正确:">
            <Select v-model="searchList.byVinStandard" >
                <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
        </FormItem>
        
            <FormItem :label-width="0" style="width: 90px;">
                <Button type="primary" v-if="" @click="searchFun">搜索</Button>
                
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="" @click="showDetail=Math.random();" :disabled="!detailData">查看</Button>
    </div>
    <record-repair-detail :showDetail="showDetail" :detailData="detailData"></record-repair-detail>
</common-table>


</template>

<script>
import CommonTable from '~/components/common-table.vue'
import recordRepairDetail from './record-repair-detail.vue'
export default {
	name: "record-repair",
    components: {
      CommonTable,
      recordRepairDetail
    },
    data(){
		  return{
              loading:false,
              typeList: [
                  {code:'yes',name:'有登录'},
                  {code:'no',name:'未登录'},
              ],//问题分类--------
        columns: [
          {title: '序号',  minWidth: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '车牌号码', key: 'plateNumber', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '车牌正确', key: 'checkVn', sortable: true, minWidth: 120},
          {title: '车辆识别号VIN', key: 'vin', sortable: true, minWidth: 135},
          {title: 'VIN正确', key: 'checkVin', sortable: true, minWidth: 120},
          {title: '结算日期', key: 'repairDate', sortable: true, minWidth: 120},
          {title: '结算编号', key: 'costlistcode', sortable: true, minWidth: 135},
          {title: '维修企业', key: 'companyName', sortable: true, minWidth: 120},
          
        ],
        tableData: [],
        searchSelectOption:[],
        searchSelectOption1:[],//重新赋值--
        search:{
          input: '',
          select: '',
        },
        searchList:{
            byVehicleNumberStandard:"all",
            byVinStandard:"all",
            companyName:"",
            vehicleplatenumber:"",
            vin:'',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        showOtherDetail:false,
        detailData: null,
        clearTableSelect: null,
        typeList:[
            {code:'all',name:'全部'},
            {code:'yes',name:'正确'},
            {code:'no',name:'错误'},
            
        ]
      }
    },
    mounted () {
      
      this.getRouterData();
    //   this.getType();
    },
    // beforeMount(){
    //   this.$axios.post('/menu/list', {
    //     "pageNo": 1,
    //     "pageSize": 10,
    //   })
    // },
    
    methods:{
        getList(){
            this.loading=true;
            this.$axios.post('/vehicle/carfile/query4manager', {
                    "byVehicleNumberStandard":this.searchList.byVehicleNumberStandard,
                    "byVinStandard":this.searchList.byVinStandard,
                    
                    "companyName":this.searchList.companyName,
                    
                    "pageNo": this.page,
                    "pageSize": this.limit,
                    
                    "vehicleplatenumber":this.searchList.vehicleplatenumber,
                    "vin":this.searchList.vin,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;
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
        //监听传过来的数据值-----------，
      getRouterData(){
        var queryData=this.$route.query;
        if(queryData&&queryData.flag){
            
            this.searchList.companyName=queryData.name;
            console.log(this.searchList.companyName);
            this.getList();
            console.log("有值",queryData);
        }else{
            console.log("没有值");
            this.getList();
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
</style>
