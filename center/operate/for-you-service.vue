<!--为您服务管理 2018-11-06  -->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
    <div  slot="search">

        <Form :label-width="80" class="common-form">
            <FormItem label="联系人:">
                <Input type="text" v-model="search.input" placeholder="请输入联系人"></Input>
            </FormItem>
            <FormItem label="联系方式:">
                <Input type="text" v-model="search.input" placeholder="请输入联系方式"></Input>
            </FormItem>

            <FormItem :label-width="0" style="width: 80px;">
                <Button type="primary" v-if="" @click="searchFun">搜索</Button>
            </FormItem>
        </Form>

    </div>
    <div slot="operate">
    </div>

  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
	export default {
		name: "for-you-service",
    components: {
      CommonTable,
    },
    data(){
		  return{
        loading:true,
        columns: [
          {title: '序号',  width: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '服务内容', key: 'ownerName', sortable: true, minWidth: 120},
          {title: '服务状态', key: 'ownerName', sortable: true, minWidth: 120},
          {title: '联系人', key: 'ownerName', sortable: true, minWidth: 120},
          {title: '联系方式', key: 'ownerName', sortable: true, minWidth: 120},
          
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
    methods:{
        getList(){
          this.loading=true;
            this.$axios.post('/serviceforyou/list', {
                "contactName":"",
                "contactTel":"",
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
            this.$axios.delete('/service/delete/'+this.detailData.id,).then( 
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
