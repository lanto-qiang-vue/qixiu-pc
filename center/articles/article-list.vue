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
            <Input type="text" v-model="search.infoType" ></Input>
        </FormItem>
        <FormItem label="发布状态:">
          <Select v-model="search.publishStatus">
            <Option v-for="(item, index) in systemList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem >
          <ButtonGroup size="small">
            <Button type="primary" @click="page=1;getList()"><Icon type="ios-search" size="24"/></Button>
            <Button type="primary" @click="clear()"><Icon type="ios-undo" size="24"/></Button>
          </ButtonGroup>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="success" v-if=""  @click="goDetail(true)">新增</Button>
      <Button type="primary" v-if="" :disabled="!selectRow.id" @click="goDetail(false)">修改</Button>
    </div>
  </common-table>
  <!--<system-manage-detail :data="selectRow" :show="showDetail" :total="total"-->
                      <!--@refresh="selectRow={};getList()"></system-manage-detail>-->
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  // import SystemManageDetail from './system-type-manage-detail'
	export default {
		name: "menu-manage",
    components: {
      CommonTable,
      // SystemManageDetail
    },
    data(){
		  return{
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
    mounted () {
      this.showTable= Math.random();
      this.getList();

    },
    methods:{
		  getType(){

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
          window.location.href= '/center/article-manage/detail' + (isNew ? '': ('?id='+this.selectRow.id))
        // this.$router.push({path:'/center/article-manage/detail', query:{ id: isNew}})
        // this.$router.push({path:'/test', query:{ id: isNew}})
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
