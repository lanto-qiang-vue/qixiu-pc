<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="110" class="common-form">
        <FormItem label="文章标题:">
            <Input type="text" v-model="search.title" ></Input>
        </FormItem>
        <FormItem label="文章类别:">
          <Select v-model="search.infoType" clearable>
            <Option v-for="(item, index) in typeList" :key="index" :value="item.id">{{item.codeDesc}}</Option>
          </Select>
        </FormItem>
        <FormItem label="发布状态:">
          <Select v-model="search.publishStatus" clearable>
            <Option v-for="(item, index) in statusList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem :label-width="0">
          
            <Button v-if="accessBtn('query')" type="primary" @click="page=1;getList()">搜索</Button>
            
          
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="info" v-if="accessBtn('add')"  @click="goDetail(true)">新增</Button>
      <Button type="primary" v-if="accessBtn('edit')" :disabled="!selectRow.id" @click="goDetail(false)">修改</Button>
      <Button type="error" v-if="accessBtn('delete')" :disabled="!selectRow.id" @click="del">删除</Button>
      <Button :type="rowStatus?'error': 'success'" v-if="accessBtn('updateStatus')" :disabled="!selectRow.id"
              @click="changeStatus">{{rowStatus?'取消发布': '发布'}}</Button>
    </div>
  </common-table>
  <!--<system-manage-detail :data="selectRow" :show="showDetail" :total="total"-->
                      <!--@refresh="selectRow={};getList()"></system-manage-detail>-->
</div>
</template>

<script>
  import funMixin from '~/components/fun-auth-mixim.js'
  import CommonTable from '~/components/common-table.vue'
  // import SystemManageDetail from './system-type-manage-detail'
	export default {
		name: "article-manage-list",
    mixins: [funMixin],
    components: {
      CommonTable,
      // SystemManageDetail
    },
    asyncData ({ app, params, error }) {
      console.log('article-manage-list:asyncData')
    },
    data(){
		  return{
		    typeList:[],
        statusList: [
          {id: '', name: '全部'},
          {id: '10311001', name: '已发布'},
          {id: '10311002', name: '未发布'},
        ],
        columns: [
          {title: '文章ID', key: 'id',  minWidth: 100},
          {title: '文章标题', key: 'title',  minWidth: 100,},
          {title: '文章类别', key: 'typeName',  minWidth: 100,},
          {title: '发布状态', key: 'status',  minWidth: 100,
            render: (h, params) => h('span', params.row.status.name)
          },
          {title: '发布时间', key: 'publishTime',  minWidth: 100,},
          {title: '创建者姓名', key: 'creator',  minWidth: 100,},
          {title: '文章来源', key: 'dataFrom',  minWidth: 100,},
          {title: '文章标识', key: 'customFlag',  minWidth: 100,},
        ],
        tableData: [],
        search:{
          title: '',
          infoType: '',
          publishStatus: '',
        },
        categoryList: [],
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        selectRow: {},
        clearTableSelect: null,
      }
    },
    computed:{
      rowStatus(){
        return (this.selectRow.status && this.selectRow.status.status== '10311001') ? true: false
      }
    },
    mounted () {
      this.showTable= Math.random();
      this.getType()
      this.getList();

    },
    methods:{
      getType(){
        this.$axios.$get('/infopublic/public/info/category').then( (res) => {
          this.typeList= res.items
        })
      },
      del() {
        this.$Modal.confirm({
          title: '确定要删除吗？',
          onOk: () => {
            this.$axios.post('/infopublic/delete/' + this.selectRow.id).then((res) => {
              if (res.data.code == '0') {
                this.$Message.success('删除成功')
                this.getList()
                this.selectRow={}
              }
            })
          }
        })
      },
        getList(){
          this.$axios.$post('/infopublic/all', {
            "pageNo": this.page,
            "pageSize": this.limit,
            ...this.search
          }).then( (res) => {
            // console.log(res)
            this.tableData= res.items
            this.total= res.total
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
          this.selectRow= row
        },
        onRowDblclick( row, index){
          this.selectRow=row
        },
        closeDetail(){
          this.detailData= null
          this.isOrderSuccess=true;
          this.clearTableSelect= Math.random()
        },
        //只有保存数据和提交数据的时候更新界面列表，
        closeGetList(){
          this.getList();
        },
      goDetail(isNew){
          // window.location.href= '/center/article-manage/detail' + (isNew ? '?id='+null : ('?id='+this.selectRow.id))
        this.$router.push({path:'/center/article-manage/detail', query:{ id: isNew? undefined: this.selectRow.id}})
        // this.$router.push({path:'/test', query:{ id: isNew}})
      },
      changeStatus(){
        this.$Modal.confirm({
          title:"确定"+ (this.rowStatus?'取消发布': '发布')+'吗？',
          onOk:()=>{
            this.$axios.$post('/infopublic/update/status/'+this.selectRow.id, {
            }).then( (res) => {
              if(res.code==='0'){
                this.$Message.success('修改成功');
                this.getList()
                this.selectRow={}
              }
            })
          },
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
