<!--车主中心 爱车档案 查看页面 2018-11-19-->
<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
            <FormItem label="维修企业:">
                <Input type="text" v-model="searchList.companyName" placeholder="请输入维修企业"></Input>
            </FormItem>
            <FormItem :label-width="0" style="width: 100px;">
                <Button type="primary" v-if="" @click="page=1,closeDetail()">搜索</Button>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="" @click="showDetail=Math.random();" :disabled="!detailData">查看详情</Button>
      <Button type="info" v-if="" @click="lastFun">后退</Button>
    </div>
    <record-repair-detail :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail"></record-repair-detail>
</common-table>
</div>
</template>

<script>
import CommonTable from '~/components/common-table.vue'
import recordRepairDetail from '~/components/record-repair-detail.vue'
export default {
	name: "repair-info-detail",
    components: {
        CommonTable,
        recordRepairDetail
    },
    data(){
		  return{
              loading:true,
        columns: [
          {title: '序号',  minWidth: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '车牌号码', key: 'plateNumber', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '车辆识别号VIN', key: 'vin', sortable: true, minWidth: 140},
          {title: '送修日期', key: 'repairDate', sortable: true, minWidth: 135},
          {title: '结算编号', key: 'costlistcode', sortable: true, minWidth: 120},
          {title: '维修企业', key: 'companyName', sortable: true, minWidth: 120},
        ],
        tableData: [],
        searchList:{
          companyName: '',
          vehicleplatenumber: '',
          vin: '',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        showOtherDetail:false,
        detailData: null,
        clearTableSelect: null,
        
        
      }
    },
    mounted(){
      
        var queryData=this.$route.query;
        this.searchList.vehicleplatenumber=queryData.vehicleplatenumber;
        this.searchList.vin=queryData.vin;

        this.getList();
        
    },
    methods:{
        getList(){
            this.loading=true;
            this.$axios.post('/vehicle/carfile/query', {
                    "companyName":this.searchList.companyName,
                    "pageNo": this.page,
                    "pageSize": this.limit,
                    "vehicleplatenumber":this.searchList.vehicleplatenumber,
                    "vin":this.searchList.vin,
                    
            }).then( (res) => {
                console.log(res.data);
                if(res.data.code=='0'){
                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;
                }
           })
           this.detailData= null;
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
        lastFun(){
            this.$router.push({path:'/center/my-car-record'});
        }
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
