<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page" :showSearch=false>
    <div slot="operate">
      <Button type="info" v-if="" :disabled="!detailData" @click="">查看</Button>
      <Button type="error" v-if="" :disabled="!detailData"  @click="delquestion">删除</Button>
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
          {title: '问题分类', key: 'categoryName', sortable: true, minWidth: 120,
          },
          {title: '问题内容', key: 'content', sortable: true, minWidth: 120},
          {title: '咨询专家', key: 'expertName', sortable: true, minWidth: 135},
          {title: '提问时间', key: 'createDate', sortable: true, minWidth: 120},
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
          this.detailData=row
        },
        closeDetail(){
          this.detailData= null
          this.clearTableSelect= Math.random()
        },
        //删除数据-------
        delquestion(){
          this.$Modal.confirm({
              title:"系统提示!",
              content:"确定要删除吗？",
              onOk:this.delquestionFun,
          })
          
        },
        delquestionFun(){
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
