<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading">
    <div  slot="search"  >
        <Form :label-width="80" class="common-form">
              <FormItem label="问题分类:">
                  
                  <Select v-model="search.select" style="width:200px">
                      <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.codeDesc }}</Option>
                  </Select>
              </FormItem>
              <FormItem label="问题内容:">
                  <Input type="text" v-model="search.input" placeholder="请输入关键字"></Input>
              </FormItem>
              <FormItem :label-width="0" style="width: 120px;">
                  <Button type="primary" v-if="" @click="getList()">搜索</Button>
                  <Button type="primary" v-if="" @click="resetList">清空</Button>
              </FormItem>
        </Form>
    </div>
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
        loading:true,
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
    // beforeMount(){
    //   this.$axios.post('/menu/list', {
    //     "pageNo": 1,
    //     "pageSize": 10,
    //   })
    // },
    methods:{
        getList(){
          this.loading=true;
          this.$axios.post('/cdf/myQuestion', {
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
              this.$Message.info(res.data.status);
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
        getQuestionType(){
          this.$axios.get('/center/question/typeList/1040',).then( (res) => {
                  console.log(res);
                  if(res.data.code=='0'){
                      this.typeList=res.data.items;
                      
                  }else{
                      this.$Message.info(res.data.status);
                  }
            })
        },
        resetList(){
          for(let i in this.search){
            this.search[i]='';
          }
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
