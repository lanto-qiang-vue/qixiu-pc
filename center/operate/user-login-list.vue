<!--用户行为日志列表 2018-11-05-->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading" :showOperate=false>
    <div  slot="search"  >
        <Form :label-width="50" class="common-form">
              <FormItem label="时间:">
                  <DatePicker type="daterange" v-model="search.dateArr" placement="bottom-start" placeholder="请选择"></DatePicker>
              </FormItem>
              <FormItem :label-width="0" style="width: 60px;">
                  <Button type="primary" v-if="accessBtn('query')" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">

    </div>

  </common-table>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import { formatDate } from '@/static/tools'
  import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "user-login-list",
    components: {
      CommonTable,
      
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:true,
        columns: [
          {title: '序号',  width: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '远程地址	', key: 'remoteAddress', sortable: true, minWidth: 120,
          },
          {title: '类型', key: 'type', sortable: true, minWidth: 120},
          {title: '上下文', key: 'context', sortable: true, minWidth: 135},
          {title: '请求路径', key: 'path', sortable: true, minWidth: 120},
          {title: '用户凭据', key: 'token', sortable: true, minWidth: 120,
          },
        ],
        tableData: [],

        search:{
          dateArr:'',
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
          this.$axios.post('/sysLog/list', {
            "endDate": formatDate(this.search.dateArr[1])||'',
            "startDate": formatDate(this.search.dateArr[0])||'',
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
