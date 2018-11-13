<!--车大夫问题管理 2018-11-01  -->

<template>


<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                 :show="showTable" :page="page" :loading="loading">
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
                <FormItem :label-width="0" style="width: 90px;">
                    <Button type="primary" v-if="" @click="searchFun">搜索</Button>
                </FormItem>
        </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="" @click="showDetail=Math.random();" :disabled="!detailData">回答</Button>
    </div>
    <car-question-detail :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail"></car-question-detail>
</common-table>

</template>

<script>
import CommonTable from '~/components/common-table.vue'
import carQuestionDetail from './car-question-detail.vue'
export default {
	name: "car-doctor-manage",
    components: {
      CommonTable,
      carQuestionDetail
    },
    data(){
		  return{
              loading:false,
              
        columns: [
          
          {title: '问题内容', key: 'content', sortable: true, minWidth: 200,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '问题状态', key: 'status', sortable: true, minWidth: 110,
            render: (h, params) => h('span', params.row.status.name)
            },
          {title: '提问专家', key: 'expertName', sortable: true, minWidth: 110},
          {title: '问题分类', key: 'categoryName', sortable: true, minWidth: 110},
          {title: '提问用户', key: 'userName', sortable: true, minWidth: 110},
          {title: '回答专家', key: 'lastAnswerName', sortable: true, minWidth: 110},
          {title: '回答时间', key: 'lastAnswerTime', sortable: true, minWidth: 150},
          
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
        showOtherDetail:false,
        detailData: null,
        clearTableSelect: null,
        typeList:[],
      }
    },
    mounted () {
      
      
      this.getType(1040);
      this.getList();
    },
    methods:{
        getList(){
            this.loading=true;
            this.$axios.post('/question/expert/list', {
                    "category": this.searchList.category,
                    "content": this.searchList.content,
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
        getType(id){
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
          this.detailData=row
        },
        closeDetail(){
          this.detailData= null
          this.page= 1;
          this.clearTableSelect= Math.random();
          this.getList();
        },
        //搜索按钮----
        searchFun(){
            this.closeDetail();
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
