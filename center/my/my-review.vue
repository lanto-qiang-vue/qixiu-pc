<!--车主中心 我的点评 2018-11-12-->
<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
      @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :page="page" :showSearch=false :showOperate=false :loading="loading">
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
	export default {
		name: "my-review",
    components: {
      CommonTable,
    },
    data(){
		  return{
        loading:false,
        columns: [
          {title: '点评日期', key: 'createDate', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '评分', key: 'avgScore', sortable: true, minWidth: 85},
          {title: '评分详情', key: 'TELPHONE', sortable: true, minWidth: 150,
            render: (h, params) => {
                let scoreDetail='履约'+params.row.keepAppointment+' 态度'+params.row.attitude+' 质量'+params.row.quality+' 速度'+params.row.speed+' 价格'+params.row.price
                  return h('div', [
                      h('span', scoreDetail)
                  ]);
            }
          },
          {title: '门店名称', key: 'companyName', sortable: true, minWidth: 150},
          {title: '门店地址', key: 'companyAddress', sortable: true, minWidth: 180},
          {title: '维修车牌', key: 'vehicleNum', sortable: true, minWidth: 120},
          
        ],
        tableData: [],
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        clearTableSelect: null,
      }
    },
    mounted () {
      this.showTable= Math.random();
      this.getList();
    },

    methods:{
        getList(){
            this.loading=true;
            let page=this.page-1;
            this.$axios.get('/comment/maintain/query/userId?size='+this.limit+'&page='+page, {
            }).then( (res) => {
              if(res.status===200){
                  this.tableData=res.data.content;
                  this.total=res.data.totalElements;
                  this.loading=false;
              }else{
                this.loading=false;
                this.$Message.error(res.statusText);
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
