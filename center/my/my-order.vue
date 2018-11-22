<!--车主中心 我的预约服务-->
<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :showSearch=false :loading="loading">
    <div  slot="search"  >
    </div>
    <div slot="operate">
      <Button type="error" v-if="accessBtn('delete')" :disabled="!detailData"  @click="deleteFun">删除</Button>
      
    </div>
  </common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "my-order",
    components: {
      CommonTable,
    },
    mixins: [funMixin],
    data(){
		  return{
        columns: [
          {title: '服务内容', key: 'serviceContent', sortable: true, minWidth: 120,
          },
          {title: '预约公司', key: 'company', sortable: true, minWidth: 120,
            render: (h, params) => h('span', params.row.company.name)
          },
          {title: '联系人', key: 'ownerName', sortable: true, minWidth: 135},
          {title: '联系方式', key: 'contactMobile', sortable: true, minWidth: 120},
          {title: '预约时间', key: 'arrivalTime', sortable: true, minWidth: 120},
          {title: '状态', key: 'handleStatus', sortable: true, minWidth: 120,
            render: (h, params) => h('span', params.row.handleStatus.name)
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
        loading:false,
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
            this.$axios.post('/service/order/list', {
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
          this.page=1;
          this.getList();
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
            this.$axios.post('/maintain/deleteOnsiteOrder', {
                    id:this.detailData.id
            }).then( (res) => {
					      if(res.data.code=='0'){
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
