<!--车大夫回答管理 2018-11-02-->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
              <FormItem label="答案状态:">
                  
                  <Select v-model="searchList.status" clearable>
                      <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                  </Select>
              </FormItem>
              <FormItem :label-width="0" style="width: 120px;">
                  <Button type="primary" v-if="accessBtn('query')" @click="closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="accessBtn('view')" :disabled="!detailData" @click="showDetail=Math.random();">查看详情</Button>
    </div>
    <carDoctor-answer-detail :showDetail='showDetail' :detailData="detailData" @closeDetail="closeDetail"></carDoctor-answer-detail>
  </common-table>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import carDoctorAnswerDetail from './carDoctor-answer-detail.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "carDoctor-answer-manage",
    components: {
      CommonTable,
      carDoctorAnswerDetail
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:true,
        columns: [
            {title: '序号',  width: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '答案状态', key: 'status', sortable: true, width: 120,
            render: (h, params) => h('span', params.row.status.name)
          },
          {title: '问题内容', key: 'questionContent', sortable: true, minWidth: 120},
          {title: '答案内容', key: 'answerContent', sortable: true, minWidth: 135},
        ],
        tableData: [],
        searchList:{
            status:"",
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        typeList: [
            {code:1,name:"未审核"},
            {code:2,name:"审核通过"},
            {code:3,name:"审核未通过"},
        ],//问题分类--------
      }
    },
    mounted () {

      this.getList();
    //   this.getQuestionType();
    },
    methods:{
        getList(){
          this.loading=true;
          this.$axios.post('/answer/list', {
              "status": this.searchList.status,
              "pageNo": this.page,
              "pageSize": this.limit,
          }).then( (res) => {
            console.log(res)
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
          this.detailData= null
          this.clearTableSelect= Math.random();
          this.page=1;
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
