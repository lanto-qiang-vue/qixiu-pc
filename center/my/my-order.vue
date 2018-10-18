<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :showSearch=false>
    <div  slot="search"  >
      
    </div>
    <div slot="operate">
      <Button type="error" v-if="" :disabled="!detailData"  @click="deleteFun">删除</Button>
      
    </div>
  </common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
	export default {
		name: "my-order",
    components: {
      CommonTable,
    },
    data(){
		  return{
        columns: [
          {title: '服务内容', key: 'servicecontent', sortable: true, minWidth: 120,
          },
          {title: '预约公司', key: 'companyName', sortable: true, minWidth: 120},
          {title: '联系人', key: 'ownername', sortable: true, minWidth: 135},
          {title: '联系方式', key: 'contactmobile', sortable: true, minWidth: 120},
          {title: '预约时间', key: 'onServiceTime', sortable: true, minWidth: 120},
          {title: '状态', key: 'status', sortable: true, minWidth: 120},
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
            this.$axios.post('/maintain/getMyOnsiteOrderlist', {
                    "companyId": '',
                    "contactMobile": "",
                    "ownerName": "",
                    "pageNo": this.page,
                    "pageSize": this.limit,
                    "statusArray": [
                      ""
                    ]

            }).then( (res) => {
              if(res.data.code=='0'){
                this.tableData=res.data.data;
                this.total=res.data.count;
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
