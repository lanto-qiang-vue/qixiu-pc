<!--上门服务管理 2018-11-06-->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :showSearch=false :loading="loading">
    <div  slot="search"  >
     
    </div>
    <div slot="operate">
      <Button type="error" v-if="" :disabled="!detailData"  @click="deleteFun">删除</Button>
      
      
    </div>
  </common-table>

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
        loading:true,
        columns: [
          {title: '服务内容', key: 'serviceType', sortable: true, minWidth: 120,
          },
          {title: '联系人', key: 'ownerName', sortable: true, minWidth: 120},
          {title: '联系方式', key: 'contactMobile', sortable: true, minWidth: 135},
          {title: '上门服务地址', key: 'contactAddress', sortable: true, minWidth: 120},
          {title: '状态', key: 'status', sortable: true, minWidth: 120,
            render: (h, params) => h('span',  params.row.status.name)
          },
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
        
      }
    },
    mounted () {
      this.showTable= Math.random();
      this.getList();
    
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
            this.$axios.post('/service/list', {
                     
                      "pageNo": this.page,
                      "pageSize": this.limit,
                      
            }).then( (res) => {
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
          this.clearTableSelect= Math.random()
        },
        //删除按钮----------
        deleteFun(){
            this.$Modal.confirm({
                title:"系统提示!",
                content:"确定要删除吗？",
                onOk:this.deleteFuncion,
            })
            
        },
        deleteFuncion(){
            this.$axios.post('/service/delete/'+this.detailData.id,).then( 
            (res) => {
					      if(res.data.code=='0'){
                  this.getList();
                  this.closeDetail();
                }
					
				    })
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
