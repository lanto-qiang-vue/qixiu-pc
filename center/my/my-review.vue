<!--车主中心 我的点评 2018-11-12-->

<template>

  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
      @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
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
        searchSelectOption:[],
        searchSelectOption1:[],//重新赋值--
        search:{
          input: '',
          select: '',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        isOrderSuccess:true,//判断是不是预约成功
        cityList: [
            {
                value: 'New York',
                label: 'New York'
            },
        ],
        model1:'',
        
      }
    },
    mounted () {
      this.showTable= Math.random();
      this.getList();
      // this.getRepairList();
    },

    methods:{
        getList(){
            this.loading=true;
            let page=this.page-1;
            
            this.$axios.get('/comment/maintain/query/userId?size='+this.limit+'&page='+page, {
            }).then( (res) => {
              console.log(res);
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
        getRepairList(){
          this.$axios.post('/comment/list', {
                    "pageNo": this.page,
                    "pageSize": this.limit,

                }).then( (res) => {
					console.log(res)
					
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
            if(row.STATUS=="10421003"){
                this.isOrderSuccess=true;
            }else{
                this.isOrderSuccess=false;
            }
          this.detailData=row
        },
        onRowDblclick( row, index){
          this.detailData=row
          console.log('row：',row);
          this.showDetail=Math.random()
        },
        closeDetail(){
          this.detailData= null
          this.isOrderSuccess=true;
          this.clearTableSelect= Math.random()
        },
        searchFun(){

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
