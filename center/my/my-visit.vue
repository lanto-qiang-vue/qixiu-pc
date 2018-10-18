<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
     
    </div>
    <div slot="operate">
      <Button type="error" v-if="" @click="detailData=null,showDetail=Math.random()">删除</Button>
      
      
    </div>
  </common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
	export default {
		name: "my-visit",
    components: {
      CommonTable,
    },
    data(){
		  return{
        columns: [
          // {title: '序号',  minWidth: 80,
          //   render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          // },
          {title: '服务内容', key: 'ORDER_TYPE', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '联系人', key: 'ORDER_PERSON', sortable: true, minWidth: 120},
          {title: '联系方式', key: 'TELPHONE', sortable: true, minWidth: 135},
          {title: '上门服务地址', key: 'PLATE_NUM', sortable: true, minWidth: 120},
          {title: '状态', key: 'PLATE_NUM', sortable: true, minWidth: 120},
        ],
        tableData: [],
        searchSelectOption:[],
        searchSelectOption1:[],//重新赋值--
        search:{
          input: '',
          select: '',
        },
        page: 0,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        isOrderSuccess:true,//判断是不是预约成功
        
      }
    },
    mounted () {
      this.showTable= Math.random();
    //   this.getList();
    
    },
    // beforeMount(){
    //   this.$axios.post('/menu/list', {
    //     "pageNo": 1,
    //     "pageSize": 10,
    //   })
    // },
    methods:{
        getList(){
            this.$axios.post('/vehicle/owner/queryVehicelist', {
                    "cartype": "",
                    "pageNo": this.page,
                    "pageSize": this.limit,
                    "status": 0,
                    "vehicleplatenumber": "",
                    "vin": ""

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
        //只有保存数据和提交数据的时候更新界面列表，
        closeGetList(){
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
