<!--车大夫问题管理 2018-11-02-->
<template>
<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
              <FormItem label="问题分类:">
                    <Select v-model="searchList.category" clearable>
                        <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.codeDesc }}</Option>
                    </Select>
                </FormItem>
              <FormItem label="问题内容:">
                  <Input type="text" v-model="searchList.content" placeholder="请输入问题内容"></Input>
              </FormItem>
              <FormItem :label-width="0" style="width: 120px;">
                  <Button type="primary" v-if="accessBtn('query')" @click="page=1,closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="accessBtn('auditDetail')" :disabled="!detailData" @click="showDetail=Math.random();">查看详情</Button>
    </div>
    <carDoctor-question-detail :showDetail='showDetail' :detailData="detailData" @closeDetail="closeDetail"></carDoctor-question-detail>
  </common-table>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
    import carDoctorQuestionDetail from './carDoctor-question-detail.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "carDoctor-question-manage",
    components: {
      CommonTable,
      carDoctorQuestionDetail
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:true,
        columns: [
          {title: '问题内容', key: 'content', minWidth: 120,
          },
          {title: '问题状态', key: 'status', minWidth: 120,
                render: (h, params) => h('span',  params.row.status.name)
          },
          {title: '提问时间', key: 'createTime', sortable: true, minWidth: 135},
          {title: '回答时间', key: 'answerTime', sortable: true, minWidth: 120},
          {title: '提问专家', key: 'expertName', minWidth: 135},
          {title: '问题分类', key: 'categoryName', minWidth: 120},
          {title: '提问用户', key: 'userName', minWidth: 120,
            // render: (h, params) => h('span',  params.row.status.name)
          },
        ],
        tableData: [],
        searchList:{
            category:"",
            content:""
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        typeList: [],//问题分类--------
        
      }
    },
    mounted () {

      this.getList();
        this.getType();
    },
    methods:{
        getList(){
          this.loading=true;
          this.$axios.post('/question/all', {
              "category": this.searchList.category||'',
              "content": this.searchList.content||'',
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
        //获取问题分类---------
        getType(){
            this.$axios.get('/question/typelist', {
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.typeList=res.data.items;
                }else{
                    this.$Message.error(res.data.status);
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
          this.detailData=row;
          
        },
        closeDetail(){
          this.detailData= null
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
