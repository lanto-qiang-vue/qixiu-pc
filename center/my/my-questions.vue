<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div slot="operate">
      <Button type="info" v-if="" @click="showDetail=Math.random()">查看</Button>
      <Button type="error" v-if=""  @click="delquestion">删除</Button>
    </div>
  </common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
	export default {
		name: "my-questions",
    components: {
      CommonTable,
    },
    data(){
		  return{
        columns: [
          // {title: '序号',  minWidth: 80,
          //   render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          // },
          {title: '问题分类', key: 'categoryName', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '问题内容', key: 'content', sortable: true, minWidth: 120},
          {title: '咨询专家', key: 'expertName', sortable: true, minWidth: 135},
          {title: '提问时间', key: 'createTime', sortable: true, minWidth: 120},
          {title: '问题状态', key: 'status', sortable: true, minWidth: 120,
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
          this.$axios.post('/cdf/myQuestion', {
              "category": "",
              "content": "",
              "pageNo": this.page,
              "pageSize": this.limit,
          }).then( (res) => {
            console.log(res)
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
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
        //删除数据-------
        delquestion(){
          this.$axios.post('/cdf/delquestion/'+this.detailData.id,{
          }).then( (res) => {
                if(res.data.code=='0'){
                    this.getList();
                    this.closeDetail();
                }
          })
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
