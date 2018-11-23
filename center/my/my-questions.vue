<!--车主中心 我的咨询-->
<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
              <FormItem label="问题分类:">
                  <Select v-model="search.select" style="width:200px" clearable >
                      <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.codeDesc }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="问题内容:">
                  <Input type="text" v-model="search.input" placeholder="请输入关键字"></Input>
              </FormItem>
              <FormItem :label-width="0" style="width: 120px;">
                  <Button type="primary" v-if="accessBtn('query')" @click="closeDetail()">搜索</Button>
              </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="accessBtn('view')" :disabled="!detailData" @click="searchFun">查看</Button>
      <Button type="error" v-if="accessBtn('delete')" :disabled="!detailData"  @click="delquestion">删除</Button>
    </div>
  </common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "my-questions",
    components: {
      CommonTable,
    },
    mixins: [funMixin],
    data(){
		  return{
        loading:false,
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
        typeList: [],//问题分类--------
      }
    },
    mounted () {

      this.getList();
      this.getQuestionType();
    },
    methods:{
        getList(){
          this.loading=true;
          this.$axios.post('/question/myquestion', {
              "category": this.search.select||'',
              "content": this.search.input||'',
              "pageNo": this.page,
              "pageSize": this.limit,
          }).then( (res) => {
            console.log(res)
            if(res.data.code=='0'){
              this.tableData=res.data.items;
              this.total=res.data.total;
              this.loading=false;
            }else{
              // this.$Message.info(res.data.status);
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
        //删除数据-------
        delquestion(){
          this.$Modal.confirm({
              title:"系统提示!",
              content:"确定要删除吗？",
              onOk:this.delquestionFun,
          })
          
        },
        delquestionFun(){
            this.$axios.post('/question/delete/'+this.detailData.id,{
            }).then( (res) => {
                  if(res.data.code=='0'){
                      this.closeDetail();
                  }
            })
        },
        getQuestionType(){
          this.$axios.get('/question/typelist',).then( (res) => {
                  console.log(res);
                  if(res.data.code=='0'){
                      this.typeList=res.data.items;
                      
                  }else{
                      // this.$Message.info(res.data.status);
                  }
            })
        },
        //查看按钮数据---------
        searchFun(){
          let path='/cdf/'+this.detailData.id;
          this.$router.push({path:path});
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
