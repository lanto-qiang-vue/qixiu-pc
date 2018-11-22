<!--绑定车辆审核 2018-11-05-->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading" :showSearch=false>
    <div  slot="search"  >
        
    </div>
    <div slot="operate">
      <Button type="primary" v-if="accessBtn('view')" @click="showDetail=Math.random();" :disabled="!detailData">审核</Button>
    </div>
    <car-audit-detail :showDetail='showDetail' :detailData="detailData" @closeDetail="closeDetail"></car-audit-detail>
  </common-table>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import carAuditDetail from './car-audit-detail.vue'
  import funMixin from '~/components/fun-auth-mixim.js'

	export default {
		name: "bind-car-audit",
    components: {
      CommonTable,
      carAuditDetail
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:true,
        columns: [
          {title: '车牌号', key: 'vehicleplatenumber', sortable: true, minWidth: 120,},
          {title: 'VIN', key: 'vin', sortable: true, minWidth: 120},
        ],
        tableData: [],
        search:{
          name:'',
          professor: '',
          empUnit: '',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        
      }
    },
    mounted () {
      this.getList();
    },
    methods:{
        getList(){
          this.loading=true;
          this.$axios.post('/scan/checkList', {
              
              "pageNo": this.page,
              "pageSize": this.limit,
          }).then( (res) => {
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
              this.loading=false;
            }else{
              this.$Message.info(res.data.status);
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
          this.detailData= null;
          this.clearTableSelect= Math.random();
          this.page=1;
          this.getList();
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
