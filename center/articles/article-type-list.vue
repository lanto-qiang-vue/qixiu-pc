<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                @onRowDblclick="onRowDblclick" :show="showTable" :page="page">
    <div  slot="search"  >
      <Form :label-width="110" class="common-form">
        <FormItem label="文章类型名:">
            <Input type="text" v-model="search.codeDesc" ></Input>
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
      <Button type="success" v-if=""  @click="selectRow={},showDetail= true">新增</Button>
      <Button type="primary" v-if=""  @click="showDetail=true" :disabled="!selectRow.id">修改</Button>
      <Button type="error" v-if=""  @click="del" :disabled="!selectRow.id">删除</Button>
    </div>
  </common-table>
  <Modal
    v-model="showDetail"
    title="编辑文章类型"
    width="50"
    @on-visible-change=""
    :footer-hide="false"
    class=""
    :mask-closable="false"
    :transition-names="['', '']"
  >
    <Form ref="form" :model="detail" :label-width="110"  class="common-form">
      <FormItem label="文章类型名" prop="name">
        <Input type="text" v-model="detail.codeDesc" ></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="showDetail=false">取消</Button>
      <Button type="primary" @click="save">保存</Button>
    </div>
  </Modal>
</div>
</template>

<script>
  import { deepClone } from '~/static/util.js'
  import CommonTable from '~/components/common-table.vue'
  const initData= {
    codeDesc: '',
  }
	export default {
		name: "menu-manage",
    components: {
      CommonTable,
    },
    data(){
		  return{
        columns: [
          {title: '文章类型ID', key: 'codeId',  minWidth: 100},
          {title: '文章类型名', key: 'codeDesc',  minWidth: 100},
          {title: '文章数量', key: 'num',  minWidth: 100},
        ],
        tableData: [],
        search:{
          codeDesc: '',
          type: '1028',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        selectRow: {},
        detail:{
          codeDesc: '',
          type: '1028',
        },
        clearTableSelect: null,
      }
    },
    mounted () {
      this.showTable= Math.random();
      this.getList();

    },
    methods:{
      getList(){
        this.$axios.$post('/article/category/list', {
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
        this.selectRow= deepClone(row)
      },
      onRowDblclick( row, index){
        this.selectRow= deepClone(row)
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
      del(){

      },
      save(){
        this.$axios.$post('/article/category/list', this.detail).then( (res) => {

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
