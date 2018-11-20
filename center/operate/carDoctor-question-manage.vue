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
                  <Button type="primary" v-if="" @click="closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="" :disabled="!detailData" @click="showDetail=Math.random();">查看详情</Button>
    </div>
    <carDoctor-question-detail :showDetail='showDetail' :detailData="detailData" @closeDetail="closeDetail"></carDoctor-question-detail>
  </common-table>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
    import carDoctorQuestionDetail from './carDoctor-question-detail.vue'
	export default {
		name: "carDoctor-question-manage",
    components: {
      CommonTable,
      carDoctorQuestionDetail
    },
    data(){
		  return{
        loading:true,
        columns: [
          {title: '问题内容', key: 'content', sortable: true, minWidth: 120,
          },
          {title: '问题状态', key: 'status', sortable: true, minWidth: 120,
                render: (h, params) => h('span',  params.row.status.name)
            },
          {title: '提问专家', key: 'expertName', sortable: true, minWidth: 135},
          {title: '问题分类', key: 'categoryName', sortable: true, minWidth: 120},
          {title: '提问用户', key: 'userName', sortable: true, minWidth: 120,
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
        this.getType(1040);
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
        getType(id){
            this.$axios.get('/question/typelist/'+id, {
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
